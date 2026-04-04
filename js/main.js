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


        // Contact Form Submission via FormSubmit.co (works on static/GitHub Pages hosting)
        const contactForm = document.getElementById("contactForm");
        const responseBox = document.getElementById("formResponse");
        const submitBtn   = document.getElementById("submitBtn");

        if (contactForm) {
            contactForm.addEventListener("submit", function (e) {
                e.preventDefault();

                // Validate required fields before sending
                const name    = contactForm.querySelector('#name').value.trim();
                const email   = contactForm.querySelector('#email').value.trim();
                const subject = contactForm.querySelector('#subject').value.trim();
                const message = contactForm.querySelector('#message').value.trim();

                if (!name || !email || !subject || !message) {
                    responseBox.className = "alert alert-danger mt-3";
                    responseBox.textContent = "Por favor completa todos los campos requeridos.";
                    return;
                }

                // Disable button to prevent double submissions
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.value = "Enviando...";
                }

                const formData = new FormData(contactForm);

                fetch("https://formsubmit.co/ajax/gianquinones21@gmail.com", {
                    method: "POST",
                    headers: { "Accept": "application/json" },
                    body: formData
                })
                .then(res => res.json())
                .then(data => {
                    if (submitBtn) { submitBtn.disabled = false; submitBtn.value = "Enviar Mensaje"; }

                    if (data.success === "true" || data.success === true) {
                        responseBox.className = "alert alert-success mt-3";
                        responseBox.textContent = "¡Gracias! Tu mensaje ha sido enviado correctamente. Te responderemos pronto.";
                        contactForm.reset();
                    } else {
                        responseBox.className = "alert alert-danger mt-3";
                        responseBox.textContent = data.message || "Hubo un error al enviar el formulario. Inténtalo de nuevo.";
                    }

                    setTimeout(() => responseBox.classList.add("d-none"), 6000);
                })
                .catch(() => {
                    if (submitBtn) { submitBtn.disabled = false; submitBtn.value = "Enviar Mensaje"; }
                    responseBox.className = "alert alert-danger mt-3";
                    responseBox.textContent = "Hubo un error al enviar el formulario. Por favor inténtalo de nuevo.";
                });
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
