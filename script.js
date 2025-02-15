document.querySelectorAll(".card").forEach((card) => {
    const overlay = card.querySelector(".overlay");

    // Adicionando os botões na overlay quando o mouse entra
    card.addEventListener("mouseenter", () => {
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
    });

    // Removendo os botões da overlay quando o mouse sai
    card.addEventListener("mouseleave", () => {
        overlay.innerHTML = ''; // Remove todos os botões da overlay
    });
});
