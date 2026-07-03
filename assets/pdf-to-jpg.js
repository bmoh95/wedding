import { GlobalWorkerOptions, getDocument } from './vendor/pdfjs/pdf.min.mjs';

const workerUrl = new URL('./vendor/pdfjs/pdf.worker.min.mjs', import.meta.url).toString();
const cMapUrl = new URL('./vendor/pdfjs/cmaps/', import.meta.url).toString();
const standardFontDataUrl = new URL('./vendor/pdfjs/standard_fonts/', import.meta.url).toString();

GlobalWorkerOptions.workerSrc = workerUrl;

const elements = {
  fileInput: document.getElementById('pdf-input'),
  fileSummary: document.getElementById('pdf-file-summary'),
  dropZone: document.getElementById('drop-zone'),
  dpiSelect: document.getElementById('dpi-select'),
  qualitySelect: document.getElementById('quality-select'),
  convertButton: document.getElementById('convert-button'),
  downloadLink: document.getElementById('download-link'),
  progressFill: document.getElementById('progress-fill'),
  progressText: document.getElementById('progress-text'),
  previewSummary: document.getElementById('preview-summary'),
  previewEmpty: document.getElementById('preview-empty'),
  previewList: document.getElementById('preview-list'),
};

const MAX_CANVAS_PIXELS = 24_000_000;
const PREVIEW_LIMIT = 6;

let selectedFile = null;
let zipObjectUrl = null;
let previewObjectUrls = [];

function setProgress(percent, message) {
  const safePercent = Math.max(0, Math.min(100, Number(percent) || 0));
  elements.progressFill.style.width = `${safePercent}%`;
  elements.progressText.textContent = message;
}

function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** index).toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
}

function basenameForZip(filename) {
  const withoutExtension = filename.replace(/\.pdf$/i, '') || 'pdf';
  const sanitized = withoutExtension
    .normalize('NFKC')
    .replace(/[\\/:*?"<>|]+/g, '-')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
  return sanitized || 'pdf';
}

function resetOutput() {
  if (zipObjectUrl) URL.revokeObjectURL(zipObjectUrl);
  zipObjectUrl = null;
  elements.downloadLink.hidden = true;
  elements.downloadLink.removeAttribute('href');
  elements.downloadLink.removeAttribute('download');

  previewObjectUrls.forEach((url) => URL.revokeObjectURL(url));
  previewObjectUrls = [];
  elements.previewList.replaceChildren();
  elements.previewEmpty.hidden = false;
  elements.previewSummary.textContent = '변환 전';
}

function setSelectedFile(file) {
  resetOutput();

  if (!file) {
    selectedFile = null;
    elements.convertButton.disabled = true;
    elements.fileSummary.textContent = 'PDF 대기';
    setProgress(0, '대기: PDF 파일을 선택해주세요.');
    return;
  }

  const looksLikePdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
  if (!looksLikePdf) {
    selectedFile = null;
    elements.fileInput.value = '';
    elements.convertButton.disabled = true;
    elements.fileSummary.textContent = 'PDF 아님';
    setProgress(0, '실패: PDF 파일만 선택할 수 있습니다.');
    return;
  }

  selectedFile = file;
  elements.convertButton.disabled = false;
  elements.fileSummary.textContent = `${file.name} · ${formatBytes(file.size)}`;
  setProgress(0, `대기: ${file.name} 선택됨. JPG ZIP 만들기를 눌러주세요.`);
}

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Canvas를 JPG Blob으로 변환하지 못했습니다.'));
    }, type, quality);
  });
}

function addPreview(pageNumber, blob) {
  if (pageNumber > PREVIEW_LIMIT) return;

  const url = URL.createObjectURL(blob);
  previewObjectUrls.push(url);

  const item = document.createElement('li');
  item.className = 'preview-item';

  const image = document.createElement('img');
  image.src = url;
  image.alt = `변환된 ${pageNumber}페이지 JPG 미리보기`;

  const caption = document.createElement('span');
  caption.textContent = `${pageNumber}페이지 · ${formatBytes(blob.size)}`;

  item.append(image, caption);
  elements.previewList.append(item);
  elements.previewEmpty.hidden = true;
}

async function renderPageToJpg(page, pageNumber, totalPages, dpi, quality) {
  const baseScale = dpi / 72;
  const baseViewport = page.getViewport({ scale: baseScale });
  const pixelCount = baseViewport.width * baseViewport.height;
  const scale = pixelCount > MAX_CANVAS_PIXELS
    ? baseScale * Math.sqrt(MAX_CANVAS_PIXELS / pixelCount)
    : baseScale;
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d', { alpha: false });

  canvas.width = Math.ceil(viewport.width);
  canvas.height = Math.ceil(viewport.height);
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);

  await page.render({
    canvasContext: context,
    viewport,
    background: 'rgb(255,255,255)',
  }).promise;

  const blob = await canvasToBlob(canvas, 'image/jpeg', quality);
  canvas.width = 0;
  canvas.height = 0;

  const downscaled = scale !== baseScale;
  const renderDpi = Math.round(scale * 72);
  const suffix = downscaled ? ` · 큰 페이지라 ${renderDpi} DPI로 자동 조정` : '';
  setProgress(10 + (pageNumber / totalPages) * 75, `진행: ${pageNumber}/${totalPages}페이지 JPG 생성 완료${suffix}`);
  return blob;
}

async function convertSelectedPdf() {
  if (!selectedFile) {
    setProgress(0, '대기: PDF 파일을 먼저 선택해주세요.');
    return;
  }

  resetOutput();
  elements.convertButton.disabled = true;
  elements.fileInput.disabled = true;
  elements.dpiSelect.disabled = true;
  elements.qualitySelect.disabled = true;

  let pdfDocument = null;

  try {
    if (!window.JSZip) throw new Error('JSZip 로컬 라이브러리를 불러오지 못했습니다.');

    const dpi = Number(elements.dpiSelect.value);
    const quality = Number(elements.qualitySelect.value);
    const outputBaseName = basenameForZip(selectedFile.name);
    const bytes = new Uint8Array(await selectedFile.arrayBuffer());

    setProgress(4, `진행: ${selectedFile.name} 읽는 중…`);

    const loadingTask = getDocument({
      data: bytes,
      cMapPacked: true,
      cMapUrl,
      standardFontDataUrl,
      useWorkerFetch: false,
      disableAutoFetch: true,
      disableRange: true,
      disableStream: true,
      isEvalSupported: false,
      stopAtErrors: true,
    });

    pdfDocument = await loadingTask.promise;
    const totalPages = pdfDocument.numPages;
    const pageDigits = String(totalPages).length;
    const zip = new window.JSZip();
    const folder = zip.folder(`${outputBaseName}_jpg`);

    elements.previewSummary.textContent = `${totalPages}페이지 변환 중`;
    setProgress(10, `진행: 총 ${totalPages}페이지 분석 완료. JPG 생성 시작…`);

    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber += 1) {
      const page = await pdfDocument.getPage(pageNumber);
      const blob = await renderPageToJpg(page, pageNumber, totalPages, dpi, quality);
      const pageName = `${outputBaseName}_page_${String(pageNumber).padStart(pageDigits, '0')}.jpg`;
      folder.file(pageName, blob, { binary: true });
      addPreview(pageNumber, blob);
      page.cleanup();
    }

    setProgress(88, '진행: JPG 파일을 ZIP으로 묶는 중…');
    const zipBlob = await zip.generateAsync({
      type: 'blob',
      compression: 'STORE',
      streamFiles: true,
    }, (metadata) => {
      setProgress(88 + metadata.percent * 0.12, `진행: ZIP 생성 중 ${Math.round(metadata.percent)}%`);
    });

    zipObjectUrl = URL.createObjectURL(zipBlob);
    elements.downloadLink.href = zipObjectUrl;
    elements.downloadLink.download = `${outputBaseName}_jpg.zip`;
    elements.downloadLink.hidden = false;
    elements.previewSummary.textContent = `${totalPages}페이지 완료`;
    setProgress(100, `완료: ${totalPages}개 JPG를 ${formatBytes(zipBlob.size)} ZIP으로 만들었습니다. 다운로드가 시작됩니다.`);
    elements.downloadLink.click();
  } catch (error) {
    console.error(error);
    elements.previewSummary.textContent = '변환 실패';
    setProgress(0, `실패: ${error?.message || 'PDF 변환 중 오류가 발생했습니다.'}`);
  } finally {
    if (pdfDocument) await pdfDocument.destroy();
    elements.convertButton.disabled = !selectedFile;
    elements.fileInput.disabled = false;
    elements.dpiSelect.disabled = false;
    elements.qualitySelect.disabled = false;
  }
}

elements.fileInput.addEventListener('change', (event) => {
  setSelectedFile(event.target.files?.[0] || null);
});

elements.convertButton.addEventListener('click', () => {
  convertSelectedPdf();
});

['dragenter', 'dragover'].forEach((eventName) => {
  elements.dropZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    elements.dropZone.classList.add('dragging');
  });
});

['dragleave', 'drop'].forEach((eventName) => {
  elements.dropZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    elements.dropZone.classList.remove('dragging');
  });
});

elements.dropZone.addEventListener('drop', (event) => {
  const file = event.dataTransfer?.files?.[0] || null;
  if (file) {
    elements.fileInput.value = '';
    setSelectedFile(file);
  }
});
