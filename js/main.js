(function ($) {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {
        // Spinner
        const spinnerEl = document.getElementById('spinner');
        if (spinnerEl) {
            setTimeout(() => spinnerEl.classList.remove('show'), 1);
        }

        // WOW.js
        if (typeof WOW === 'function') new WOW().init();

        // Fixed Navbar
        window.addEventListener('scroll', function () {
            const fixedTop = document.querySelector('.fixed-top');
            if (!fixedTop) return;

            const scrolled = window.scrollY > 45;
            fixedTop.classList.toggle('bg-white', scrolled);
            fixedTop.classList.toggle('shadow', scrolled);
            if (window.innerWidth >= 992) {
                fixedTop.style.top = scrolled ? '-45px' : '0';
            }
        });

        // Back to top button
        const backToTop = document.querySelector('.back-to-top');
        window.addEventListener('scroll', function () {
            if (backToTop) {
                backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
            }
        });
        if (backToTop) {
            backToTop.addEventListener('click', () => {
                $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
            });
        }

        // Testimonials carousel
        $(".testimonial-carousel").owlCarousel({
            autoplay: true,
            smartSpeed: 1000,
            margin: 25,
            loop: true,
            center: true,
            dots: false,
            nav: true,
            navText: [
                '<i class="bi bi-chevron-left"></i>',
                '<i class="bi bi-chevron-right"></i>'
            ],
            responsive: {
                0: { items: 1 },
                768: { items: 2 },
                992: { items: 3 }
            }
        });


        // ── Contact form ──────────────────────────────────────────────────────
        const contactForm = document.getElementById("contactForm");
        const responseBox = document.getElementById("formResponse");
        const submitBtn   = document.getElementById("submitBtn");

        // After FormSubmit.co redirects back with ?sent=true, show success banner
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('sent') === 'true' && responseBox) {
            responseBox.className = "alert alert-success mt-3";
            responseBox.textContent = "¡Gracias! Tu mensaje ha sido enviado. Te responderemos pronto.";
            // Clean URL so refreshing the page doesn't re-show the message
            window.history.replaceState({}, document.title, window.location.pathname);
            // Scroll form into view
            responseBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // Client-side validation — only blocks submit if fields are invalid
        if (contactForm) {
            contactForm.addEventListener("submit", function (e) {
                const name    = contactForm.querySelector('#name').value.trim();
                const email   = contactForm.querySelector('#email').value.trim();
                const subject = contactForm.querySelector('#subject').value.trim();
                const message = contactForm.querySelector('#message').value.trim();
                const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!name || !email || !subject || !message) {
                    e.preventDefault();
                    responseBox.className = "alert alert-danger mt-3";
                    responseBox.textContent = "Por favor completa todos los campos requeridos.";
                    return;
                }
                if (!emailRe.test(email)) {
                    e.preventDefault();
                    responseBox.className = "alert alert-danger mt-3";
                    responseBox.textContent = "Por favor ingresa un correo electrónico válido.";
                    return;
                }
                // All valid — let the form submit natively to FormSubmit.co
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.value = "Enviando...";
                }
            });
        }

        // ── File Upload — drag & drop + click, supports multiple files ────────
        const dropZone  = document.getElementById("dropZone");
        const fileInput = document.getElementById("attachment");
        const fileList  = document.getElementById("fileList");

        // Render the selected-file list below the drop zone
        function renderFileList() {
            if (!fileList) return;
            fileList.innerHTML = "";
            const files = fileInput.files;
            if (!files || files.length === 0) return;

            Array.from(files).forEach(function (file, idx) {
                const kb  = (file.size / 1024).toFixed(0);
                const li  = document.createElement("li");
                li.className = "file-list-item";
                li.innerHTML =
                    '<i class="fas fa-paperclip me-1" aria-hidden="true"></i>' +
                    '<span class="file-name">' + file.name + '</span>' +
                    '<small class="text-muted ms-1">(' + kb + ' KB)</small>' +
                    '<button type="button" class="btn-remove-file ms-auto" ' +
                        'data-idx="' + idx + '" aria-label="Quitar ' + file.name + '">' +
                        '&times;' +
                    '</button>';
                fileList.appendChild(li);
            });
        }

        // Merge a FileList into the current input (so "add more" works)
        function mergeFiles(newFiles) {
            var dt = new DataTransfer();
            Array.from(fileInput.files).forEach(function (f) { dt.items.add(f); });
            Array.from(newFiles).forEach(function (f) { dt.items.add(f); });
            fileInput.files = dt.files;
        }

        if (dropZone && fileInput) {
            // Click drop zone → open picker.
            // Input is OUTSIDE the dropZone so the programmatic click
            // cannot bubble back up and trigger a second dialog.
            dropZone.addEventListener("click", function () {
                fileInput.click();
            });

            // Keyboard accessibility (Enter / Space)
            dropZone.addEventListener("keydown", function (e) {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    fileInput.click();
                }
            });

            // Drag feedback
            dropZone.addEventListener("dragover", function (e) {
                e.preventDefault();
                dropZone.classList.add("dragover");
            });
            dropZone.addEventListener("dragleave", function () {
                dropZone.classList.remove("dragover");
            });

            // Drop — merge with already-selected files
            dropZone.addEventListener("drop", function (e) {
                e.preventDefault();
                dropZone.classList.remove("dragover");
                mergeFiles(e.dataTransfer.files);
                renderFileList();
            });

            // Native picker selection — merge so repeated opens add, not replace
            fileInput.addEventListener("change", function () {
                renderFileList();
            });

            // Remove individual file via the × button
            if (fileList) {
                fileList.addEventListener("click", function (e) {
                    var btn = e.target.closest(".btn-remove-file");
                    if (!btn) return;
                    var idx = parseInt(btn.dataset.idx, 10);
                    var dt  = new DataTransfer();
                    Array.from(fileInput.files).forEach(function (f, i) {
                        if (i !== idx) dt.items.add(f);
                    });
                    fileInput.files = dt.files;
                    renderFileList();
                });
            }
        }

    });
})(jQuery);
