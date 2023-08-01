const dropArea = document.querySelector("[data-drop-area]");
const fileSpan = document.querySelector("[data-file-span]");

export let prodImage = "";

function dropImage(event) {
    event.preventDefault();
    dropArea.classList.remove("is-drag-over");

    const url = event.dataTransfer.getData("text/uri-list");
    fileSpan.textContent = url;
    createImage(url);
}

function createImage(url) {
    const img = document.createElement("img");
    img.className = "c-file__product-image";
    img.src = url;
    img.alt = "Imagem de um produto";
    dropArea.innerHTML = "";
    dropArea.appendChild(img);
    
    img.addEventListener("error", () => {
        alert("Erro: Infelizmente o site do qual você está tentado arrastar a imagem, por motivos de segurança ele não permiti essa ação, tente salvar a imagem e seleciona ela do seu computador.")
    })

    prodImage = url;
}

function getFileFromComputer(event) {
    const file = event.target.files[0];
    
    const url = URL.createObjectURL(file);
    fileSpan.textContent = file.name;
    createImage(url);
}


export {
    dropImage,
    getFileFromComputer,
    createImage
}
