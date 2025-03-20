document.addEventListener('DOMContentLoaded', () => {
  const navEl = document.querySelector('.nav');
  const toggleButton = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  const dropdowns = document.querySelectorAll('.navbar-nav .dropdown');
  const backToTopButton = document.getElementById('back-to-top');

  // Checks scrolling to update navbar appearance and back-to-top
  const checkScroll = () => {
    if (
      window.scrollY >= 56 ||
      toggleButton.getAttribute('aria-expanded') === 'true'
    ) {
      navEl.classList.add('nav-scrolled');
      navEl.setAttribute('data-bs-theme', 'dark');
    } else {
      navEl.classList.remove('nav-scrolled');
      navEl.setAttribute('data-bs-theme', 'light');
    }

    if (window.scrollY > 100) {
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  };

  backToTopButton.onclick = function () {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For others
  };

  window.addEventListener('scroll', checkScroll);
  toggleButton.addEventListener('click', checkScroll);
  navbarCollapse.addEventListener('hidden.bs.collapse', checkScroll);

  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener('mouseenter', () => {
      dropdown.querySelector('.dropdown-menu').classList.add('show');
    });
    dropdown.addEventListener('mouseleave', () => {
      dropdown.querySelector('.dropdown-menu').classList.remove('show');
    });
  });

  const toggleCentering = () => {
    document.querySelectorAll('.dropdown-menu').forEach((menu) => {
      menu.classList.toggle('center-dropdown', window.innerWidth >= 992);
    });
  };
  toggleCentering();
  window.addEventListener('resize', toggleCentering);

  // Language switching
  function setLanguage(lang) {
    const elements = document.querySelectorAll('.lang');
    elements.forEach((el) => el.classList.remove('active'));
    if (document.getElementById(lang)) {
      document.getElementById(lang).classList.add('active');
    }
  }

  // Parallax effect on #hero (if present)
  document.addEventListener('scroll', function () {
    const heroSection = document.querySelector('#hero');
    if (!heroSection) return;
    const scrollPosition = window.scrollY;
    heroSection.style.transform = `translateY(${scrollPosition * 0.5}px)`;
  });

  // Image Accordion hover effect
  const panels = document.querySelectorAll('.accordion .panel');
  panels.forEach((panel) => {
    panel.addEventListener('mouseenter', () => {
      panels.forEach((p) => p.classList.remove('active'));
      panel.classList.add('active');
    });
  });

  // Silhouettes initialization
  const silhouettes = document.querySelectorAll('.silhouette-container');
  silhouettes.forEach((s) => s.classList.remove('active'));
  const firstSilhouette = document.getElementById('silhouette-1');
  if (firstSilhouette) firstSilhouette.classList.add('active');

  // Clicking on an accordion panel -> show silhouette
  panels.forEach((panel, index) => {
    panel.addEventListener('click', () => {
      silhouettes.forEach((silhouette) => silhouette.classList.remove('active'));
      const selectedSilhouette = document.getElementById(
        `silhouette-${index + 1}`
      );
      if (selectedSilhouette) {
        selectedSilhouette.classList.add('active');
        const silhouettesSection = document.getElementById('silhouettes');
        const viewportHeight = window.innerHeight;
        const silhouettesBottom =
          silhouettesSection.getBoundingClientRect().bottom + window.scrollY;
        window.scrollTo({
          top: silhouettesBottom - viewportHeight,
          behavior: 'smooth',
        });
      }
    });
  });

  // Component dropdown
  const componentDropdown = document.getElementById('component');
  const sections = document.querySelectorAll('.component-section');
  componentDropdown.addEventListener('change', function () {
    const selectedComponent = this.value;
    sections.forEach((section) => {
      if (
        section.id === selectedComponent ||
        (selectedComponent === 'silhouettes' &&
          section.id === 'image-accordion')
      ) {
        section.style.display = 'block';
      } else {
        section.style.display = 'none';
      }
    });
  });
  // Default to silhouettes + accordion visible
  sections.forEach((section) => {
    section.style.display =
      section.id === 'silhouettes' || section.id === 'image-accordion'
        ? 'block'
        : 'none';
  });

  /*===========================================
    PANEL LOGIC - Flip in normal mode, Zoom icon
  ===========================================*/
  const ceilingPanels = document.querySelectorAll('.ceiling-panel');

  // Flip in normal mode by clicking panel
  ceilingPanels.forEach((panel) => {
    panel.addEventListener('click', (event) => {
      // If user clicked the zoom icon, do not flip; we'll enlarge instead
      if (event.target.closest('.zoom-icon')) return;
      panel.classList.toggle('flipped');
    });
  });

  // Enlarge logic: open modal only if zoom icon is clicked
  const ceilingModal = document.getElementById('ceiling-modal');
  const ceilingModalClose = document.getElementById('ceiling-modal-close');
  const ceilingModalPrev = document.getElementById('ceiling-modal-prev');
  const ceilingModalNext = document.getElementById('ceiling-modal-next');
  const modalFlipBtn = document.getElementById('ceiling-modal-flip-btn');

  const flipContainer = document.getElementById('modal-flip-container');
  const flipInner = flipContainer.querySelector('.flip-inner');
  const modalImageFront = document.getElementById('ceiling-modal-image-front');
  const modalImageBack = document.getElementById('ceiling-modal-image-back');

  // Desired order: 4 → 1 → 5 → 2 → 6 → 3
  const panelOrder = [4, 1, 5, 2, 6, 3];
  const panelImages = {
    1: {
      front: '../assets/img/ceiling-1f.png',
      back: '../assets/img/ceiling-1r.png',
    },
    2: {
      front: '../assets/img/ceiling-2f.png',
      back: '../assets/img/ceiling-2r.png',
    },
    3: {
      front: '../assets/img/ceiling-3f.png',
      back: '../assets/img/ceiling-3r.png',
    },
    4: {
      front: '../assets/img/ceiling-4f.png',
      back: '../assets/img/ceiling-4r.png',
    },
    5: {
      front: '../assets/img/ceiling-5f.png',
      back: '../assets/img/ceiling-5r.png',
    },
    6: {
      front: '../assets/img/ceiling-6f.png',
      back: '../assets/img/ceiling-6r.png',
    },
  };

  let currentIndex = 0;

  function openCeilingModal(panelNumber) {
    currentIndex = panelOrder.indexOf(panelNumber);
    if (currentIndex < 0) currentIndex = 0;
    flipContainer.classList.remove('flipped');
    updateCeilingModal();
    ceilingModal.style.display = 'flex';
  }

  function updateCeilingModal() {
    const panelNum = panelOrder[currentIndex];
    modalImageFront.src = panelImages[panelNum].front;
    modalImageBack.src = panelImages[panelNum].back;
  }

  function closeModal() {
    ceilingModal.style.display = 'none';
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % panelOrder.length;
    flipContainer.classList.remove('flipped');
    updateCeilingModal();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + panelOrder.length) % panelOrder.length;
    flipContainer.classList.remove('flipped');
    updateCeilingModal();
  }

  // Enlarge only on zoom icon
  ceilingPanels.forEach((panel) => {
    const zoomIcon = panel.querySelector('.zoom-icon');
    zoomIcon.addEventListener('click', (event) => {
      event.stopPropagation(); // prevent panel flip
      const panelNumber = parseInt(panel.getAttribute('data-panel'), 10);
      openCeilingModal(panelNumber);
    });
  });

  // Close modal if X is clicked
  ceilingModalClose.addEventListener('click', closeModal);
  // Close modal if outside content is clicked
  ceilingModal.addEventListener('click', (event) => {
    if (event.target === ceilingModal) closeModal();
  });

  // Navigation arrows
  ceilingModalNext.addEventListener('click', showNext);
  ceilingModalPrev.addEventListener('click', showPrev);

  // Flip in the enlarged modal only via button
  modalFlipBtn.addEventListener('click', () => {
    flipContainer.classList.toggle('flipped');
  });
});

// Open PDF
function openPDF() {
  window.open('../assets/document/CATALOGUE.pdf', '_blank');
}