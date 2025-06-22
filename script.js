const menuOpenbutton = document.querySelector("#menu-open-button")
const menuClosebutton = document.querySelector("#menu-close-button")


menuOpenbutton.addEventListener("click",()=>{
    document.body.classList.toggle("show-mobile-menu");

});

menuClosebutton.addEventListener("click",()=>menuOpenbutton.click());

  // Testimonials Slider JavaScript
let currentIndex = 0;
const totalSlides = 5;
const slider = document.querySelector('.testimonials-list');
const dots = document.querySelectorAll('.dot');

// Update slider position and active dot
function updateSlider() {
    const translateX = -currentIndex * (100 / totalSlides);
    slider.style.transform = `translateX(${translateX}%)`;
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

// Change slide function (called by navigation buttons)
function changeSlide(direction) {
    currentIndex += direction;
    
    // Handle wrapping around
    if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    } else if (currentIndex >= totalSlides) {
        currentIndex = 0;
    }
    
    updateSlider();
}

// Jump to specific slide (called by dots)
function currentSlide(index) {
    currentIndex = index - 1; // Convert to 0-based index
    updateSlider();
}

// Auto-play functionality
function autoPlay() {
    changeSlide(1);
}

let autoPlayInterval = setInterval(autoPlay, 4000);

// Pause auto-play on hover
const sliderContainer = document.querySelector('.slider-container');
if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });

    sliderContainer.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(autoPlay, 4000);
    });

    // Touch/Swipe Support
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    sliderContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        clearInterval(autoPlayInterval);
    });

    sliderContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
    });

    sliderContainer.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        
        const diff = startX - currentX;
        const threshold = 50;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                changeSlide(1); // Swipe left - next slide
            } else {
                changeSlide(-1); // Swipe right - previous slide
            }
        }
        
        autoPlayInterval = setInterval(autoPlay, 4000);
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Initialize slider
document.addEventListener('DOMContentLoaded', () => {
    updateSlider();
});