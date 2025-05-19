// registrar o service-worker para o pwa
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/service-worker.js")
        .then(() => console.log("✔ Service Worker registrado!"))
        .catch((err) => console.log("❌ Erro no Service Worker:", err));
    });
  }

function carregarCreate() {
  fetch('create.html')
    .then(res => res.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const novoConteudo = doc.getElementById('main_content_create')
      if (novoConteudo) {
        document.getElementById('main_content').innerHTML = novoConteudo.innerHTML;
      } else {
        document.getElementById('main_content').innerHTML = '<p>Erro: não encontrado</p>';
      }
    })
    .catch(err => {
      console.error(err);
      document.getElementById('main_content').innerHTML = '<p>Erro ao carregar tela</p>';
    });
}

function abrirNotificacao() {
  document.querySelector(".notificacao").style.display = "block";
}

function fecharNotificacao() {
  document.querySelector(".notificacao").style.display = "none";
}
