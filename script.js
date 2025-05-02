document.addEventListener("DOMContentLoaded", function () {
    const slideshows = document.querySelectorAll(".slideshow-container");

    slideshows.forEach(slideshow => {
        let currentSlide = 0;
        const images = slideshow.querySelectorAll("img");
        const prevButton = slideshow.querySelector(".prev");
        const nextButton = slideshow.querySelector(".next");

        function showSlide(index) {
            images.forEach((img, i) => {
                img.classList.toggle("active", i === index);
            });
        }

        prevButton.addEventListener("click", () => {
            currentSlide = (currentSlide - 1 + images.length) % images.length;
            showSlide(currentSlide);
        });

        nextButton.addEventListener("click", () => {
            currentSlide = (currentSlide + 1) % images.length;
            showSlide(currentSlide);
        });

        showSlide(currentSlide);
    });
});
