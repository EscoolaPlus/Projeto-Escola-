async function loadMenu(options = {}) {
  const path = options.path || "menu.php";
  const containerId = options.containerId || "menu-container";

  try {
    const res = await fetch(path, { cache: "no-store" });
    if (!res.ok) throw new Error("Falha ao carregar menu: " + res.status);
    const html = await res.text();

    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement("div");
      container.id = containerId;
      document.body.insertBefore(container, document.body.firstChild);
    }
    container.innerHTML = html;

    // Garantir que Font Awesome esteja carregado
    const faHref =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
    if (!document.querySelector('link[href="' + faHref + '"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = faHref;
      document.head.appendChild(link);
    }

    // Garantir que menu.css esteja carregado
    const cssHref = options.cssPath || "menu.css";
    if (!document.querySelector('link[href="' + cssHref + '"]')) {
      const link2 = document.createElement("link");
      link2.rel = "stylesheet";
      link2.href = cssHref;
      document.head.appendChild(link2);
    }

    setupMenuControls(options);
  } catch (err) {
    console.error(err);
  }
}

function setupMenuControls() {
  const overlay = document.getElementById("menu-overlay");
  const sideMenu = document.getElementById("side-menu");
  const closeBtn = document.getElementById("close-menu");
  let toggleBtn = document.querySelector(".menu-toggle");

  // Se não existir um botão de toggle na página, criaremos um pequeno botão no canto superior esquerdo
  let createdToggle = false;
  if (!toggleBtn) {
    // Criar o botão e tentar inseri-lo dentro do header para herdar estilos do index
    toggleBtn = document.createElement("button");
    toggleBtn.className = "menu-toggle";
    toggleBtn.id = "menu-toggle";
    toggleBtn.setAttribute("aria-label", "Abrir menu");
    toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';

    // Tentar anexar ao header (ou .header-logo) para manter o estilo azul do index
    const header = document.getElementById("menu-element");
    if (header) {
      // Inserir no início do header para ficar alinhado como no index
      header.insertBefore(toggleBtn, header.firstChild);
    } else {
      // Fallback: botão fixo no canto superior esquerdo
      toggleBtn.style.position = "fixed";
      toggleBtn.style.top = "12px";
      toggleBtn.style.left = "12px";
      toggleBtn.style.zIndex = "1100";
      toggleBtn.style.background = "transparent";
      toggleBtn.style.border = "none";
      toggleBtn.style.fontSize = "1.4rem";
      document.body.appendChild(toggleBtn);
    }
    createdToggle = true;
  }

  function openMenu() {
    if (sideMenu) sideMenu.classList.add("active");
    if (overlay) overlay.classList.add("active");
  }
  function closeMenu() {
    if (sideMenu) sideMenu.classList.remove("active");
    if (overlay) overlay.classList.remove("active");
  }

  if (toggleBtn) toggleBtn.addEventListener("click", openMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  if (overlay) overlay.addEventListener("click", closeMenu);

  // fechar ao clicar em item
  document
    .querySelectorAll(".menu-item")
    .forEach((a) => a.addEventListener("click", closeMenu));

  // Se criamos o toggle dinamicamente, não o removemos, mas deixamos sua existência para controle do usuário
}

// Expor função global para uso nas páginas
window.loadMenu = loadMenu;
