document.addEventListener("DOMContentLoaded", function () {
    // Smooth scrolling for navigation links
    const links = document.querySelectorAll("nav ul li a");
    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50,
                    behavior: "smooth"
                });
            }
        });
    });

    // Slideshow functionality
    function setupSlideshow(slideshowContainer) {
        let currentSlide = 0;
        const slides = slideshowContainer.querySelectorAll("img");
        const prevButton = slideshowContainer.querySelector(".prev");
        const nextButton = slideshowContainer.querySelector(".next");

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle("active", i === index);
            });
        }

        function changeSlide(direction) {
            currentSlide = (currentSlide + direction + slides.length) % slides.length;
            showSlide(currentSlide);
        }

        prevButton.addEventListener("click", () => changeSlide(-1));
        nextButton.addEventListener("click", () => changeSlide(1));

        // Initialize the first slide
        showSlide(currentSlide);
    }

    // Apply slideshow functionality to each slideshow container
    const slideshowContainers = document.querySelectorAll(".slideshow-container");
    slideshowContainers.forEach(setupSlideshow);
});
