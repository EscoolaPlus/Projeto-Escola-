document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendMessageBtn = document.getElementById('send-message');
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Respostas do bot
    const botResponses = {
        'inscricao': 'Para se inscrever em um curso, vá até a página de <strong>Cursos</strong>, escolha o desejado e clique no botão "Inscrever-se".',
        'curso gratuito': 'Temos tanto cursos gratuitos quanto pagos. Na página de cada curso, você verá uma etiqueta indicando a modalidade.',
        'certificado': 'Após concluir todas as atividades e atingir a nota mínima, você poderá baixar seu certificado na área do aluno.',
        'acesso mobile': 'Sim! O ESCOLA+ é totalmente responsivo e funciona no seu celular ou tablet.',
        'suporte': 'Além deste chat, você pode enviar e-mail para <strong>suporte@camara.santarem.br</strong> ou ligar para a Câmara.',
        'jogos': 'Nossos jogos educativos estão na aba "Jogos" no menu lateral. Divirta-se aprendendo!',
        'default': 'Desculpe, não entendi bem. Tente usar palavras como "inscrição", "certificado" ou "suporte".'
    };
    
    // Palavras-chave para as respostas
    const keywords = {
        'inscricao': ['inscrever', 'inscrição', 'inscricao', 'matricular', 'matrícula', 'matricula', 'cadastro'],
        'curso gratuito': ['gratis', 'grátis', 'gratuito', 'pagar', 'preço', 'valor', 'custo'],
        'certificado': ['certificado', 'diploma', 'conclusão', 'conclusao'],
        'acesso mobile': ['celular', 'mobile', 'app', 'android', 'iphone', 'tablet'],
        'suporte': ['suporte', 'ajuda', 'contato', 'email', 'telefone', 'falar', 'humano'],
        'jogos': ['jogo', 'game', 'jogar', 'diversao', 'ludico']
    };

    // --- FUNÇÕES AUXILIARES ---

    // Remove acentos para facilitar a comparação (ex: 'Inscrição' vira 'inscricao')
    function removeAcentos(texto) {
        return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    }

    // Adiciona mensagem na tela
    function addMessage(text, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = isUser ? 'message user-message' : 'message bot-message';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = `<p>${text}</p>`;
        
        messageDiv.appendChild(contentDiv);
        chatMessages.appendChild(messageDiv);
        
        // Rola para o final
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Processa a lógica do robô
    function processUserMessage(message) {
        // 1. Limpa a mensagem (minúsculas e sem acentos)
        const cleanMessage = removeAcentos(message.toLowerCase());
        
        let responseKey = 'default';
        
        // 2. Procura palavras-chave
        for (const [key, words] of Object.entries(keywords)) {
            // Verifica se alguma palavra da lista está na mensagem do usuário
            if (words.some(word => cleanMessage.includes(removeAcentos(word)))) {
                responseKey = key;
                break;
            }
        }
        
        // 3. Cria indicador de "Digitando..."
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.innerHTML = '<div class="message-content" style="background-color: #e0e0e0; color: #555;"><p><em>Digitando...</em></p></div>';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // 4. Responde após um delay (simulando pensamento)
        setTimeout(() => {
            // Remove o indicador
            if (typingDiv.parentNode) {
                chatMessages.removeChild(typingDiv);
            }
            // Adiciona a resposta final
            addMessage(botResponses[responseKey], false);
        }, 1500);
    }
    
    // --- EVENT LISTENERS ---

    // Clique no botão enviar
    sendMessageBtn.addEventListener('click', function() {
        const message = chatInput.value.trim();
        
        if (message) {
            addMessage(message, true); // Adiciona msg do usuário
            processUserMessage(message); // Chama o robô
            chatInput.value = ''; // Limpa o campo
        }
    });
    
    // Pressionar Enter no input
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessageBtn.click();
        }
    });
    
    // Lógica do FAQ (Accordion)
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Fecha os outros
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            // Alterna o atual
            item.classList.toggle('active');
        });
    });

    // Mensagem de boas-vindas inicial (opcional)
    // Se o chat estiver vazio, o robô fala primeiro
    if (chatMessages.children.length === 0) {
        setTimeout(() => {
             addMessage("Olá! Sou o assistente virtual do ESCOLA+. Como posso te ajudar hoje?", false);
        }, 500);
    }
});