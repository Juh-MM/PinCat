// registrar o service-worker para o pwa
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/service-worker.js")
        .then(() => console.log("✔ Service Worker registrado!"))
        .catch((err) => console.log("❌ Erro no Service Worker:", err));
    });
  }

  const uploadForm = document.getElementById('uploadForm');
  const uploadTitle = document.getElementById('uploadTitle');
  const uploadDesc = document.getElementById('uploadDesc');
  const uploadLink = document.getElementById('uploadLink');


