/**
 * main.js — Mega Fresh Carolina
 * Core site functionality:
 *   - Spinner removal
 *   - Navbar scroll effect
 *   - Back-to-top button
 *   - Testimonials carousel (Owl Carousel via jQuery)
 *   - Scroll-reveal animations (IntersectionObserver, replaces WOW.js)
 *   - File upload with drag & drop (new contact form IDs)
 */
(function ($) {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {

        /* ── Spinner ───────────────────────────────────────────── */
        var spinnerEl = document.getElementById('spinner');
        if (spinnerEl) {
            window.addEventListener('load', function () {
                spinnerEl.classList.remove('show');
                spinnerEl.classList.add('hide');
            });
            // Failsafe: also hide after 3s if load event is slow
            setTimeout(function () {
                spinnerEl.classList.remove('show');
                spinnerEl.classList.add('hide');
            }, 3000);
        }

        /* ── Navbar scroll effect ──────────────────────────────── */
        var navbar = document.querySelector('.navbar');
        if (navbar) {
            window.addEventListener('scroll', function () {
                navbar.classList.toggle('scrolled', window.scrollY > 30);
            });
        }

        /* ── Back to Top ───────────────────────────────────────── */
        var backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
            window.addEventListener('scroll', function () {
                backToTop.classList.toggle('show', window.scrollY > 300);
            });
            backToTop.addEventListener('click', function (e) {
                e.preventDefault();
                // Native smooth scroll — works on all modern browsers including iOS
                try {
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                } catch (err) {
                    window.scrollTo(0, 0);
                }
            });
        }

        /* ── Testimonials Carousel (Owl) ───────────────────────── */
        if (window.jQuery && $.fn.owlCarousel && $(".testimonial-carousel").length) {
            $(".testimonial-carousel").owlCarousel({
                autoplay:      true,
                autoplayTimeout: 5000,
                smartSpeed:    800,
                margin:        24,
                loop:          true,
                center:        false,
                dots:          true,
                nav:           true,
                navText: [
                    '<i class="bi bi-chevron-left"></i>',
                    '<i class="bi bi-chevron-right"></i>'
                ],
                responsive: {
                    0:   { items: 1 },
                    768: { items: 2 },
                    992: { items: 3 }
                }
            });
        }

        /* ── Scroll-Reveal (IntersectionObserver) ──────────────── */
        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12 });

            document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
                observer.observe(el);
            });
        } else {
            // Fallback: just show everything immediately
            document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
                el.classList.add('visible');
            });
        }

        /* ── File Upload — drag & drop (contacto.html) ─────────── */
        var dropZone  = document.getElementById('file-upload-area');
        var fileInput = document.getElementById('file-input');
        var fileList  = document.getElementById('file-list');

        function escHtml(str) {
            return String(str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;');
        }

        function renderFileList() {
            if (!fileList || !fileInput) return;
            fileList.innerHTML = '';
            var files = fileInput.files;
            if (!files || files.length === 0) return;

            Array.from(files).forEach(function (file, idx) {
                var kb   = (file.size / 1024).toFixed(0);
                var chip = document.createElement('span');
                chip.className = 'file-chip';
                chip.innerHTML =
                    '<i class="fa fa-paperclip" aria-hidden="true"></i>' +
                    escHtml(file.name) +
                    ' <small>(' + kb + ' KB)</small>' +
                    '<button type="button" data-idx="' + idx + '" aria-label="Quitar ' + escHtml(file.name) + '">&times;</button>';
                fileList.appendChild(chip);
            });
        }

        function mergeFiles(newFiles) {
            if (!fileInput) return;
            var dt = new DataTransfer();
            Array.from(fileInput.files).forEach(function (f) { dt.items.add(f); });
            Array.from(newFiles).forEach(function (f) { dt.items.add(f); });
            fileInput.files = dt.files;
        }

        if (dropZone && fileInput) {
            dropZone.addEventListener('click', function () { fileInput.click(); });
            dropZone.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInput.click(); }
            });
            dropZone.addEventListener('dragover', function (e) {
                e.preventDefault();
                dropZone.classList.add('dragover');
            });
            dropZone.addEventListener('dragleave', function () {
                dropZone.classList.remove('dragover');
            });
            dropZone.addEventListener('drop', function (e) {
                e.preventDefault();
                dropZone.classList.remove('dragover');
                mergeFiles(e.dataTransfer.files);
                renderFileList();
            });
            fileInput.addEventListener('change', renderFileList);

            if (fileList) {
                fileList.addEventListener('click', function (e) {
                    var btn = e.target.closest('button[data-idx]');
                    if (!btn) return;
                    var idx = parseInt(btn.getAttribute('data-idx'), 10);
                    var dt  = new DataTransfer();
                    Array.from(fileInput.files).forEach(function (f, i) {
                        if (i !== idx) dt.items.add(f);
                    });
                    fileInput.files = dt.files;
                    renderFileList();
                });
            }
        }

    }); // DOMContentLoaded

})(window.jQuery || { fn: {} });
