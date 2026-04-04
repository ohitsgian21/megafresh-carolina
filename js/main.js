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

        // Drag & Drop File Upload
        const dropZone = document.getElementById("dropZone");
        const fileInput = document.getElementById("attachment");

        if (dropZone && fileInput) {
            // Click to open file dialog
            dropZone.addEventListener("click", () => fileInput.click());

            // Highlight on drag over
            dropZone.addEventListener("dragover", (e) => {
                e.preventDefault();
                dropZone.classList.add("dragover");
            });

            // Remove highlight on drag leave
            dropZone.addEventListener("dragleave", () => {
                dropZone.classList.remove("dragover");
            });

            // Handle file drop
            dropZone.addEventListener("drop", (e) => {
                e.preventDefault();
                dropZone.classList.remove("dragover");
                fileInput.files = e.dataTransfer.files;
            });
        }

    });
})(jQuery);
