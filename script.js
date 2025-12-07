// Variáveis globais
let currentUser = null;
let carouselInterval = null;
let currentSlide = 0;

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar elementos da UI
    // O formulário de login foi removido; iniciaremos a tela principal diretamente
    initCarousel();

    const menuToggle = document.getElementById('menu-toggle') || document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    const closeMenuBtn = document.getElementById('close-menu') || document.querySelector('.close-menu');
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', toggleMenu);
    }

    const menuOverlay = document.getElementById('menu-overlay') || document.querySelector('.menu-overlay');
    if (menuOverlay) {
        menuOverlay.addEventListener('click', toggleMenu);
    }
});

// Função de login
function login(type) {
    // Legacy login function retained for compatibility but simplified.
    currentUser = type || 'usuario';
    // Informações sobre modo convidado foram removidas; deixar função como stub.
}

// Alternar menu lateral
function toggleMenu() {
    const sideMenu = document.querySelector('.side-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    if (sideMenu) sideMenu.classList.toggle('active');
    if (menuOverlay) menuOverlay.classList.toggle('active');
}

// Inicializar carrossel
function initCarousel() {
    const carouselInner = document.querySelector('.carousel-inner');
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;

    if (!carouselInner || totalSlides === 0) return;

    // Reset currentSlide if out of range
    currentSlide = currentSlide % totalSlides;

    // Limpar intervalo anterior se existir
    if (carouselInterval) clearInterval(carouselInterval);

    // Configurar intervalo para transição automática
    carouselInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
    }, 5000);
}

// Simular redimensionamento da janela para ajustar elementos
window.addEventListener('resize', function() {
    // Ajustar carrossel em caso de redimensionamento
    const carouselInner = document.querySelector('.carousel-inner');
    if (carouselInner) {
        carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
});