// document.getElementById("addContentIcon").addEventListener("click", function(event) {
//     event.preventDefault(); // Impede o link de redirecionar para 'create.html'
    
//     // Carregar o conteúdo de create.html
//     fetch('create.html')
//       .then(response => {
//         if (response.ok) {
//           return response.text(); // Retorna o conteúdo HTML como texto
//         } else {
//           throw new Error('Erro ao carregar o conteúdo');
//         }
//       })
//       .then(data => {
//         document.getElementById('conteudo').innerHTML = data; // Insere o conteúdo carregado no main
//       })
//       .catch(error => {
//         console.error('Erro:', error); // Exibe erro, caso não consiga carregar o conteúdo
//       });
// });

// registrar o service-worker para o pwa
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/service-worker.js")
        .then(() => console.log("✔ Service Worker registrado!"))
        .catch((err) => console.log("❌ Erro no Service Worker:", err));
    });
  }

