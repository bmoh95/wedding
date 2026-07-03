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
  const eventLocation = '더채플앳청담 커티지홀, 서울 강남구 선릉로 757';
  const eventDescription = '박용태와 나수진의 결혼식에 초대합니다.';
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=20261122T063000Z%2F20261122T083000Z&ctz=Asia%2FSeoul&location=${encodeURIComponent(eventLocation)}&details=${encodeURIComponent(eventDescription)}&sf=true&output=xml`;
  const androidIntentUrl = `intent:#Intent;action=android.intent.action.INSERT;type=vnd.android.cursor.item/event;S.title=${encodeURIComponent(eventTitle)};S.eventLocation=${encodeURIComponent(eventLocation)};S.description=${encodeURIComponent(eventDescription)};l.beginTime=1795329000000;l.endTime=1795336200000;end`;

  function calendarTarget() {
    const ua = navigator.userAgent || '';
    const isAndroid = /Android/i.test(ua);
    const isIOS = /iPad|iPhone|iPod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const icsUrl = new URL('wedding.ics', window.location.href).href;

    if (isAndroid) return { label: 'Android 캘린더', url: androidIntentUrl, fallback: googleCalendarUrl };
    if (isIOS) return { label: 'iPhone 캘린더', url: icsUrl };
    return { label: 'Google 캘린더', url: googleCalendarUrl };
  }

  const calendarAddButton = document.getElementById('calendar-add');
  if (calendarAddButton) {
    calendarAddButton.addEventListener('click', () => {
      const target = calendarTarget();
      showToast(`${target.label} 등록 화면을 엽니다.`);
      window.location.href = target.url;
      if (target.fallback) {
        window.setTimeout(() => {
          if (!document.hidden) window.location.href = target.fallback;
        }, 900);
      }
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

  function setupGallery() {
    const counter = document.getElementById('gallery-counter');
    const prevButton = document.querySelector('[data-gallery-prev]');
    const nextButton = document.querySelector('[data-gallery-next]');
    const openButton = document.querySelector('[data-gallery-open]');
    const track = document.getElementById('gallery-track');
    const slideImages = Array.from(track?.querySelectorAll('img') || []);
    const thumbButtons = Array.from(document.querySelectorAll('[data-gallery-index]'));
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxTrack = document.getElementById('lightbox-track');
    const lightboxImages = Array.from(lightboxTrack?.querySelectorAll('img') || []);
    const lightboxCounter = document.getElementById('lightbox-counter');
    const viewport = document.querySelector('[data-lightbox-viewport]');
    const closeButton = document.querySelector('[data-lightbox-close]');
    const lightboxPrev = document.querySelector('[data-lightbox-prev]');
    const lightboxNext = document.querySelector('[data-lightbox-next]');

    if (!counter || !prevButton || !nextButton || !openButton || !track || !slideImages.length || !lightbox || !lightboxTrack || !lightboxImages.length || !viewport) return;

    const slides = slideImages.map((image, imageIndex) => ({
      src: image.getAttribute('src') || '',
      alt: image.getAttribute('alt') || `웨딩 사진 샘플 ${imageIndex + 1}`
    })).filter((slide) => slide.src);
    if (!slides.length) return;

    let index = 0;
    let galleryDrag = null;
    let lightboxDrag = null;
    let lastSwipeAt = 0;

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

    function updateActiveState() {
      counter.textContent = `${index + 1} / ${slides.length}`;
      if (lightboxCounter) lightboxCounter.textContent = `${index + 1} / ${slides.length}`;
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
    }

    function render(animate = true) {
      setTrackPosition(track, 0, animate);
      setTrackPosition(lightboxTrack, 0, animate);
      updateActiveState();
    }

    function move(delta) {
      index = (index + delta + slides.length) % slides.length;
      render(true);
    }

    function goTo(nextIndex) {
      index = clamp(nextIndex, 0, slides.length - 1);
      render(true);
    }

    function openLightbox() {
      render(false);
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('lightbox-open');
      closeButton?.focus({ preventScroll: true });
    }

    function closeLightbox() {
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
          index = (index + (drag.dx < 0 ? 1 : -1) + slides.length) % slides.length;
        }
        if (kind === 'gallery') lastSwipeAt = Date.now();
      }
      render(true);
    }

    function cancelTrackDrag(kind) {
      const target = dragTarget(kind);
      if (!target.getState()) return;
      target.setState(null);
      render(true);
    }

    openButton.addEventListener('pointerdown', (event) => startTrackDrag(event, 'gallery'));
    openButton.addEventListener('pointermove', (event) => updateTrackDrag(event, 'gallery'));
    openButton.addEventListener('pointerup', (event) => finishTrackDrag(event, 'gallery'));
    openButton.addEventListener('pointercancel', () => cancelTrackDrag('gallery'));

    viewport.addEventListener('pointerdown', (event) => startTrackDrag(event, 'lightbox'));
    viewport.addEventListener('pointermove', (event) => updateTrackDrag(event, 'lightbox'));
    viewport.addEventListener('pointerup', (event) => finishTrackDrag(event, 'lightbox'));
    viewport.addEventListener('pointercancel', () => cancelTrackDrag('lightbox'));

    prevButton.addEventListener('click', () => move(-1));
    nextButton.addEventListener('click', () => move(1));
    openButton.addEventListener('click', () => {
      if (Date.now() - lastSwipeAt < 420) return;
      openLightbox();
    });
    thumbButtons.forEach((button) => button.addEventListener('click', () => goTo(Number(button.dataset.galleryIndex || 0))));
    closeButton?.addEventListener('click', closeLightbox);
    lightboxPrev?.addEventListener('click', () => move(-1));
    lightboxNext?.addEventListener('click', () => move(1));

    document.addEventListener('keydown', (event) => {
      if (!lightbox.classList.contains('is-open')) return;
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') move(-1);
      if (event.key === 'ArrowRight') move(1);
    });

    render(false);
  }

  setupGallery();
  setupAccountAnimations();

  updateCountdown();
  window.setInterval(updateCountdown, 60000);
})();
