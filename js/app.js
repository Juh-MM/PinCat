const API_URL = 'https://pincat-api.onrender.com/fotos';

const searchInput = document.getElementById('searchInput');
const gallery = document.getElementById('gallery');
const imageInput = document.getElementById('imageInput');
const uploadForm = document.getElementById('uploadForm');
const uploadTitle = document.getElementById('uploadTitle');
const uploadDesc = document.getElementById('uploadDesc');
const uploadLink = document.getElementById('uploadLink');

window.addEventListener('DOMContentLoaded', loadAllImages);

//pesquisar uma imagem
searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    if (query === '') {
      loadAllImages();
    } else {
      searchImages(query);
    }
  });
  
  async function loadAllImages() {
    try {
      const response = await fetch(API_URL);
      const fotos = await response.json();
      displayImages(fotos);
    } catch (error) {
      console.error('Erro ao carregar imagens:', error);
    }
  }
  
  async function searchImages(query) {
    try {
      const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`);
      const fotos = await response.json();
      displayImages(fotos);
    } catch (error) {
      console.error('Erro ao buscar imagens:', error);
    }
  }
  
  function displayImages(fotos) {
    gallery.innerHTML = ''; // limpa a galeria
    if (fotos.length === 0) {
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

//upload de nova foto

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const uniqueName = Date.now() + '-' + file.originalname;
      cb(null, uniqueName);
    }
  });
  const upload = multer({ storage });
  
  exports.uploadMiddleware = upload.single('image'); 

uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();

  // FormData para enviar arquivo de imagem junto com os outros dados
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

    if (response.ok) {
      const result = await response.json();  
      alert('Imagem publicada com sucesso!');
      console.log(result); 
      uploadForm.reset();  
    } else {
      throw new Error('Falha ao publicar a imagem');
    }
  } catch (err) {
    console.error('Erro ao enviar a imagem:', err);
    alert('Houve um erro ao publicar a imagem.');
  }
});