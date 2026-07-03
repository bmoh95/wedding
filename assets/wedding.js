(() => {
  function revealInvitation() {
    document.documentElement.classList.remove('fonts-loading');
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(revealInvitation, revealInvitation);
    window.setTimeout(revealInvitation, 1800);
  } else {
    revealInvitation();
  }

  const weddingStart = new Date('2026-11-22T15:30:00+09:00');
  const weddingEnd = new Date('2026-11-22T17:30:00+09:00');
  const dday = document.getElementById('d-day');
  const countdownDetail = document.getElementById('countdown-detail');
  const toast = document.getElementById('toast');
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2200);
  }

  function updateCountdown() {
    if (!dday || !countdownDetail) return;
    const now = new Date();
    const diff = weddingStart.getTime() - now.getTime();

    if (diff <= 0) {
      dday.textContent = now <= weddingEnd ? 'Today' : 'Thank you';
      countdownDetail.textContent = now <= weddingEnd ? '오늘, 예식이 진행됩니다.' : '축복해 주셔서 감사합니다.';
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    dday.textContent = `D-${days}`;
    countdownDetail.textContent = `예식까지 ${days}일 ${hours}시간 ${minutes}분 남았습니다.`;
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      showToast('복사되었습니다.');
    } catch (error) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.top = '-1000px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
      showToast('복사되었습니다.');
    }
  }

  const eventTitle = '박용태 · 나수진 결혼식';
  const eventLocation = '더채플앳청담 커티지홀, 서울 강남구 선릉로 757, 더채플앳청담 2F';
  const eventDescription = '박용태와 나수진의 결혼식에 초대합니다.';
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=20261122T063000Z%2F20261122T083000Z&ctz=Asia%2FSeoul&location=${encodeURIComponent(eventLocation)}&details=${encodeURIComponent(eventDescription)}&sf=true&output=xml`;
  const androidIntentUrl = `intent://com.android.calendar/events#Intent;scheme=content;action=android.intent.action.INSERT;type=vnd.android.cursor.item/event;S.title=${encodeURIComponent(eventTitle)};S.eventLocation=${encodeURIComponent(eventLocation)};S.description=${encodeURIComponent(eventDescription)};l.beginTime=1795329000000;l.endTime=1795336200000;end`;

  function calendarTarget() {
    const ua = navigator.userAgent || '';
    const isAndroid = /Android/i.test(ua);
    const isIOS = /iPad|iPhone|iPod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isSamsungBrowser = /SamsungBrowser/i.test(ua);
    const icsUrl = new URL('wedding.ics', window.location.href).href;

    if (isAndroid) return { label: 'Android 캘린더', url: androidIntentUrl, fallback: isSamsungBrowser ? '' : icsUrl, fallbackDelay: 1800 };
    if (isIOS) return { label: 'iPhone 캘린더', url: icsUrl };
    return { label: 'Google 캘린더', url: googleCalendarUrl };
  }

  function openCalendarTarget(target) {
    let externalOpenStarted = false;
    const markExternalOpen = () => { externalOpenStarted = true; };
    const markHidden = () => { if (document.hidden) markExternalOpen(); };

    window.addEventListener('pagehide', markExternalOpen, { once: true });
    window.addEventListener('blur', markExternalOpen, { once: true });
    document.addEventListener('visibilitychange', markHidden, { once: true });

    window.location.href = target.url;
    if (!target.fallback) return;

    window.setTimeout(() => {
      const pageStillActive = !externalOpenStarted && !document.hidden && document.hasFocus();
      if (pageStillActive) window.location.href = target.fallback;
    }, target.fallbackDelay || 1600);
  }

  const calendarAddButton = document.getElementById('calendar-add');
  if (calendarAddButton) {
    calendarAddButton.addEventListener('click', () => {
      const target = calendarTarget();
      showToast(`${target.label} 등록 화면을 엽니다.`);
      openCalendarTarget(target);
    });
  }

  function setupAccountAnimations() {
    const groups = Array.from(document.querySelectorAll('.account-group'));
    if (!groups.length) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    groups.forEach((group) => {
      const summary = group.querySelector('summary');
      const panel = group.querySelector('.account-list');
      if (!summary || !panel) return;
      group.dataset.animated = 'true';
      if (group.open) panel.style.maxHeight = `${panel.scrollHeight}px`;

      summary.addEventListener('click', (event) => {
        event.preventDefault();
        if (group.dataset.animating === 'true') return;
        if (group.open) closeGroup(group, panel);
        else openGroup(group, panel);
      });
    });

    function finish(group, panel) {
      group.dataset.animating = 'false';
      if (group.open) panel.style.maxHeight = `${panel.scrollHeight}px`;
    }

    function openGroup(group, panel) {
      if (reduceMotion) {
        group.open = true;
        panel.style.maxHeight = `${panel.scrollHeight}px`;
        return;
      }
      group.dataset.animating = 'true';
      group.open = true;
      panel.style.maxHeight = '0px';
      panel.style.opacity = '0';
      panel.style.transform = 'translateY(-4px)';
      panel.offsetHeight;
      requestAnimationFrame(() => {
        panel.style.maxHeight = `${panel.scrollHeight}px`;
        panel.style.opacity = '1';
        panel.style.transform = 'translateY(0)';
      });
      panel.addEventListener('transitionend', function done(event) {
        if (event.propertyName !== 'max-height') return;
        panel.removeEventListener('transitionend', done);
        finish(group, panel);
      });
    }

    function closeGroup(group, panel) {
      if (reduceMotion) {
        group.open = false;
        panel.style.maxHeight = '0px';
        return;
      }
      group.dataset.animating = 'true';
      panel.style.maxHeight = `${panel.scrollHeight}px`;
      panel.style.opacity = '1';
      panel.style.transform = 'translateY(0)';
      panel.offsetHeight;
      requestAnimationFrame(() => {
        panel.style.maxHeight = '0px';
        panel.style.opacity = '0';
        panel.style.transform = 'translateY(-4px)';
      });
      panel.addEventListener('transitionend', function done(event) {
        if (event.propertyName !== 'max-height') return;
        panel.removeEventListener('transitionend', done);
        group.open = false;
        finish(group, panel);
      });
    }
  }

  document.querySelectorAll('.copy-button').forEach((button) => {
    button.addEventListener('click', () => copyText(button.dataset.copy || ''));
  });

  const shareButton = document.getElementById('share-invitation');
  if (shareButton) {
    shareButton.addEventListener('click', async () => {
      const shareData = {
        title: '박용태 · 나수진 모바일 청첩장',
        text: '박용태와 나수진의 결혼식에 초대합니다.',
        url: window.location.href
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
          return;
        } catch (error) {
          if (error.name === 'AbortError') return;
        }
      }

      await copyText(window.location.href);
      showToast('청첩장 주소를 복사했습니다.');
    });
  }

  async function setupGallery() {
    const galleryRoot = document.querySelector('[data-gallery-max]');
    const counter = document.getElementById('gallery-counter');
    const prevButton = document.querySelector('[data-gallery-prev]');
    const nextButton = document.querySelector('[data-gallery-next]');
    const openButton = document.querySelector('[data-gallery-open]');
    const track = document.getElementById('gallery-track');
    const thumbsContainer = document.querySelector('.gallery-thumbs');
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxTrack = document.getElementById('lightbox-track');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const viewport = document.querySelector('[data-lightbox-viewport]');
    const closeButton = document.querySelector('[data-lightbox-close]');
    const lightboxPrev = document.querySelector('[data-lightbox-prev]');
    const lightboxNext = document.querySelector('[data-lightbox-next]');

    if (!galleryRoot || !counter || !prevButton || !nextButton || !openButton || !track || !thumbsContainer || !lightbox || !lightboxTrack || !viewport) return;

    const fallbackSlides = Array.from(track.querySelectorAll('img')).map((image, imageIndex) => ({
      src: image.getAttribute('src') || '',
      alt: image.getAttribute('alt') || `웨딩 사진 ${imageIndex + 1}`,
      width: Number(image.getAttribute('width')) || 900,
      height: Number(image.getAttribute('height')) || 900
    })).filter((slide) => slide.src);

    const galleryMax = Math.min(10, Math.max(1, Number(galleryRoot.dataset.galleryMax || 10)));

    function normalizeSlide(slide, slideIndex) {
      if (!slide || !slide.src) return null;
      return {
        src: String(slide.src),
        alt: String(slide.alt || `웨딩 사진 ${slideIndex + 1}`),
        width: Number(slide.width) || 900,
        height: Number(slide.height) || 900
      };
    }

    async function loadGalleryManifest() {
      if (!window.fetch) return [];
      try {
        const response = await fetch('assets/wedding-gallery.json', { cache: 'no-store' });
        if (!response.ok) return [];
        const data = await response.json();
        if (!Array.isArray(data)) return [];
        return data.map(normalizeSlide).filter(Boolean).slice(0, galleryMax);
      } catch (error) {
        return [];
      }
    }

    let slides = await loadGalleryManifest();
    if (!slides.length) slides = fallbackSlides.map(normalizeSlide).filter(Boolean).slice(0, galleryMax);
    if (!slides.length) return;

    let slideImages = [];
    let thumbButtons = [];
    let lightboxImages = [];
    let index = 0;
    let galleryDrag = null;
    let lightboxDrag = null;
    let imagePanDrag = null;
    let pinchState = null;
    let lightboxZoom = 1;
    let lightboxPanX = 0;
    let lightboxPanY = 0;
    let lastSwipeAt = 0;

    function createGalleryImage(slide, slideIndex, fullSize = false) {
      const image = document.createElement('img');
      image.src = slide.src;
      image.width = slide.width;
      image.height = slide.height;
      image.decoding = 'async';
      image.alt = fullSize ? `${slide.alt} 전체화면` : slide.alt;
      if (slideIndex > 0) image.loading = 'lazy';
      return image;
    }

    function buildGalleryDom() {
      track.textContent = '';
      lightboxTrack.textContent = '';
      thumbsContainer.textContent = '';

      slides.forEach((slide, slideIndex) => {
        track.appendChild(createGalleryImage(slide, slideIndex, false));
        lightboxTrack.appendChild(createGalleryImage(slide, slideIndex, true));

        const button = document.createElement('button');
        button.className = 'gallery-thumb';
        button.type = 'button';
        button.dataset.galleryIndex = String(slideIndex);
        button.setAttribute('aria-label', `${slideIndex + 1}번 사진 보기`);
        button.appendChild(createGalleryImage({ ...slide, alt: `${slide.alt} 미리보기` }, slideIndex, false));
        button.addEventListener('click', () => goTo(slideIndex));
        thumbsContainer.appendChild(button);
      });

      slideImages = Array.from(track.querySelectorAll('img'));
      lightboxImages = Array.from(lightboxTrack.querySelectorAll('img'));
      thumbButtons = Array.from(thumbsContainer.querySelectorAll('[data-gallery-index]'));
      galleryRoot.dataset.galleryCount = String(slides.length);
      openButton.setAttribute('aria-label', `${index + 1}번 사진 전체화면으로 보기`);
    }

    function clamp(value, min, max) {
      return Math.max(min, Math.min(max, value));
    }

    function surfaceWidth(surface) {
      return surface.getBoundingClientRect().width || 1;
    }

    function setTrackPosition(targetTrack, offsetPx = 0, animate = true) {
      if (!targetTrack) return;
      targetTrack.classList.toggle('is-dragging', !animate);
      targetTrack.style.transform = offsetPx
        ? `translate3d(calc(${-index * 100}% + ${offsetPx}px), 0, 0)`
        : `translate3d(${-index * 100}%, 0, 0)`;
    }

    function activeLightboxImage() {
      return lightboxImages[index];
    }

    function clearImageZoom(image) {
      if (!image) return;
      image.style.removeProperty('--zoom');
      image.style.removeProperty('--zoom-pan-x');
      image.style.removeProperty('--zoom-pan-y');
    }

    function applyLightboxZoom(animate = true) {
      lightboxImages.forEach((image, imageIndex) => {
        if (imageIndex !== index) clearImageZoom(image);
      });
      lightboxTrack.classList.toggle('is-panning', !animate && !pinchState && lightboxZoom > 1);
      const image = activeLightboxImage();
      if (!image) return;
      if (lightboxZoom <= 1.001) {
        lightboxZoom = 1;
        lightboxPanX = 0;
        lightboxPanY = 0;
      }
      image.style.setProperty('--zoom', lightboxZoom.toFixed(3));
      image.style.setProperty('--zoom-pan-x', `${lightboxPanX}px`);
      image.style.setProperty('--zoom-pan-y', `${lightboxPanY}px`);
    }

    function resetLightboxZoom() {
      lightboxZoom = 1;
      lightboxPanX = 0;
      lightboxPanY = 0;
      imagePanDrag = null;
      pinchState = null;
      lightboxTrack.classList.remove('is-panning', 'is-pinching');
      lightboxImages.forEach(clearImageZoom);
    }

    function updateActiveState() {
      const atStart = index === 0;
      const atEnd = index === slides.length - 1;
      counter.textContent = `${index + 1} / ${slides.length}`;
      if (lightboxCounter) lightboxCounter.textContent = `${index + 1} / ${slides.length}`;
      openButton.setAttribute('aria-label', `${index + 1}번 사진 전체화면으로 보기`);
      slideImages.forEach((image, imageIndex) => {
        image.toggleAttribute('aria-hidden', imageIndex !== index);
      });
      lightboxImages.forEach((image, imageIndex) => {
        image.toggleAttribute('aria-hidden', imageIndex !== index);
      });
      thumbButtons.forEach((button, buttonIndex) => {
        const active = buttonIndex === index;
        button.classList.toggle('is-active', active);
        if (active) button.setAttribute('aria-current', 'true');
        else button.removeAttribute('aria-current');
      });
      [prevButton, lightboxPrev].forEach((button) => {
        if (!button) return;
        button.disabled = atStart;
        button.setAttribute('aria-disabled', String(atStart));
      });
      [nextButton, lightboxNext].forEach((button) => {
        if (!button) return;
        button.disabled = atEnd;
        button.setAttribute('aria-disabled', String(atEnd));
      });
    }

    function render(animate = true, resetZoom = true) {
      if (resetZoom) resetLightboxZoom();
      setTrackPosition(track, 0, animate);
      setTrackPosition(lightboxTrack, 0, animate);
      if (!animate) {
        requestAnimationFrame(() => {
          track.classList.remove('is-dragging');
          lightboxTrack.classList.remove('is-dragging');
        });
      }
      updateActiveState();
    }

    function move(delta) {
      index = clamp(index + delta, 0, slides.length - 1);
      render(true, true);
    }

    function goTo(nextIndex) {
      index = clamp(nextIndex, 0, slides.length - 1);
      render(true, true);
    }

    function openLightbox() {
      render(false, true);
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('lightbox-open');
      closeButton?.focus({ preventScroll: true });
    }

    function closeLightbox() {
      resetLightboxZoom();
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('lightbox-open');
      openButton.focus({ preventScroll: true });
    }

    function dragTarget(kind) {
      const isLightbox = kind === 'lightbox';
      return {
        surface: isLightbox ? viewport : openButton,
        trackElement: isLightbox ? lightboxTrack : track,
        getState: () => (isLightbox ? lightboxDrag : galleryDrag),
        setState: (value) => { if (isLightbox) lightboxDrag = value; else galleryDrag = value; }
      };
    }

    function startTrackDrag(event, kind) {
      if (slides.length < 2) return;
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      if (kind === 'lightbox' && lightboxZoom > 1) {
        imagePanDrag = {
          pointerId: event.pointerId,
          startX: event.clientX,
          startY: event.clientY,
          panX: lightboxPanX,
          panY: lightboxPanY
        };
        lightboxTrack.classList.add('is-panning');
        try { viewport.setPointerCapture(event.pointerId); } catch (error) {}
        return;
      }
      if (kind === 'lightbox' && pinchState) return;
      const target = dragTarget(kind);
      target.setState({
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        dx: 0,
        dy: 0,
        width: surfaceWidth(target.surface),
        startedAt: performance.now(),
        locked: null,
        dragged: false
      });
      try { target.surface.setPointerCapture(event.pointerId); } catch (error) {}
    }

    function updateTrackDrag(event, kind) {
      if (kind === 'lightbox' && imagePanDrag && event.pointerId === imagePanDrag.pointerId) {
        event.preventDefault();
        lightboxPanX = imagePanDrag.panX + event.clientX - imagePanDrag.startX;
        lightboxPanY = imagePanDrag.panY + event.clientY - imagePanDrag.startY;
        applyLightboxZoom(false);
        return;
      }
      const target = dragTarget(kind);
      const drag = target.getState();
      if (!drag || event.pointerId !== drag.pointerId) return;
      drag.dx = event.clientX - drag.startX;
      drag.dy = event.clientY - drag.startY;

      if (!drag.locked && Math.hypot(drag.dx, drag.dy) > 8) {
        drag.locked = Math.abs(drag.dx) > Math.abs(drag.dy) * 1.15 ? 'x' : 'y';
      }
      if (drag.locked !== 'x') return;

      event.preventDefault();
      drag.dragged = true;
      setTrackPosition(target.trackElement, drag.dx, false);
    }

    function finishTrackDrag(event, kind) {
      if (kind === 'lightbox' && imagePanDrag && event.pointerId === imagePanDrag.pointerId) {
        imagePanDrag = null;
        lightboxTrack.classList.remove('is-panning');
        try { viewport.releasePointerCapture(event.pointerId); } catch (error) {}
        applyLightboxZoom(true);
        return;
      }
      const target = dragTarget(kind);
      const drag = target.getState();
      if (!drag || event.pointerId !== drag.pointerId) return;
      target.setState(null);
      try { target.surface.releasePointerCapture(event.pointerId); } catch (error) {}

      if (drag.locked === 'x' && drag.dragged) {
        const elapsed = Math.max(1, performance.now() - drag.startedAt);
        const velocity = drag.dx / elapsed;
        const threshold = Math.min(90, Math.max(42, drag.width * .18));
        if (Math.abs(drag.dx) > threshold || Math.abs(velocity) > .45) {
          index = clamp(index + (drag.dx < 0 ? 1 : -1), 0, slides.length - 1);
        }
        if (kind === 'gallery') lastSwipeAt = Date.now();
      }
      render(true, true);
    }

    function cancelTrackDrag(kind) {
      const target = dragTarget(kind);
      if (kind === 'lightbox') {
        imagePanDrag = null;
        lightboxTrack.classList.remove('is-panning');
      }
      if (!target.getState()) return;
      target.setState(null);
      render(true, true);
    }

    function touchDistance(touches) {
      const [a, b] = touches;
      return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
    }

    function startPinch(event) {
      if (!lightbox.classList.contains('is-open') || event.touches.length !== 2) return;
      event.preventDefault();
      cancelTrackDrag('lightbox');
      imagePanDrag = null;
      pinchState = {
        distance: touchDistance(event.touches),
        zoom: lightboxZoom,
        panX: lightboxPanX,
        panY: lightboxPanY
      };
      lightboxTrack.classList.add('is-pinching');
    }

    function updatePinch(event) {
      if (!lightbox.classList.contains('is-open')) return;
      if (event.touches.length > 1) event.preventDefault();
      if (!pinchState || event.touches.length !== 2) return;
      const nextZoom = pinchState.zoom * (touchDistance(event.touches) / pinchState.distance);
      lightboxZoom = clamp(nextZoom, 1, 4);
      if (lightboxZoom <= 1.001) {
        lightboxPanX = 0;
        lightboxPanY = 0;
      } else {
        lightboxPanX = pinchState.panX;
        lightboxPanY = pinchState.panY;
      }
      applyLightboxZoom(false);
    }

    function finishPinch(event) {
      if (!pinchState || event.touches.length > 1) return;
      pinchState = null;
      lightboxTrack.classList.remove('is-pinching');
      if (lightboxZoom < 1.03) {
        resetLightboxZoom();
      } else {
        applyLightboxZoom(true);
      }
    }

    function blockNativeGesture(event) {
      if (!lightbox.classList.contains('is-open')) return;
      event.preventDefault();
    }

    buildGalleryDom();

    openButton.addEventListener('pointerdown', (event) => startTrackDrag(event, 'gallery'));
    openButton.addEventListener('pointermove', (event) => updateTrackDrag(event, 'gallery'));
    openButton.addEventListener('pointerup', (event) => finishTrackDrag(event, 'gallery'));
    openButton.addEventListener('pointercancel', () => cancelTrackDrag('gallery'));

    viewport.addEventListener('pointerdown', (event) => startTrackDrag(event, 'lightbox'));
    viewport.addEventListener('pointermove', (event) => updateTrackDrag(event, 'lightbox'));
    viewport.addEventListener('pointerup', (event) => finishTrackDrag(event, 'lightbox'));
    viewport.addEventListener('pointercancel', () => cancelTrackDrag('lightbox'));
    viewport.addEventListener('touchstart', startPinch, { passive: false });
    viewport.addEventListener('touchmove', updatePinch, { passive: false });
    viewport.addEventListener('touchend', finishPinch, { passive: false });
    viewport.addEventListener('touchcancel', finishPinch, { passive: false });
    ['gesturestart', 'gesturechange', 'gestureend'].forEach((type) => {
      viewport.addEventListener(type, blockNativeGesture, { passive: false });
      lightbox.addEventListener(type, blockNativeGesture, { passive: false });
    });
    document.addEventListener('touchmove', (event) => {
      if (lightbox.classList.contains('is-open') && event.touches.length > 1) event.preventDefault();
    }, { passive: false });

    prevButton.addEventListener('click', () => move(-1));
    nextButton.addEventListener('click', () => move(1));
    openButton.addEventListener('click', () => {
      if (Date.now() - lastSwipeAt < 420) return;
      openLightbox();
    });
    closeButton?.addEventListener('click', closeLightbox);
    lightboxPrev?.addEventListener('click', () => move(-1));
    lightboxNext?.addEventListener('click', () => move(1));

    document.addEventListener('keydown', (event) => {
      if (!lightbox.classList.contains('is-open')) return;
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') move(-1);
      if (event.key === 'ArrowRight') move(1);
    });

    render(false, true);
  }

  setupGallery();
  setupGallery();
  setupAccountAnimations();

  updateCountdown();
  window.setInterval(updateCountdown, 60000);
})();
