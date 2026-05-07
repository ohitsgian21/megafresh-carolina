/**
 * tv.js — Mega Fresh Carolina TV Display Mode
 * Port of Loveable Template's tv.tsx to vanilla JS.
 * Optimized for Samsung TV (Tizen) browsers.
 * Uses setInterval (not rAF) for compatibility.
 */
(function() {
  'use strict';

  var cats    = window.categories || [];
  var deals   = window.deals      || [];
  var store   = window.storeInfo  || {};

  var slidesContainer = document.getElementById('tv-slides');
  var dotsContainer   = document.getElementById('tv-dots');
  var clockEl         = document.getElementById('tv-clock');

  var SLIDE_DURATION = 7000; // ms per slide
  var currentSlide   = 0;
  var slideInterval  = null;

  /* ── Build slide data array ── */
  var slides = [];

  // Slide 0: Hero Promo
  slides.push({ type: 'hero' });

  // Slide 1: Featured Deals (first 4)
  if (deals.length >= 1) {
    slides.push({ type: 'deals', items: deals.slice(0, 4) });
  }

  // Slide 2: Categories
  if (cats.length >= 1) {
    slides.push({ type: 'categories', items: cats });
  }

  // Slide 3: More deals if available (next 4)
  if (deals.length >= 5) {
    slides.push({ type: 'deals', items: deals.slice(4, 8) });
  }

  /* ── Helper: escape HTML ── */
  function esc(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ── Build slide HTML ── */
  function buildSlide(slide, index) {
    var div = document.createElement('div');
    div.className = 'tv-slide';
    div.setAttribute('role', 'tabpanel');
    div.setAttribute('aria-label', 'Diapositiva ' + (index + 1));

    if (slide.type === 'hero') {
      div.className += ' tv-slide-hero';
      div.innerHTML =
        '<div class="tv-hero-content">' +
        '<div class="tv-hero-tag">&#128250; Mega Fresh Carolina</div>' +
        '<div class="tv-hero-title">Todo Lo Que Necesitas<br>A La Vuelta De La Esquina</div>' +
        '<div class="tv-hero-subtitle">' + esc(store.address || '24 Calle Yunquecito, Carolina, PR') + '</div>' +
        '</div>';
    } else if (slide.type === 'deals') {
      div.className += ' tv-slide-deals';
      var cardsHtml = (slide.items || []).map(function(d) {
        var badge = d.badge
          ? '<div class="tv-deal-badge' + (d.cold ? ' cold' : '') + '">' + esc(d.badge) + '</div>'
          : '';
        return '<div class="tv-deal-card">' +
          badge +
          '<img src="' + esc(d.img || 'img/product-1.jpg') + '" alt="' + esc(d.name) + '" onerror="this.onerror=null;this.src=\'img/product-1.jpg\'">' +
          '<div class="tv-deal-card-body">' +
          '<div class="tv-deal-cat">' + esc(d.category) + '</div>' +
          '<div class="tv-deal-name">' + esc(d.name) + '</div>' +
          '<div class="tv-deal-price">' + esc(d.price) + '</div>' +
          '</div></div>';
      }).join('');
      div.innerHTML =
        '<div class="tv-slide-title">Especiales Destacados</div>' +
        '<div class="tv-deals-grid">' + cardsHtml + '</div>';
    } else if (slide.type === 'categories') {
      div.className += ' tv-slide-categories';
      var catHtml = (slide.items || []).map(function(cat) {
        return '<div class="tv-cat-card">' +
          '<img src="' + esc(cat.gif) + '" alt="' + esc(cat.name) + '">' +
          '<div>' +
          '<div class="tv-cat-name">' + esc(cat.name) + '</div>' +
          '<div class="tv-cat-desc">' + esc(cat.description) + '</div>' +
          '</div></div>';
      }).join('');
      div.innerHTML =
        '<div class="tv-slide-title">Nuestras Categorías</div>' +
        '<div class="tv-cats-grid">' + catHtml + '</div>';
    }

    return div;
  }

  /* ── Build progress dots ── */
  function buildDots() {
    dotsContainer.innerHTML = '';
    slides.forEach(function(_, i) {
      var dot = document.createElement('div');
      dot.className = 'tv-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      dot.setAttribute('aria-label', 'Diapositiva ' + (i + 1));
      dotsContainer.appendChild(dot);
    });
  }

  /* ── Activate a slide ── */
  function goToSlide(index) {
    var allSlides = slidesContainer.querySelectorAll('.tv-slide');
    var allDots   = dotsContainer.querySelectorAll('.tv-dot');

    allSlides.forEach(function(s, i) {
      s.classList.toggle('active', i === index);
    });
    allDots.forEach(function(d, i) {
      d.classList.toggle('active', i === index);
      d.setAttribute('aria-selected', i === index ? 'true' : 'false');
    });
    currentSlide = index;
  }

  /* ── Auto-rotate ── */
  function startRotation() {
    slideInterval = setInterval(function() {
      var next = (currentSlide + 1) % slides.length;
      goToSlide(next);
    }, SLIDE_DURATION);
  }

  /* ── Clock ── */
  function updateClock() {
    if (!clockEl) return;
    try {
      clockEl.textContent = new Date().toLocaleTimeString('es-PR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
    } catch(e) {
      clockEl.textContent = new Date().toLocaleTimeString();
    }
  }

  /* ── Fullscreen toggle (F key) ── */
  document.addEventListener('keydown', function(e) {
    if (e.key === 'f' || e.key === 'F') {
      try {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
      } catch(err) {
        // Tizen may not support; fail silently
      }
    }
  });

  /* ── Init ── */
  function init() {
    if (!slidesContainer) return;

    // Render slides
    slides.forEach(function(slide, i) {
      slidesContainer.appendChild(buildSlide(slide, i));
    });

    buildDots();
    goToSlide(0);
    startRotation();
    updateClock();
    setInterval(updateClock, 1000);
  }

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
