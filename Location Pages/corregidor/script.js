const scroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  lerp: 0.1
});

// Toggle image functionality (image only)
const mainImg = document.getElementById('main-toggle-image');
const caption = document.getElementById('main-image-caption');

let showingOccupation = true;

function toggleImageWithFade() {
  mainImg.classList.add('main-image-fade');
  setTimeout(() => {
    if (showingOccupation) {
      mainImg.src = './images/japanese-landing.jpg';
      mainImg.alt = 'Japanese Landing';
      caption.textContent = 'Japanese landing at Corregidor, 1942';
    } else {
      mainImg.src = './images/JapaneseOccupation.jpg';
      mainImg.alt = 'Japanese Occupation';
      caption.textContent = 'Japanese landing at Corregidor, 1942';
    }
    showingOccupation = !showingOccupation;
    mainImg.classList.remove('main-image-fade');
  }, 400);
}

if (mainImg) {
  mainImg.addEventListener('click', toggleImageWithFade);
}

// Chapter Selector
document.addEventListener('DOMContentLoaded', function() {
  const chapterSelector = document.getElementById('chapter-selector-overlay');
  const openChapterSelector = document.getElementById('open-chapter-selector');
  const closeChapterSelector = document.getElementById('close-chapter-selector');

  if (openChapterSelector && chapterSelector && closeChapterSelector) {
    function openSelector() {
      chapterSelector.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeSelector() {
      chapterSelector.classList.remove('active');
      document.body.style.overflow = '';
    }

    openChapterSelector.addEventListener('click', openSelector);
    closeChapterSelector.addEventListener('click', closeSelector);

    // Close when clicking outside the content
    chapterSelector.addEventListener('click', (e) => {
      if (e.target === chapterSelector) {
        closeSelector();
      }
    });
  }
});
