// Fale Conosco - Lógica da página

document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendMessageBtn = document.getElementById('send-message');
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Respostas do bot (simuladas)
    const botResponses = {
        'inscricao': 'Para se inscrever em um curso, você precisa estar logado em sua conta. Vá até a página de cursos, escolha o curso desejado e clique no botão "Inscrever-se".',
        'curso gratuito': 'Temos tanto cursos gratuitos quanto pagos. Na página de cada curso, você pode verificar se é gratuito ou pago.',
        'certificado': 'Após concluir todas as atividades e atingir a nota mínima, você poderá baixar seu certificado na página de certificados.',
        'acesso mobile': 'Sim, nossa plataforma é totalmente responsiva e pode ser acessada por qualquer dispositivo com internet.',
        'suporte': 'Você pode utilizar este chat online, enviar um e-mail para suporte@escolaplus.com ou ligar para (11) 1234-5678.',
        'default': 'Desculpe, não entendi sua pergunta. Você pode reformular ou verificar as dúvidas frequentes abaixo.'
    };
    
    // Palavras-chave para as respostas
    const keywords = {
        'inscricao': ['inscrever', 'inscrição', 'matricular', 'matrícula'],
        'curso gratuito': ['gratuito', 'grátis', 'free', 'custo', 'preço'],
        'certificado': ['certificado', 'diploma', 'conclusão', 'certificar'],
        'acesso mobile': ['celular', 'mobile', 'tablet', 'smartphone', 'aplicativo'],
        'suporte': ['suporte', 'contato', 'ajuda', 'falar', 'atendimento']
    };
    
    // Função para adicionar mensagem no chat
    function addMessage(text, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = isUser ? 'message user-message' : 'message bot-message';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = `<p>${text}</p>`;
        
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
        
        // Rolagem automática para a última mensagem
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Função para processar a mensagem do usuário
    function processUserMessage(message) {
        // Converter para minúsculas para facilitar a comparação
        const lowerMessage = message.toLowerCase();
        
        // Verificar palavras-chave
        let responseKey = 'default';
        
        for (const [key, words] of Object.entries(keywords)) {
            if (words.some(word => lowerMessage.includes(word))) {
                responseKey = key;
                break;
            }
        }
        
        // Adicionar resposta do bot após um pequeno delay (simulando processamento)
        setTimeout(() => {
            addMessage(botResponses[responseKey], false);
        }, 1000);
    }
    
    // Evento de enviar mensagem
    sendMessageBtn.addEventListener('click', function() {
        const message = chatInput.value.trim();
        
        if (message) {
            // Adicionar mensagem do usuário
            addMessage(message, true);
            
            // Processar mensagem
            processUserMessage(message);
            
            // Limpar campo de entrada
            chatInput.value = '';
        }
    });
    
    // Evento de pressionar Enter no campo de entrada
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessageBtn.click();
        }
    });
    
    // FAQ - Abrir/fechar itens
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Fechar todos os outros itens
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Abrir/fechar o item clicado
            item.classList.toggle('active');
        });
    });
    
    // Mensagem inicial do bot (já está no HTML, mas podemos adicionar dinamicamente se necessário)
    // addMessage('Olá! Sou o assistente virtual da ESCOLA+. Como posso ajudar você hoje?', false);
});