
/* Variablen Bilder und Text */

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

/* Variablen für functionen PopUp allgemein */

let images = [];
let currentIndex = 0;

const imgContent = document.getElementById('imgContent');
const popUp = document.getElementById('popUp');
const modalImg = document.getElementById('modalImg');
const modalText = document.getElementById('modalText');
const closeBtn = document.getElementById('closePopUp');
const backdrop = popUp.querySelector('.backdrop');




/* Funktion zum aufrufen der Imgs aus java-script */

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




/* Popup Funktionen / close / open */

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




/* Funktionen zum öffnen des Images und übergabe des Imgs und Textes */

  function openImage(event) {
  const img = event.target.closest('img');
  if (!img) return;
  images = Array.from(document.querySelectorAll('#imgContent img'));
  currentIndex = images.indexOf(img);
  const text = decodeURIComponent(img.dataset.text || '');
  openPopUp(img.src, img.alt || 'Image', text);
  event.preventDefault();
}

function setupGallery() {
  const imgContent = document.getElementById('imgContent');
  imgContent.addEventListener('click', openImage);
  imgContent.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') openImage(event);
  });
}




/* Funktion zum ändern des Imgs in beiden Richtungen + dauerschleife der Imgs */

function changeImage(direction = 1) {
  if (!images || images.length === 0) return;
  currentIndex = (currentIndex + direction + images.length) % images.length;
  const image = images[currentIndex];
  const text = decodeURIComponent(image.dataset.text || '');
  openPopUp(image.src, image.alt || 'Image', text);
}




/* Benützung mit Keyborad + FocusTrap*/

function trapFocus(container, event) {
    if (event.key !== 'Tab') return; 
    const focusable = container.querySelectorAll (
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
     event.preventDefault();
     first.focus();
    }
  }
  function focusTrap(element) {
    element.addEventListener('keydown', (event) => trapFocus(element, event));

  }



function escapeWithKeyboard() {
  document.addEventListener('keydown', escapeKey)
}
function escapeKey(event) {
  if (event.key === 'Escape' && popUp.classList.contains('open')) {
    closePopUp();
  }
}



document.addEventListener('keydown', (event) => {
  if (event.key !== 'Tab') return;
  const focusableElements = Array.from(
    document.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter(el => el.offsetParent !== null);
  if (focusableElements.length === 0) return;
  const first = focusableElements[0];
  const last = focusableElements[focusableElements.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  }
  else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});


