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


        // Contact Form Submission
        const contactForm = document.getElementById("contactForm");
        const responseBox = document.getElementById("formResponse");

        if (contactForm) {
            contactForm.addEventListener("submit", function (e) {
                e.preventDefault();

                const formData = new FormData(contactForm);

                fetch("submit-form.php", {
                    method: "POST",
                    body: formData
                })
                    .then(res => res.text())
                    .then(data => {
                        responseBox.classList.remove("d-none", "alert-danger");
                        responseBox.classList.add("alert", "alert-success");
                        responseBox.textContent = data || "¡Gracias! Tu mensaje ha sido enviado correctamente.";
                        contactForm.reset();

                        setTimeout(() => {
                            responseBox.classList.add("d-none");
                        }, 5000);
                    })
                    .catch(err => {
                        responseBox.classList.remove("d-none", "alert-success");
                        responseBox.classList.add("alert", "alert-danger");
                        responseBox.textContent = "Hubo un error al enviar el formulario.";
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
