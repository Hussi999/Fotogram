let fotoImg = [
  'img/arctic-fox.jpg',
  'img/asia.jpg',
  'img/duck.jpg',
  'img/flow.jpg',
  'img/italy.jpg',
  'img/mountains-2.jpg',
  'img/amilio.jpg',
  'img/old-barn.jpg',
  'img/pied-flycatcher.jpg',
  'img/rhinoceros.jpg',
  'img/sea.jpg',
  'img/snow-mountain.jpg'
];

let textImg = [
  'Arctic Fox – aufgenommen in Norwegen',
  'Reise durch Asien',
  'Wasservögel am See',
  'Bachlauf in Italien',
  'Die bunten Häuser von Cinque Terre',
  'Bergkette in den Alpen',
  'Kleines Städtchen in Südamerika',
  'Alte Scheune im Nebel',
  'Pied Flycatcher im Frühlingswald',
  'Nashorn im Reservat',
  'Sonnenuntergang am Meer',
  'Verschneiter Gipfel im Winter'
];

let images = [];
let currentIndex = 0;

const imgContent = document.getElementById('imgContent');
const popUp = document.getElementById('popUp');
const modalImg = document.getElementById('modalImg');
const modalText = document.getElementById('modalText');
const closeBtn = document.getElementById('closePopUp');
const backdrop = popUp.querySelector('.backdrop');





function render() {
  let contentRef = document.getElementById('imgContent');

  contentRef.innerHTML = '';

  for (let i = 0; i < fotoImg.length; i++) {
    contentRef.innerHTML += getTemplate(i);
  }
}

function getTemplate(i) {
  return `<img src="${fotoImg[i]}" alt="Photo ${textImg[i]}" data-text=${encodeURIComponent(textImg[i])} tabindex="0" aria-label="${textImg[i]}"  role="button">`;
}





function openPopUp(src, alt = '', text = '') {
  modalImg.src = src;
  modalImg.alt = alt;
  modalText.textContent = text;
  popUp.removeAttribute('hidden');
  popUp.classList.add('open');
  popUp.focus();
  closeBtn.focus();
}

function closePopUp() {
  popUp.setAttribute('hidden', '');
  popUp.classList.remove('open');
  modalImg.src = '';
  modalText.textContent = '';
}

popUp.addEventListener('keydown', (e) => {
  if (e.key !== 'Tab') return;
  const focusable = popUp.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  }
  else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
});





imgContent.addEventListener('click', (e) => {
  const img = e.target.closest('img');
  if (!img) return;
  images = Array.from(document.querySelectorAll('#imgContent img'));
  currentIndex = images.indexOf(img);
  const text = decodeURIComponent(img.dataset.text || '');
  openPopUp(img.src, img.alt || 'Image', text);
});

imgContent.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    const img = e.target.closest('img');
    if (!img) return;
    images = Array.from(document.querySelectorAll('#imgContent img'));
    currentIndex = images.indexOf(img);
    const text = decodeURIComponent(img.dataset.text || '');
    openPopUp(img.src, img.alt || 'Image', text);
    e.preventDefault();
  }
});





function nextImage() {
  currentIndex = (currentIndex + 1) % images.length; 
  const nextImg = images[currentIndex];
  const text = decodeURIComponent(nextImg.dataset.text || '');
  openPopUp(nextImg.src, nextImg.alt || 'Image', text);
}

function prevImage() {
  if (!images || images.length === 0) return;
  currentIndex = (currentIndex - 1 + images.length) % images.length; 
  const prevImg = images[currentIndex];
  const text = decodeURIComponent(prevImg.dataset.text || '');
  openPopUp(prevImg.src, prevImg.alt || 'Image', text);
}

document.getElementById('nextBtn').addEventListener('click', nextImage);
document.getElementById('prevBtn').addEventListener('click', prevImage);

closeBtn.addEventListener('click', closePopUp);
backdrop.addEventListener('click', closePopUp);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && popUp.classList.contains('open')) {
    closePopUp();
  }
});





document.addEventListener('keydown', (e) => {
  if (e.key !== 'Tab') return;
  const focusableElements = Array.from(
    document.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter(el => el.offsetParent !== null);
  if (focusableElements.length === 0) return;
  const first = focusableElements[0];
  const last = focusableElements[focusableElements.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  }
  else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
});


