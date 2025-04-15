const API_URL = 'https://pincat-api.onrender.com/fotos';

const searchInput = document.getElementById('searchInput');
const gallery = document.getElementById('gallery');
const imageInput = document.getElementById('imageInput');
const uploadForm = document.getElementById('uploadForm');
const uploadTitle = document.getElementById('uploadTitle');
const uploadDesc = document.getElementById('uploadDesc');
const uploadLink = document.getElementById('uploadLink');

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

//Carrega todas as imagens ao iniciar
window.addEventListener('DOMContentLoaded', loadAllImages);

//Busca automática conforme digita
searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim();
  if (query === '') {
    loadAllImages();
  } else {
    searchImages(query);
  }
});

// Carregar todas as imagens
async function loadAllImages() {
  try {
    const response = await fetch(API_URL);
    let fotos = await response.json();

    fotos = shuffleArray(fotos); //embaralha as fotos
    displayImages(fotos);
  } catch (error) {
    console.error('Erro ao carregar imagens:', error);
    gallery.innerHTML = '<p>Erro ao carregar imagens.</p>';
  }
}

//Buscar imagens por título
async function searchImages(query) {
  try {
    const response = await fetch(`${API_URL}/buscar?titulo=${encodeURIComponent(query)}`);
    const fotos = await response.json();
    displayImages(fotos);
  } catch (error) {
    console.error('Erro ao buscar imagens:', error);
    gallery.innerHTML = '<p>Erro na busca de imagens.</p>';
  }
}

//Exibir imagens na galeria
function displayImages(fotos) {
  gallery.innerHTML = '';

  if (!fotos.length) {
    gallery.innerHTML = '<p>Nenhuma imagem encontrada.</p>';
    return;
  }

  fotos.forEach(foto => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${foto.url}" alt="${foto.title || 'Imagem'}">
      <div>${foto.title || 'Sem título'}</div>
    `;
    gallery.appendChild(card);
  });
}

//Upload de nova foto
uploadForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('image', imageInput.files[0]);
  formData.append('title', uploadTitle.value);
  formData.append('description', uploadDesc.value);
  formData.append('link', uploadLink.value);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) throw new Error('Falha ao publicar imagem.');

    const result = await response.json();
    alert('Imagem publicada com sucesso!');
    uploadForm.reset();
    loadAllImages(); // Atualiza galeria após envio
  } catch (err) {
    console.error('Erro ao enviar imagem:', err);
    alert('Erro ao publicar imagem.');
  }
});