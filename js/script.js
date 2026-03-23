/* =========================================
   1. СМЕНА ЯЗЫКА (RU / EN)
   ========================================= */
const translations = {
    ru: {
        home: "Главная",
        regions: "Регионы",
        routes: "Маршруты",
        logistics: "Логистика",
        hero_title: "Сердце Великого Шелкового Пути",
        hero_subtitle: "Открой для себя страну белого мрамора и древних легенд",
        btn_explore: "Исследовать",
        gallery_title: "Галерея чудес",
        regions_title: "Популярные Регионы",
        ashgabat_desc: "Столица белого мрамора. Монументы, фонтаны и современная архитектура.",
        lebap_desc: "Следы динозавров и уникальная природа горного плато.",
        balkan_desc: "Газовый кратер 'Врата Ада' и побережье Каспийского моря.",
        map_title: "Карта страны",
        logistics_title: "Планирование поездки",
        calc_title: "Калькулятор расходов",
        calc_days: "Количество дней:",
        calc_hotel: "Класс отеля (цена за ночь $):",
        calc_btn: "Рассчитать",
        calc_disclaimer: "*Это приблизительный расчет без учета авиабилетов.",
        links_title: "Полезные ресурсы",
        route_title: "Пример маршрута (5 дней)"
    },
    en: {
        home: "Home",
        regions: "Regions",
        routes: "Routes",
        logistics: "Logistics",
        hero_title: "Heart of the Great Silk Road",
        hero_subtitle: "Discover the land of white marble and ancient legends",
        btn_explore: "Explore",
        gallery_title: "Gallery of Wonders",
        regions_title: "Popular Regions",
        ashgabat_desc: "Capital of white marble. Monuments, fountains and modern architecture.",
        lebap_desc: "Dinosaur tracks and unique nature of the mountain plateau.",
        balkan_desc: "Gas crater 'Door to Hell' and Caspian Sea coast.",
        map_title: "Country Map",
        logistics_title: "Trip Planning",
        calc_title: "Expense Calculator",
        calc_days: "Number of days:",
        calc_hotel: "Hotel class (price per night $):",
        calc_btn: "Calculate",
        calc_disclaimer: "*This is an approximate calculation excluding air tickets.",
        links_title: "Useful Resources",
        route_title: "Sample Route (5 days)"
    }
};

let currentLang = 'ru';

const langRu = document.getElementById('lang-ru');
const langEn = document.getElementById('lang-en');

if (langRu && langEn) {
    langRu.addEventListener('click', () => setLanguage('ru'));
    langEn.addEventListener('click', () => setLanguage('en'));
}

function setLanguage(lang) {
    currentLang = lang;
    
    // Обновляем активный класс переключателя
    if (langRu && langEn) {
        langRu.classList.toggle('active', lang === 'ru');
        langEn.classList.toggle('active', lang === 'en');
    }
    
    // Обновляем все текстовые элементы с атрибутом data-lang
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

/* =========================================
   2. КАЛЬКУЛЯТОР РАСХОДОВ
   ========================================= */
const calcBtn = document.getElementById('calc-btn');
const daysInput = document.getElementById('days');
const hotelSelect = document.getElementById('hotel');
const resultBox = document.getElementById('calc-result');

if (calcBtn) {
    calcBtn.addEventListener('click', calculateExpenses);
}

function calculateExpenses() {
    const days = parseInt(daysInput.value) || 0;
    const hotelPrice = parseInt(hotelSelect.value) || 0;
    
    // Примерные расходы в день (еда + транспорт)
    const dailyExpenses = 50; 
    const visaCost = 100; // Единовременный расход на визу
    
    const total = (days * (hotelPrice + dailyExpenses)) + visaCost;
    
    if (resultBox) {
        resultBox.style.display = 'block';
        resultBox.textContent = `~ $${total} USD`;
        
        // Анимация появления
        resultBox.style.opacity = 0;
        let opacity = 0;
        const fadeIn = setInterval(() => {
            if (opacity >= 1) clearInterval(fadeIn);
            resultBox.style.opacity = opacity;
            opacity += 0.1;
        }, 50);
    }
}

/* =========================================
   3. СЛАЙДЕР (АВТО + РУЧНОЙ)
   ========================================= */
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function showSlide(n) {
    if (slides.length === 0) return;
    
    slides.forEach(slide => slide.classList.remove('active'));
    
    slideIndex = n;
    if (slideIndex >= slides.length) slideIndex = 0;
    if (slideIndex < 0) slideIndex = slides.length - 1;
    
    slides[slideIndex].classList.add('active');
}

function nextSlide() {
    showSlide(slideIndex + 1);
}

function prevSlide() {
    showSlide(slideIndex - 1);
}

if (prevBtn) prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
});

if (nextBtn) nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
});

// Автоматическое переключение каждые 5 секунд
let autoSlide = setInterval(nextSlide, 5000);

function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, 5000);
}

/* =========================================
   4. АНИМАЦИЯ ПРИ СКРОЛЛЕ (Intersection Observer)
   ========================================= */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Наблюдаем за карточками и элементами
document.querySelectorAll('.region-card, .timeline-item, .calculator-box, .links-box').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Добавляем класс для анимации через CSS
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

/* =========================================
   5. ПЛАВНЫЙ СКРОЛЛ ПО ЯКОРЯМ
   ========================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

/* =========================================
   6. ПОДСВЕТКА АКТИВНОЙ СТРАНИЦЫ В МЕНЮ
   ========================================= */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
        link.classList.add('active');
    }
});

/* =========================================
   7. КОНСОЛЬ ДЛЯ ОТЛАДКИ
   ========================================= */
console.log('✅ Visit Turkmenistan - Site Loaded Successfully');
console.log('🌍 Language: ' + currentLang);
console.log('📱 Responsive: Active');


/* =========================================
   8. ФИЛЬТР МАРШРУТОВ
   ========================================= */
const filterBtns = document.querySelectorAll('.filter-btn');
const timelineItems = document.querySelectorAll('.timeline-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Удаляем активный класс у всех кнопок
        filterBtns.forEach(b => b.classList.remove('active'));
        // Добавляем активный класс нажатой кнопке
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        timelineItems.forEach(item => {
            if (filter === 'all') {
                item.classList.remove('filtered-out');
                item.classList.add('filter-in');
            } else {
                if (item.getAttribute('data-category') === filter) {
                    item.classList.remove('filtered-out');
                    item.classList.add('filter-in');
                } else {
                    item.classList.add('filtered-out');
                    item.classList.remove('filter-in');
                }
            }
        });
    });
});

/* =========================================
   9. АВТОМАТИЧЕСКОЕ ОБНОВЛЕНИЕ ГОДА В ФУТЕРЕ
   ========================================= */
const footerYear = document.querySelector('.footer-main p');
if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.textContent = `© ${currentYear} Visit Turkmenistan. Student Project.`;
}