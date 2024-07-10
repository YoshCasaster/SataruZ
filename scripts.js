let currentIndex = 0;

function showNextSlide() {
    const slides = document.querySelectorAll('.carousel-slide');
    currentIndex = (currentIndex + 1) % slides.length;
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
}

setInterval(showNextSlide, 3000);
