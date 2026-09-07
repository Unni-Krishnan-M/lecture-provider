/* ------------------------------------------------------------------
   Lecture Provider — UI behaviour.
   Flow: pick an exam → browse that exam's lectures (filter + search).
   Presentational only: no network, no accounts, no orders.
------------------------------------------------------------------ */
(function () {
  'use strict';

  var $  = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  var STORE_KEY = 'lp.track';
  var state = { track: null, subject: 'All', query: '' };

  /* ---------------- Toast ---------------- */
  var toastEl = $('[data-toast]');
  var toastTimer;
  function toast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('is-on'); }, 2000);
  }

  /* ---------------- Inline SVG artwork ----------------
     Keeps the page self-contained: no image requests, nothing to break. */
  var MOTIFS = {
    nodes: '<circle cx="70" cy="70" r="9"/><circle cx="150" cy="46" r="6"/><circle cx="146" cy="118" r="13"/><circle cx="62" cy="140" r="7"/><path d="M70 70L150 46M70 70l76 48M146 118l-84 22M70 70L62 140" stroke-width="1.6" fill="none"/>',
    window: '<rect x="42" y="44" width="136" height="94" rx="10" fill="none" stroke-width="2"/><path d="M42 68h136" stroke-width="2"/><circle cx="56" cy="56" r="3.2" stroke="none"/><circle cx="68" cy="56" r="3.2" stroke="none"/><path d="M64 92h44M64 108h72M64 124h34" stroke-width="3" stroke-linecap="round"/>',
    grid: '<rect x="44" y="46" width="58" height="42" rx="8" fill="none" stroke-width="2"/><rect x="116" y="46" width="58" height="42" rx="8" stroke="none" opacity=".22"/><rect x="44" y="100" width="58" height="42" rx="8" stroke="none" opacity=".22"/><rect x="116" y="100" width="58" height="42" rx="8" fill="none" stroke-width="2"/>',
    letter: '<path d="M74 140V58h32a22 22 0 0 1 0 44H74m32 0 30 38" fill="none" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="M52 152h116" stroke-width="2" opacity=".4"/>',
    layers: '<path d="M110 40l62 30-62 30-62-30 62-30z" fill="none" stroke-width="2"/><path d="M48 96l62 30 62-30" fill="none" stroke-width="2" opacity=".55"/><path d="M48 122l62 30 62-30" fill="none" stroke-width="2" opacity=".3"/>',
    chart: '<path d="M50 142V96M82 142V70M114 142V110M146 142V54" stroke-width="9" stroke-linecap="round"/><path d="M40 152h140" stroke-width="2" opacity=".4"/>',
    spark: '<path d="M110 42l11 30 30 11-30 11-11 30-11-30-30-11 30-11 11-30z" fill="none" stroke-width="2.4" stroke-linejoin="round"/><circle cx="62" cy="132" r="6" stroke="none" opacity=".5"/><circle cx="158" cy="126" r="9" fill="none" stroke-width="2" opacity=".6"/>',
    wave: '<path d="M40 92h10v-22h10v44h10V60h10v64h10V78h10v28h10V50h10v56h10V84h10v-14h10v22h10" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>'
  };

  function artSvg(art, w, h, cls) {
    var id = 'g' + Math.random().toString(36).slice(2, 8);
    return '<svg class="' + (cls || '') + '" viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="xMidYMid slice" role="presentation" focusable="false">' +
      '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0" stop-color="' + art.from + '"/><stop offset="1" stop-color="' + art.to + '"/>' +
      '</linearGradient></defs>' +
      '<rect width="' + w + '" height="' + h + '" fill="url(#' + id + ')"/>' +
      '<g transform="translate(' + ((w - 220) / 2) + ',' + ((h - 190) / 2) + ')" stroke="' + art.ink + '" fill="' + art.ink + '" opacity=".8">' +
        MOTIFS[art.motif] +
      '</g></svg>';
  }

  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function rupees(n) { return '₹' + n.toLocaleString('en-IN'); }
  function trackById(id) {
    return window.LP_TRACKS.filter(function (t) { return t.id === id; })[0] || null;
  }
  function countFor(id) {
    return window.LP_COURSES.filter(function (c) { return c.track === id; }).length;
  }

  /* ==================================================================
     Step 1 — pick an exam
  ================================================================== */
  var tracksEl = $('[data-tracks]');
  if (tracksEl) {
    window.LP_TRACKS.forEach(function (track, i) {
      var li = document.createElement('li');
      li.className = 'reveal';
      li.style.setProperty('--d', (140 + i * 70) + 'ms');
      li.innerHTML =
        '<button class="track" type="button">' +
          '<span class="track__art">' + artSvg(track.art, 260, 114) + '</span>' +
          '<span class="track__body">' +
            '<span class="track__full">' + esc(track.full) + '</span>' +
            '<span class="track__name">' + esc(track.name) + '</span>' +
            '<span class="track__blurb">' + esc(track.blurb) + '</span>' +
            '<span class="track__meta">' +
              countFor(track.id) + ' lecture series' +
              '<span class="dot"></span>' + track.stats.faculty + ' faculty' +
              '<span class="dot"></span>★ ' + track.stats.rating +
            '</span>' +
            '<span class="track__cta">See ' + esc(track.name) + ' lectures' +
              '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6.5L18.5 12 13 17.5"/></svg>' +
            '</span>' +
          '</span>' +
        '</button>';
      $('.track', li).addEventListener('click', function () { selectTrack(track.id); });
      tracksEl.appendChild(li);
    });
  }

  function selectTrack(id, opts) {
    var track = trackById(id);
    if (!track) return;
    opts = opts || {};

    state.track = track;
    state.subject = 'All';
    state.query = '';

    var input = $('[data-search]');
    if (input) input.value = '';
    syncClearButton();

    document.body.classList.remove('is-chooser');
    $('[data-site]').hidden = false;

    paintTrack(track);
    renderSubjects(track);
    renderCourses();
    revealAll();
    try { localStorage.setItem(STORE_KEY, id); } catch (e) {}

    if (!opts.silent) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      var h = $('[data-hero-title]');
      if (h) h.focus({ preventScroll: true });
    }
  }

  function showChooser() {
    state.track = null;
    document.body.classList.add('is-chooser');
    $('[data-site]').hidden = true;
    var pill = $('[data-track-pill]');
    if (pill) pill.hidden = true;
    try { localStorage.removeItem(STORE_KEY); } catch (e) {}
    window.scrollTo({ top: 0, behavior: 'auto' });
    var t = $('#chooser-title');
    if (t) t.focus({ preventScroll: true });
  }

  /* ---------------- Track-dependent copy ---------------- */
  function paintTrack(track) {
    function set(sel, value, html) {
      var el = $(sel);
      if (!el) return;
      if (html) el.innerHTML = value; else el.textContent = value;
    }
    set('[data-hero-eyebrow]', track.name);
    set('[data-hero-title]', track.heroTitle, true);
    set('[data-hero-sub]', track.heroSub);
    set('[data-stat-lectures]', track.stats.lectures);
    set('[data-stat-faculty]', track.stats.faculty);
    set('[data-stat-rating]', track.stats.rating);
    set('[data-now-title]', track.nowPlaying.title);
    set('[data-now-meta]', track.nowPlaying.meta);
    set('[data-courses-title]', track.name + ' Lectures');
    set('[data-courses-sub]', 'Filter by subject or search the catalogue');

    var bar = $('[data-now-progress]');
    if (bar) bar.style.setProperty('--p', track.nowPlaying.progress);

    var thumb = $('[data-hero-thumb]');
    if (thumb) thumb.innerHTML = artSvg(track.art, 320, 200);

    var pill = $('[data-track-pill]');
    if (pill) {
      pill.hidden = false;
      $('[data-track-pill-name]').textContent = track.name;
      pill.setAttribute('aria-label', 'Current exam: ' + track.name + '. Choose a different exam.');
    }

    document.title = 'Lecture Provider — ' + track.name + ' lectures';
  }

  /* ==================================================================
     Step 2 — subject chips, search, grid
  ================================================================== */
  var chipsEl  = $('[data-categories]');
  var grid     = $('[data-course-grid]');
  var emptyEl  = $('[data-empty]');
  var countEl  = $('[data-result-count]');

  function renderSubjects(track) {
    if (!chipsEl) return;
    chipsEl.innerHTML = '';
    track.subjects.forEach(function (subject, i) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'chip';
      btn.textContent = subject;
      btn.setAttribute('aria-pressed', String(i === 0));
      btn.addEventListener('click', function () {
        $$('.chip', chipsEl).forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
        btn.setAttribute('aria-pressed', 'true');
        state.subject = subject;
        renderCourses();
      });
      chipsEl.appendChild(btn);
    });
  }

  function matches(course) {
    if (course.track !== state.track.id) return false;
    if (state.subject !== 'All' && course.subject !== state.subject) return false;
    if (!state.query) return true;
    var hay = (course.title + ' ' + course.subject + ' ' + course.instructor + ' ' + course.level).toLowerCase();
    return hay.indexOf(state.query) > -1;
  }

  function renderCourses() {
    if (!grid || !state.track) return;
    var total = countFor(state.track.id);
    var list = window.LP_COURSES.filter(matches);

    grid.innerHTML = '';
    list.forEach(function (course, i) {
      var li = courseCard(course);
      li.classList.add('reveal');
      li.style.setProperty('--d', Math.min(i, 7) * 45 + 'ms');
      grid.appendChild(li);
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { li.classList.add('is-in'); });
      });
    });

    if (emptyEl) emptyEl.hidden = list.length > 0;
    if (countEl) {
      countEl.innerHTML = list.length === total
        ? '<b>' + total + '</b> lectures'
        : '<b>' + list.length + '</b> of ' + total + ' lectures';
    }
  }

  /* ---------------- Lecture card (one reusable template) ---------------- */
  function courseCard(course) {
    var save = Math.round((1 - course.price / course.oldPrice) * 100);
    var li = document.createElement('li');

    li.innerHTML =
      '<article class="card">' +
        '<div class="card__media">' +
          artSvg(course.art, 240, 160, 'card__art') +
          (course.badge ? '<span class="card__badge">' + esc(course.badge) + '</span>' : '') +
          '<button class="card__wish" type="button" aria-pressed="false" aria-label="Save ' + esc(course.title) + '">' +
            '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-9.2A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7 2.8C19 15.6 12 20 12 20z"/></svg>' +
          '</button>' +
        '</div>' +
        '<div class="card__body">' +
          '<p class="card__subject">' + esc(course.subject) + '</p>' +
          '<h3 class="card__title"><a href="#courses">' + esc(course.title) + '</a></h3>' +
          '<p class="card__instructor">' + esc(course.instructor) + '</p>' +
          '<p class="card__meta">' +
            '<span class="star">' +
              '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5l2.6 5.6 6 .8-4.4 4.2 1.1 6L12 17.2 6.7 20.1l1.1-6L3.4 9.9l6-.8L12 3.5z"/></svg>' +
              course.rating.toFixed(1) +
            '</span>' +
            '<span class="dot"></span>' + course.hours + ' hrs' +
            '<span class="dot"></span>' + course.lessons + ' lessons' +
          '</p>' +
          '<p class="card__price">' +
            '<b>' + rupees(course.price) + '</b>' +
            '<s>' + rupees(course.oldPrice) + '</s>' +
            '<em>' + save + '% off</em>' +
          '</p>' +
          '<button class="card__cta" type="button">View lecture</button>' +
        '</div>' +
      '</article>';

    var wish = $('.card__wish', li);
    wish.addEventListener('click', function (e) {
      e.preventDefault();
      var on = wish.getAttribute('aria-pressed') !== 'true';
      wish.setAttribute('aria-pressed', String(on));
      bumpCounter('[data-saved-count]', on ? 1 : -1);
      toast(on ? 'Saved for later' : 'Removed from saved');
    });

    $('.card__cta', li).addEventListener('click', function () {
      bumpCounter('[data-cart-count]', 1);
      toast('Added to basket — demo only');
    });

    return li;
  }

  /* ---------------- Header counters ---------------- */
  var counts = {};
  function bumpCounter(sel, delta) {
    var el = $(sel);
    if (!el) return;
    counts[sel] = Math.max(0, (counts[sel] || 0) + delta);
    el.textContent = counts[sel];
    el.classList.toggle('is-on', counts[sel] > 0);
  }

  /* ---------------- Search ---------------- */
  var searchInput = $('[data-search]');
  var searchClear = $('[data-search-clear]');
  function syncClearButton() {
    if (searchClear) searchClear.hidden = !(searchInput && searchInput.value);
  }
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      state.query = searchInput.value.trim().toLowerCase();
      syncClearButton();
      renderCourses();
    });
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && searchInput.value) { clearSearch(); }
    });
  }
  function clearSearch() {
    if (!searchInput) return;
    searchInput.value = '';
    state.query = '';
    syncClearButton();
    renderCourses();
    searchInput.focus();
  }
  if (searchClear) searchClear.addEventListener('click', clearSearch);

  var focusSearchBtn = $('[data-focus-search]');
  if (focusSearchBtn && searchInput) {
    focusSearchBtn.addEventListener('click', function () {
      searchInput.scrollIntoView({ block: 'center', behavior: 'smooth' });
      searchInput.focus({ preventScroll: true });
    });
  }

  var resetBtn = $('[data-reset-filters]');
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      state.subject = 'All';
      if (searchInput) searchInput.value = '';
      state.query = '';
      syncClearButton();
      $$('.chip', chipsEl).forEach(function (b, i) { b.setAttribute('aria-pressed', String(i === 0)); });
      renderCourses();
    });
  }

  /* ---------------- Promo art ---------------- */
  var promoVisual = $('[data-promo-visual]');
  if (promoVisual) {
    promoVisual.innerHTML = artSvg({ from: '#2b2833', to: '#1b1922', ink: '#b0842c', motif: 'wave' }, 300, 300);
  }

  /* ---------------- Switching exams ---------------- */
  $$('[data-change-track]').forEach(function (btn) {
    btn.addEventListener('click', function () { closeMobileNav(); showChooser(); });
  });
  var pillBtn = $('[data-track-pill]');
  if (pillBtn) pillBtn.addEventListener('click', showChooser);
  $$('[data-goto-track]').forEach(function (btn) {
    btn.addEventListener('click', function () { selectTrack(btn.getAttribute('data-goto-track')); });
  });

  /* ---------------- Sticky header ---------------- */
  var header = $('[data-header]');
  function onScroll() { if (header) header.classList.toggle('is-stuck', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------- Mobile nav ---------------- */
  var menuBtn = $('[data-menu-toggle]');
  var mobileNav = $('[data-mobile-nav]');
  function closeMobileNav() {
    if (!mobileNav || !menuBtn) return;
    mobileNav.hidden = true;
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open menu');
  }
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', function () {
      var open = mobileNav.hidden;
      mobileNav.hidden = !open;
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    $$('.mobile-nav__link:not(.mobile-nav__link--btn)', mobileNav).forEach(function (a) {
      a.addEventListener('click', closeMobileNav);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !mobileNav.hidden) { closeMobileNav(); menuBtn.focus(); }
    });
  }

  /* ---------------- Entrance reveals ---------------- */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var io = null;
  if (!reduce && 'IntersectionObserver' in window) {
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-in'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });
  }
  function revealAll() {
    $$('.reveal:not(.is-in)').forEach(function (el) {
      if (el.closest('[data-course-grid]')) return;
      if (io) io.observe(el); else el.classList.add('is-in');
    });
  }

  /* ---------------- Newsletter (visual only) ---------------- */
  var form = $('[data-newsletter]');
  if (form) {
    var note = $('[data-newsletter-note]');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = $('.newsletter__input', form);
      var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
      note.classList.toggle('is-error', !valid);
      note.textContent = valid
        ? 'Thanks — you are on the list. (Demo only, nothing was sent.)'
        : 'Please enter a valid email address.';
      if (valid) input.value = '';
    });
  }

  /* ---------------- Demo-only buttons ---------------- */
  $$('[data-demo]').forEach(function (btn) {
    btn.addEventListener('click', function () { toast(btn.getAttribute('data-demo') + ' — demo only'); });
  });

  /* ---------------- Boot ---------------- */
  var saved = null;
  try { saved = localStorage.getItem(STORE_KEY); } catch (e) {}
  if (saved && trackById(saved)) {
    selectTrack(saved, { silent: true });
  } else {
    revealAll();
  }
})();
