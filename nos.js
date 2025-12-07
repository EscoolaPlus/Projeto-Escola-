// Sobre Nós - Lógica da página

document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM para animação
    const sections = document.querySelectorAll('.introducao, .historia-section, .valores-section, .equipe-section, .reconhecimentos-section');
    
    // Configuração do Intersection Observer para animações
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar cada seção para animação
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Efeito de digitação no cabeçalho
    const headerText = "Sobre a ESCOLA+";
    const headerElement = document.querySelector('.sobre-header h1');
    let headerIndex = 0;
    
    function typeHeader() {
        if (headerIndex < headerText.length) {
            headerElement.textContent = headerText.substring(0, headerIndex + 1);
            headerIndex++;
            setTimeout(typeHeader, 100);
        }
    }
    
    // Iniciar efeito de digitação após um breve delay
    setTimeout(typeHeader, 500);
    
    // Contador animado para estatísticas (simulado)
    const estatisticas = [
        { elemento: document.querySelector('.marco:last-child p'), valor: 50000, texto: "Mais de 50.000 alunos formados em todo o país" },
        { elemento: document.querySelector('.reconhecimento:last-child p'), valor: 4.8, texto: "Nota 4.8/5 baseada em 10.000 avaliações" }
    ];
    
    function animarContadores() {
        estatisticas.forEach(estatistica => {
            const elemento = estatistica.elemento;
            const valorFinal = estatistica.valor;
            const textoBase = estatistica.texto;
            let valorAtual = 0;
            const incremento = valorFinal / 50;
            const intervalo = 30;
            
            const timer = setInterval(() => {
                valorAtual += incremento;
                if (valorAtual >= valorFinal) {
                    valorAtual = valorFinal;
                    clearInterval(timer);
                }
                
                if (valorFinal === 50000) {
                    elemento.textContent = `Mais de ${Math.round(valorAtual).toLocaleString()} alunos formados em todo o país`;
                } else {
                    elemento.textContent = `Nota ${valorAtual.toFixed(1)}/5 baseada em 10.000 avaliações`;
                }
            }, intervalo);
        });
    }
    
    // Iniciar animação dos contadores quando a seção de reconhecimentos estiver visível
    const reconhecimentosSection = document.querySelector('.reconhecimentos-section');
    const reconhecimentosObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animarContadores();
                reconhecimentosObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    reconhecimentosObserver.observe(reconhecimentosSection);
    
    // Efeito de hover nos cards de valores
    const valorCards = document.querySelectorAll('.valor-card');
    
    valorCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.valor-icon i');
            icon.style.transform = 'scale(1.2)';
            icon.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.valor-icon i');
            icon.style.transform = 'scale(1)';
        });
    });
    
    // Interação com a linha do tempo
    const marcos = document.querySelectorAll('.marco');
    
    marcos.forEach(marco => {
        marco.addEventListener('click', function() {
            // Remover destaque de todos os marcos
            marcos.forEach(m => m.style.backgroundColor = 'var(--cinza-claro)');
            
            // Destacar o marco clicado
            this.style.backgroundColor = 'var(--azul-escuro)';
            this.style.color = 'var(--branco)';
            
            // Mostrar tooltip com mais informações
            const ano = this.querySelector('.ano').textContent;
            const descricao = this.querySelector('p').textContent;
            
            // Criar tooltip
            let tooltip = document.getElementById('timeline-tooltip');
            if (!tooltip) {
                tooltip = document.createElement('div');
                tooltip.id = 'timeline-tooltip';
                tooltip.style.position = 'fixed';
                tooltip.style.background = 'var(--azul-escuro)';
                tooltip.style.color = 'var(--branco)';
                tooltip.style.padding = '10px 15px';
                tooltip.style.borderRadius = '5px';
                tooltip.style.zIndex = '1000';
                tooltip.style.boxShadow = '0 3px 10px rgba(0,0,0,0.2)';
                tooltip.style.maxWidth = '300px';
                document.body.appendChild(tooltip);
            }
            
            tooltip.innerHTML = `<strong>${ano}</strong><br>${descricao}`;
            
            // Posicionar tooltip próximo ao elemento
            const rect = this.getBoundingClientRect();
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
            tooltip.style.left = `${rect.left + rect.width/2 - tooltip.offsetWidth/2}px`;
            
            // Remover tooltip após 3 segundos
            setTimeout(() => {
                if (tooltip.parentNode) {
                    tooltip.parentNode.removeChild(tooltip);
                }
            }, 3000);
        });
    });
    
    // Interação com redes sociais
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('span').textContent;
            alert(`Redirecionando para nosso ${platform}. Em uma aplicação real, isso abriria a página oficial.`);
            
            // Em uma aplicação real, aqui estaria: window.open(urlDaRedeSocial, '_blank');
        });
    });
    
    // Efeito de parallax simples no cabeçalho
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.sobre-header' , '.img-nos');
        const rate = scrolled * 0.5;
        
        header.style.transform = `translateY(${rate}px)`;
    });
    
    // Botão de voltar ao topo
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopButton.style.position = 'fixed';
    backToTopButton.style.bottom = '20px';
    backToTopButton.style.right = '20px';
    backToTopButton.style.width = '50px';
    backToTopButton.style.height = '50px';
    backToTopButton.style.borderRadius = '50%';
    backToTopButton.style.background = 'var(--azul-escuro)';
    backToTopButton.style.color = 'var(--branco)';
    backToTopButton.style.border = 'none';
    backToTopButton.style.cursor = 'pointer';
    backToTopButton.style.boxShadow = '0 3px 10px rgba(0,0,0,0.2)';
    backToTopButton.style.zIndex = '1000';
    backToTopButton.style.display = 'none';
    backToTopButton.style.transition = 'all 0.3s ease';
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(backToTopButton);
    
    // Mostrar/ocultar botão baseado na posição de scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    
    // Efeito de hover no botão
    backToTopButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    backToTopButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});