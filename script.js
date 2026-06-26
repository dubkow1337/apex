// ===== ПРЕЛОАДЕР =====
window.addEventListener('load', () => {
    document.getElementById('preloader').classList.add('hidden');
});

// ===== БУРГЕР =====
const burger = document.getElementById('burger');
const nav = document.querySelector('.nav');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    nav.classList.toggle('active');
});

document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        nav.classList.remove('active');
    });
});

// ===== HEADER SCROLL =====
window.addEventListener('scroll', () => {
    document.getElementById('header').classList.toggle('scrolled', window.scrollY > 50);
});

// ===== COUNTUP (анимированные цифры) =====
const countupElements = document.querySelectorAll('.countup');
let countupStarted = false;

function animateCountups() {
    const triggerPoint = document.getElementById('heroStats').getBoundingClientRect().top;
    if (triggerPoint < window.innerHeight && !countupStarted) {
        countupStarted = true;
        countupElements.forEach(el => {
            const target = parseInt(el.getAttribute('data-target'));
            let current = 0;
            const step = target / 60;
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                el.textContent = Math.floor(current);
            }, 25);
        });
    }
}

window.addEventListener('scroll', animateCountups);
setTimeout(animateCountups, 500);

// ===== TIMELINE (появление при скролле) =====
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

timelineItems.forEach(item => timelineObserver.observe(item));

// ===== КАРУСЕЛЬ =====
const track = document.getElementById('casesTrack');
const slides = document.querySelectorAll('.case-slide');
const dotsContainer = document.getElementById('dots');
let currentSlide = 0;
let slidesPerView = 3;

function updateSlidesPerView() {
    if (window.innerWidth <= 768) slidesPerView = 1;
    else if (window.innerWidth <= 992) slidesPerView = 2;
    else slidesPerView = 3;
}
updateSlidesPerView();

function goToSlide(index) {
    const max = Math.ceil(slides.length / slidesPerView) - 1;
    if (index < 0) index = max;
    if (index > max) index = 0;
    currentSlide = index;
    const offset = index * (100 / slidesPerView);
    track.style.transform = `translateX(-${offset}%)`;
    document.querySelectorAll('.carousel-dots span').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function renderDots() {
    const count = Math.ceil(slides.length / slidesPerView);
    dotsContainer.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const dot = document.createElement('span');
        dot.addEventListener('click', () => goToSlide(i));
        if (i === 0) dot.classList.add('active');
        dotsContainer.appendChild(dot);
    }
}
renderDots();

document.getElementById('nextCase').addEventListener('click', () => {
    goToSlide(currentSlide + 1);
});
document.getElementById('prevCase').addEventListener('click', () => {
    goToSlide(currentSlide - 1);
});

window.addEventListener('resize', () => {
    const oldSlides = slidesPerView;
    updateSlidesPerView();
    if (oldSlides !== slidesPerView) {
        renderDots();
        goToSlide(0);
    }
});

// ===== ПЛАВНАЯ ПРОКРУТКА =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

console.log('🏆 Apex — премиум-агентство готово!');
