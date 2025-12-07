document.addEventListener('DOMContentLoaded', function() {
    // Controle das abas
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Remove a classe active de todos os botões e painéis
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Adiciona a classe active ao botão clicado e ao painel correspondente
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Controle dos botões de inscrição
    const botoesInscricao = document.querySelectorAll('.btn-inscrever');
    
    botoesInscricao.forEach(botao => {
        botao.addEventListener('click', function() {
            const curso = this.parentElement.querySelector('.course-title').textContent;
            alert(`Inscrição no curso "${curso}" realizada com sucesso!`);
        });
    });

    // Verificar se há parâmetros na URL para abrir uma aba específica
    const urlParams = new URLSearchParams(window.location.search);
    const aba = urlParams.get('aba');
    
    if (aba) {
        const abaButton = document.querySelector(`.tab-button[data-tab="${aba}"]`);
        if (abaButton) {
            abaButton.click();
        }
    }
});