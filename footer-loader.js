async function loadFooter() {
    try {
        const response = await fetch('footer.php');
        if (!response.ok) throw new Error('Erro ao carregar footer');
        const html = await response.text();
        
        const footerContainer = document.getElementById('footer-container');
        if (footerContainer) {
            footerContainer.innerHTML = html;
            initBackToTop();
        }
    } catch (error) {
        console.error(error);
    }
}

function initBackToTop() {
    let btn = document.getElementById('back-to-top');
    if (!btn) {
        btn = document.createElement('button');
        btn.id = 'back-to-top';
        btn.setAttribute('aria-label', 'Voltar ao topo');
        btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(btn);
    }

    const toggleVisibility = () => {
        const shouldShow = window.scrollY > 200;
        btn.classList.toggle('show', shouldShow);
    };

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();
}

document.addEventListener('DOMContentLoaded', loadFooter);