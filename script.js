document.querySelectorAll(".card").forEach((card) => {
    const overlay = card.querySelector(".overlay");

    card.addEventListener("mouseenter", () => {
        // Criando os botões
        const buttonSave = document.createElement("button");
        buttonSave.classList.add("button");
        buttonSave.textContent = "Salvar";
        overlay.appendChild(buttonSave);

        const buttonDownload = document.createElement("button");
        buttonDownload.classList.add("button");
        buttonDownload.textContent = "Baixar";
        overlay.appendChild(buttonDownload);

        const buttonMore = document.createElement("button");
        buttonMore.classList.add("button");
        buttonMore.textContent = "Mais";
        overlay.appendChild(buttonMore);

        // Função para criar e exibir o popup
        function showPopup(message) {
            const popup = document.createElement("div");
            popup.classList.add("popup");

            const popupContent = document.createElement("div");
            popupContent.classList.add("popup-content");

            const popupMessage = document.createElement("p");
            popupMessage.textContent = message;
            popupContent.appendChild(popupMessage);

            const closeButton = document.createElement("button");
            closeButton.textContent = "Fechar";
            closeButton.classList.add("close-popup");
            popupContent.appendChild(closeButton);

            popup.appendChild(popupContent);
            document.body.appendChild(popup);

            // Fechar o popup ao clicar no botão de fechar
            closeButton.addEventListener("click", () => {
                popup.remove();
            });

            // Fechar o popup ao clicar fora dele
            window.addEventListener("click", (event) => {
                if (event.target === popup) {
                    popup.remove();
                }
            });
        }

        // Adicionando o event listener para cada botão
        buttonSave.addEventListener("click", () => {
            showPopup("Imagem salva");
        });

        buttonDownload.addEventListener("click", () => {
            showPopup("Imagem baixada");
        });

    
    });

    card.addEventListener("mouseleave", () => {
        overlay.innerHTML = ''; // Limpa os botões quando o mouse sai do cartão
    });
});
