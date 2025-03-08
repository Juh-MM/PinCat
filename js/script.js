// registrar o service-worker para o pwa
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/service-worker.js")
        .then(() => console.log("✔ Service Worker registrado!"))
        .catch((err) => console.log("❌ Erro no Service Worker:", err));
    });
  }



