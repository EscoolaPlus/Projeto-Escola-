// Variáveis globais
let currentUser = null;

document.addEventListener('DOMContentLoaded', function() {
    console.log("Sistema ESCOLA+ carregado.");
});

// Função de login
function login(type) {
    currentUser = type || 'usuario';
    console.log("Usuário logado como:", currentUser);
}

// Redimensionamento 
window.addEventListener('resize', function() {
});