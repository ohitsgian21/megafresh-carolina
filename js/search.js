/**
 * search.js — Mega Fresh Carolina
 * Live search overlay across deals + categories from data.js.
 */
(function() {
  'use strict';

  var overlay     = document.getElementById('search-overlay');
  var input       = document.getElementById('search-input');
  var results     = document.getElementById('search-results');
  var openBtns    = [
    document.getElementById('open-search'),
    document.getElementById('open-search-mobile')
  ];
  var closeBtn    = document.getElementById('close-search');

  if (!overlay || !input || !results) return;

  var deals      = window.deals      || [];
  var categories = window.categories || [];

  /* ── Open / Close ── */
  function openSearch() {
    overlay.classList.add('open');
    input.value = '';
    results.innerHTML = '';
    setTimeout(function() { input.focus(); }, 50);
    document.body.style.overflow = 'hidden';
  }

  function closeSearch() {
    overlay.classList.remove('open');
    input.value = '';
    results.innerHTML = '';
    document.body.style.overflow = '';
  }

  openBtns.forEach(function(btn) {
    if (btn) btn.addEventListener('click', openSearch);
  });

  if (closeBtn) closeBtn.addEventListener('click', closeSearch);

  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closeSearch();
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeSearch();
  });

  /* ── Escape HTML ── */
  function esc(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ── Search Logic ── */
  function doSearch(query) {
    if (!query || query.trim().length < 2) {
      results.innerHTML = '';
      return;
    }

    var q = query.toLowerCase().trim();
    var matched = [];

    // Search deals
    deals.forEach(function(deal) {
      if (
        deal.name.toLowerCase().indexOf(q) !== -1 ||
        deal.category.toLowerCase().indexOf(q) !== -1
      ) {
        matched.push({
          type: 'deal',
          name: deal.name,
          sub: deal.category,
          price: deal.price,
          link: 'ofertas.html'
        });
      }
    });

    // Search categories
    categories.forEach(function(cat) {
      if (
        cat.name.toLowerCase().indexOf(q) !== -1 ||
        cat.description.toLowerCase().indexOf(q) !== -1
      ) {
        matched.push({
          type: 'category',
          name: cat.name,
          sub: cat.description,
          price: null,
          link: 'categorias.html'
        });
      }
    });

    if (matched.length === 0) {
      results.innerHTML = '<div class="search-empty">No se encontraron resultados para "<strong>' + esc(query) + '</strong>"</div>';
      return;
    }

    // Limit to 10 results
    var top = matched.slice(0, 10);
    results.innerHTML = top.map(function(item) {
      var icon = item.type === 'category' ? '&#128701;' : '&#128722;';
      var priceHtml = item.price ? '<span class="result-price">' + esc(item.price) + '</span>' : '';
      return '<a href="' + esc(item.link) + '" class="search-result-item" role="option">' +
        '<span style="font-size:1.2rem;">' + icon + '</span>' +
        '<span>' +
        '<span class="result-name">' + esc(item.name) + '</span>' +
        '<br><span class="result-cat">' + esc(item.sub) + '</span>' +
        '</span>' +
        priceHtml +
        '</a>';
    }).join('');
  }

  /* ── Debounce ── */
  var debounceTimer;
  input.addEventListener('input', function() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function() {
      doSearch(input.value);
    }, 200);
  });

})();
