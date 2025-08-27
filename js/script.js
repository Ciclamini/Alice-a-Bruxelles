
document.addEventListener("DOMContentLoaded", function () {
  // 1) Navbar items → slider panels
  document.querySelectorAll('[data-panel-index]').forEach(link => {
    link.addEventListener("click", function (e) {

      e.preventDefault();
      const idx = parseInt(this.dataset.panelIndex, 10);
      const targetPanel = document.querySelectorAll("#slider-section .panel")[idx];
      if (targetPanel) targetPanel.click();
    });
  });

  // 2) Slider panels → content panes
  const panels = document.querySelectorAll("#slider-section .panel");
  const panelToContentId = [
    "video",
    "silhouettes-accordion", 
    "back-wall-panels",
    "stand",
    "front-wall",
    "back-wall",
    "right-wall"
  ];

  function hideAllContentPanes() {
  // Reset hotspots when switching sections
  if (typeof resetBackWallHotspots === 'function') {
    resetBackWallHotspots();
  }
  
  panelToContentId.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });
  // Hide individual content sections
  document.getElementById("image-accordion")?.style.setProperty("display", "none");
  document.getElementById("silhouettes")?.style.setProperty("display", "none");
  // Hide all silhouette containers
  document.querySelectorAll("#silhouettes .silhouette-container").forEach(el => {
    el.style.display = "none";
  });
}

  hideAllContentPanes();

  panels.forEach((panelEl, idx) => {
  panelEl.addEventListener("click", () => {
    console.log(`Panel ${idx} clicked`);
    panels.forEach(p => p.classList.remove("active"));
    panelEl.classList.add("active");
    
    // IMPORTANT: Reset hotspots when switching sections
    if (typeof resetBackWallHotspots === 'function') {
      resetBackWallHotspots();
    }
    hideAllContentPanes();

    if (idx === 1) {
      // "La Montesca School: A Story of Women"
      const accordion = document.getElementById("image-accordion");
      console.log("Showing La Montesca section");

      if (accordion) {
        accordion.style.display = "block";
        console.log("Image accordion displayed");
      }

      // const firstAccordionPanel = document.querySelector('#image-accordion .panel');
      // if (firstAccordionPanel) {
      //   firstAccordionPanel.classList.add('active');
      //   console.log("First accordion panel activated");
      // }

      setTimeout(() => {
        accordion?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
      
    } else if (idx === 5) {
      // *** BACK WALL SECTION - INITIALIZE HOTSPOTS ***
      console.log("Back Wall panel clicked - initializing hotspots");
      const contentEl = document.getElementById("back-wall");
      if (contentEl) {
        contentEl.style.display = "block";
        
        // Initialize hotspots with delay for back-wall section
        setTimeout(() => {
          console.log('Back wall section made visible, initializing hotspots...');
          if (typeof initBackWallHotspotsOnce === 'function') {
            initBackWallHotspotsOnce();
          }
        }, 500);
        
        contentEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      
    } else {
      // All other panels
      const contentId = panelToContentId[idx];
      const contentEl = document.getElementById(contentId);
      if (contentEl) {
        contentEl.style.display = "block";
        contentEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
  console.log('Page loaded - checking for hotspot functions...');
  console.log('resetBackWallHotspots available:', typeof resetBackWallHotspots === 'function');
  console.log('initBackWallHotspots available:', typeof initBackWallHotspots === 'function');
  console.log('initBackWallHotspotsOnce available:', typeof initBackWallHotspotsOnce === 'function');
  console.log('handleBackWallResize available:', typeof handleBackWallResize === 'function');
});

  // 3) Image-accordion → silhouettes interaction
  document.querySelectorAll('#image-accordion .panel').forEach(panel => {
    panel.addEventListener('click', () => {
      const idx = panel.dataset.index;
      if (!idx) return;

      console.log(`Clicked accordion panel ${idx}`);

      // Remove active class from all accordion panels
      document.querySelectorAll('#image-accordion .panel').forEach(p => p.classList.remove('active'));
      // Add active class to clicked panel
      panel.classList.add('active');

      // Show the silhouettes section if it's not already visible
      const silhouettes = document.getElementById("silhouettes");
      if (silhouettes) {
        silhouettes.style.display = "block";
        console.log("Silhouettes section displayed");
      }

      // Hide all silhouette containers
      document.querySelectorAll('#silhouettes .silhouette-container').forEach(el => {
        el.style.display = 'none';
      });

      // Show the target silhouette
      const target = document.getElementById(`silhouette-${idx}`);
      if (target) {
        target.style.display = 'block';
        console.log(`Showing silhouette ${idx}`);

        // Smooth scroll to the silhouette
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    });
  });

  const navEl = document.querySelector('.nav');
  const backToTopButton = document.getElementById('back-to-top');
  const toggleButton = document.querySelector('.navbar-toggler');
  const dropdowns = document.querySelectorAll('.nav-item.dropdown');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  // Check page scroll for navbar style changes
  const checkScroll = () => {
      if (window.scrollY > 100) {
          navEl.classList.add('nav-scrolled');
          navEl.setAttribute('data-bs-theme', 'dark');
      } else {
          navEl.classList.remove('nav-scrolled');
          navEl.setAttribute('data-bs-theme', 'light');
      }

      if (window.scrollY > 100) {
          backToTopButton.style.display = "block";
      } else {
          backToTopButton.style.display = "none";
      }
  };

  backToTopButton.onclick = function () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
  };

  window.addEventListener('scroll', checkScroll);
  toggleButton.addEventListener('click', checkScroll);
  navbarCollapse.addEventListener('hidden.bs.collapse', checkScroll);

  // Dropdown hover functionality
  dropdowns.forEach(dropdown => {
      dropdown.addEventListener('mouseenter', () => {
          dropdown.querySelector('.dropdown-menu').classList.add('show');
      });

      dropdown.addEventListener('mouseleave', () => {
          dropdown.querySelector('.dropdown-menu').classList.remove('show');
      });
  });

  const toggleCentering = () => {
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
          menu.classList.toggle('center-dropdown', window.innerWidth >= 992);
      });
  };

  toggleCentering();
  window.addEventListener('resize', toggleCentering);

  const ceilingPanels = document.querySelectorAll('.ceiling-panel');

  // Flip in normal mode by clicking panel
  ceilingPanels.forEach((panel) => {
      panel.addEventListener('click', (event) => {
          // If user clicked the zoom icon, do not flip; we'll enlarge instead
          if (event.target.closest('.zoom-icon')) return;
          panel.classList.toggle('flipped');
      });
  });

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
          back: '../assets/img/ceiling-1r-en.png',
      },
      2: {
          front: '../assets/img/ceiling-2f.png',
          back: '../assets/img/ceiling-2r-en.png',
      },
      3: {
          front: '../assets/img/ceiling-3f.png',
          back: '../assets/img/ceiling-3r-en.png',
      },
      4: {
          front: '../assets/img/ceiling-4f.png',
          back: '../assets/img/ceiling-4r-en.png',
      },
      5: {
          front: '../assets/img/ceiling-5f.png',
          back: '../assets/img/ceiling-5r-en.png',
      },
      6: {
          front: '../assets/img/ceiling-6f.png',
          back: '../assets/img/ceiling-6r-en.png',
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

  // BACK WALL ZOOM-ONLY PANELS
  document.querySelectorAll('.back-wall-panel .zoom-icon').forEach(icon => {
      icon.addEventListener('click', (event) => {
          event.stopPropagation();
          const panel = icon.closest('.back-wall-panel');
          const panelNumber = parseInt(panel.getAttribute('data-panel'), 10);
          showEnlargedFrame(panelNumber);
      });
  });

  // Right Wall Panel Modal functionality with zoom
  const rightWallModal = document.getElementById('right-wall-modal');
  const rightWallModalImage = document.getElementById('right-wall-modal-image');
  const rightWallModalClose = document.querySelector('.right-wall-modal-close');
  const rightWallModalPrev = document.getElementById('right-wall-modal-prev');
  const rightWallModalNext = document.getElementById('right-wall-modal-next');
  const rightWallImageContainer = document.querySelector('.right-wall-modal-image-container');

  const rightWallPanels = document.querySelectorAll('.right-wall-panel');
  const rightWallPanelOrder = [1, 2, 3]; // Panel IDs in display order

  // Panel images mapping
  const rightWallPanelImages = {
      1: '../assets/img/panel-1-en.png',
      2: '../assets/img/panel-2-en.png',
      3: '../assets/img/credits.png'
  };

  let rightWallCurrentIndex = 0;

  // Zoom functionality variables
  let currentZoom = 1;
  let maxZoom = 3;
  let minZoom = 1;
  let dragActive = false;
  let startX, startY, initialX, initialY;
  let translateX = 0;
  let translateY = 0;

  // Update zoom level display
  function updateZoomLevelDisplay() {
      const zoomLevelDisplay = rightWallModal.querySelector('.zoom-level');
      if (zoomLevelDisplay) {
          zoomLevelDisplay.textContent = `${Math.round(currentZoom * 100)}%`;
      }
  }

  // Apply transform to image
  function setImageTransform() {
      rightWallModalImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentZoom})`;
  }

  // Reset zoom and position
  function resetZoom() {
      currentZoom = 1;
      translateX = 0;
      translateY = 0;
      updateZoomLevelDisplay();
      setImageTransform();
  }

  // Zoom in button click handler
  if (rightWallModal) {
      const zoomInBtn = rightWallModal.querySelector('.zoom-in');
      if (zoomInBtn) {
          zoomInBtn.addEventListener('click', () => {
              if (currentZoom < maxZoom) {
                  currentZoom += 0.25;
                  updateZoomLevelDisplay();
                  setImageTransform();
              }
          });
      }

      // Zoom out button click handler
      const zoomOutBtn = rightWallModal.querySelector('.zoom-out');
      if (zoomOutBtn) {
          zoomOutBtn.addEventListener('click', () => {
              if (currentZoom > minZoom) {
                  currentZoom -= 0.25;
                  updateZoomLevelDisplay();
                  setImageTransform();
              }
          });
      }

      // Reset zoom button click handler
      const resetBtn = rightWallModal.querySelector('.zoom-reset');
      if (resetBtn) {
          resetBtn.addEventListener('click', resetZoom);
      }
  }

  // Mouse wheel zoom
  if (rightWallImageContainer) {
      rightWallImageContainer.addEventListener('wheel', (e) => {
          e.preventDefault();

          // Calculate zoom
          const delta = -Math.sign(e.deltaY) * 0.1;
          const newZoom = Math.min(Math.max(currentZoom + delta, minZoom), maxZoom);

          // Apply zoom if changed
          if (newZoom !== currentZoom) {
              currentZoom = newZoom;
              updateZoomLevelDisplay();
              setImageTransform();
          }
      });

      // Drag to pan functionality - Mousedown on the image container
      rightWallImageContainer.addEventListener('mousedown', (e) => {
          // Only activate drag if zoomed in and it's a left-click
          if (currentZoom > 1 && e.button === 0) {
              dragActive = true;
              startX = e.clientX;
              startY = e.clientY;
              initialX = translateX;
              initialY = translateY;
              rightWallImageContainer.style.cursor = 'grabbing';
              e.preventDefault(); // Prevent default browser drag behavior
          }
      });

      // Mousemove on the image container
      rightWallImageContainer.addEventListener('mousemove', (e) => {
          if (dragActive) {
              const dx = e.clientX - startX;
              const dy = e.clientY - startY;

              translateX = initialX + dx;
              translateY = initialY + dy;

              setImageTransform();
          }
      });

      // Mouseleave from the container - if dragging, stop it.
      rightWallImageContainer.addEventListener('mouseleave', () => {
          if (dragActive) {
              dragActive = false;
              rightWallImageContainer.style.cursor = 'grab';
          }
      });

      // Touch events for mobile
      rightWallImageContainer.addEventListener('touchstart', (e) => {
          if (currentZoom > 1 && e.touches.length === 1) {
              dragActive = true;
              startX = e.touches[0].clientX;
              startY = e.touches[0].clientY;
              initialX = translateX;
              initialY = translateY;
          }
      });

      rightWallImageContainer.addEventListener('touchmove', (e) => {
          if (dragActive && e.touches.length === 1) {
              const dx = e.touches[0].clientX - startX;
              const dy = e.touches[0].clientY - startY;

              translateX = initialX + dx;
              translateY = initialY + dy;

              setImageTransform();
              e.preventDefault();
          }
      });

      rightWallImageContainer.addEventListener('touchend', () => {
          dragActive = false;
      });

      rightWallImageContainer.addEventListener('touchcancel', () => {
          dragActive = false;
      });
  }

  // GLOBAL Mouseup handler - this is crucial for releasing the drag
  window.addEventListener('mouseup', (e) => {
      if (dragActive && e.button === 0) { // Check if drag was active and it's a left-click release
          dragActive = false;
          if (rightWallImageContainer) {
              rightWallImageContainer.style.cursor = 'grab';
          }
      }
  });

  // Open modal when zoom icon is clicked
  rightWallPanels.forEach(panel => {
      const zoomIcon = panel.querySelector('.zoom-icon');
      if (zoomIcon) {
          zoomIcon.addEventListener('click', (event) => {
              event.stopPropagation();
              const panelNumber = parseInt(panel.getAttribute('data-panel'), 10);
              openRightWallModal(panelNumber);
          });
      }
  });

  function openRightWallModal(panelNumber) {
      rightWallCurrentIndex = rightWallPanelOrder.indexOf(panelNumber);
      if (rightWallCurrentIndex < 0) rightWallCurrentIndex = 0;
      // Reset zoom when opening modal
      resetZoom();
      updateRightWallModal();
      rightWallModal.style.display = 'flex';
  }

  function updateRightWallModal() {
      const panelNum = rightWallPanelOrder[rightWallCurrentIndex];
      rightWallModalImage.src = rightWallPanelImages[panelNum];
      // Reset zoom when changing panels
      resetZoom();
  }

  function closeRightWallModal() {
      rightWallModal.style.display = 'none';
  }

  function showRightWallNext() {
      rightWallCurrentIndex = (rightWallCurrentIndex + 1) % rightWallPanelOrder.length;
      updateRightWallModal();
  }

  function showRightWallPrev() {
      rightWallCurrentIndex = (rightWallCurrentIndex - 1 + rightWallPanelOrder.length) % rightWallPanelOrder.length;
      updateRightWallModal();
  }

  // Event listeners for modal controls
  if (rightWallModalClose) rightWallModalClose.addEventListener('click', closeRightWallModal);
  if (rightWallModal) {
      rightWallModal.addEventListener('click', (event) => {
          if (event.target === rightWallModal) closeRightWallModal();
      });
  }
  if (rightWallModalNext) rightWallModalNext.addEventListener('click', showRightWallNext);
  if (rightWallModalPrev) rightWallModalPrev.addEventListener('click', showRightWallPrev);

  // Theme handling with null checks
  const themeToggleCheckbox = document.getElementById('switchTheme');
  if (themeToggleCheckbox) {
      const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

      document.documentElement.setAttribute('data-bs-theme', currentTheme);
      themeToggleCheckbox.checked = currentTheme === 'dark';

      themeToggleCheckbox.addEventListener('change', function () {
          let theme = themeToggleCheckbox.checked ? 'dark' : 'light';
          document.documentElement.setAttribute('data-bs-theme', theme);
          localStorage.setItem('theme', theme);
      });
  }

  // Initialize image maps
  initImageMap();

  // Silhouette animation observer
  const silhouettes = document.querySelectorAll(".silhouette");
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add("show");
              observer.unobserve(entry.target);
          }
      });
  }, {threshold: 0.3});

  silhouettes.forEach(silhouette => {
      observer.observe(silhouette);
  });
});

// IMAGE MAP FUNCTIONS
function initImageMap() {
    if (typeof $ !== 'undefined' && $.fn.imageMapResize) {
        $('map').imageMapResize();

        // Modern event listeners for map areas
        document.querySelectorAll('area[coords]').forEach(area => {
            area.addEventListener('click', (e) => {
                e.preventDefault();
                const frameNum = area.getAttribute('title').match(/\d+/)?.[0];
                if (frameNum) showEnlargedFrame(parseInt(frameNum));
            });
        });
    }
}

// POPUP FUNCTIONS
function showEnlargedFrame(frameNumber) {
    const popup = document.getElementById(`popup-frame${frameNumber}`);
    if (popup) {
        popup.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closePopup(popupId) {
  console.log(`Closing popup: ${popupId}`);
  const popup = document.getElementById(popupId);
  
  if (!popup) {
    console.error(`Popup with ID ${popupId} not found`);
    return;
  }
  
  // Add closing animation
  popup.classList.remove('show');
  
  setTimeout(() => {
    popup.style.display = 'none';
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    
    // Only reset flip state for frames that have flip functionality (7-11)
    const frameNumber = parseInt(popupId.replace('popup-frame', ''));
    if (frameNumber >= 7 && frameNumber <= 11) {
      const flipContainer = popup.querySelector('.popup-flip-container');
      if (flipContainer) {
        flipContainer.classList.remove('flipped');
        
        // Reset button text
        const flipBtn = popup.querySelector('.popup-flip-btn');
        if (flipBtn) {
          flipBtn.textContent = 'Show Info';
        }
      }
    }
  }, 150);
}

function togglePopupFlip(popupId) {
  const popup = document.getElementById(popupId);
  if (!popup) {
    console.error(`Popup with ID ${popupId} not found`);
    return;
  }
  
  // Extract frame number from popup ID
  const frameNumber = parseInt(popupId.replace('popup-frame', ''));
  
  // Now allow flipping for frames 6-11 (Frame 6 added)
  if (frameNumber < 6 || frameNumber > 11) {
    console.log(`Frame ${frameNumber} does not have flip functionality`);
    return;
  }
  
  const flipContainer = popup.querySelector('.popup-flip-container');
  if (flipContainer) {
    flipContainer.classList.toggle('flipped');
    
    // Update button text based on flip state
    const flipBtn = popup.querySelector('.popup-flip-btn');
    if (flipBtn) {
      const isFlipped = flipContainer.classList.contains('flipped');
      flipBtn.textContent = isFlipped ? 'Show Image' : 'Show Info';
    }
    
    // Add haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  }
}

// Updated showPopup function to handle Frame 6
function showPopup(id) {
  console.log(`Opening popup: ${id}`);
  const popup = document.getElementById(id);
  
  if (!popup) {
    console.error(`Popup with ID ${id} not found`);
    return;
  }
  
  // Extract frame number from popup ID
  const frameNumber = parseInt(id.replace('popup-frame', ''));
  
  // Reset flip state when opening popup (now for frames 6-11)
  if (frameNumber >= 6 && frameNumber <= 11) {
    const flipContainer = popup.querySelector('.popup-flip-container');
    if (flipContainer) {
      flipContainer.classList.remove('flipped');
      
      // Reset button text
      const flipBtn = popup.querySelector('.popup-flip-btn');
      if (flipBtn) {
        flipBtn.textContent = 'Show Info';
      }
    }
  }
  
  // Show the popup
  popup.style.display = 'flex';
  popup.classList.add('show');
  document.body.classList.add('modal-open');
  document.body.style.overflow = 'hidden';
  
  // Focus management for accessibility
  if (frameNumber >= 6 && frameNumber <= 11) {
    // For flip-enabled frames, focus the flip button
    const flipBtn = popup.querySelector('.popup-flip-btn');
    if (flipBtn) {
      setTimeout(() => flipBtn.focus(), 100);
    }
  } else {
    // For simple frames (1-5), focus the close button
    const closeBtn = popup.querySelector('.close');
    if (closeBtn) {
      setTimeout(() => closeBtn.focus(), 100);
    }
  }
}

// Updated closePopup function to handle Frame 6
function closePopup(popupId) {
  console.log(`Closing popup: ${popupId}`);
  const popup = document.getElementById(popupId);
  
  if (!popup) {
    console.error(`Popup with ID ${popupId} not found`);
    return;
  }
  
  // Add closing animation
  popup.classList.remove('show');
  
  setTimeout(() => {
    popup.style.display = 'none';
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    
    // Only reset flip state for frames that have flip functionality (6-11)
    const frameNumber = parseInt(popupId.replace('popup-frame', ''));
    if (frameNumber >= 6 && frameNumber <= 11) {
      const flipContainer = popup.querySelector('.popup-flip-container');
      if (flipContainer) {
        flipContainer.classList.remove('flipped');
        
        // Reset button text
        const flipBtn = popup.querySelector('.popup-flip-btn');
        if (flipBtn) {
          flipBtn.textContent = 'Show Info';
        }
      }
    }
  }, 150);
}

// Close when clicking outside popup content
  document.addEventListener('click', (e) => {
    // Check if the clicked element is a popup background (not the content)
    if (e.target.classList.contains('popup')) {
      const popupId = e.target.id;
      console.log(`Clicked outside popup: ${popupId} - closing and restoring hotspots`);
      
      // Close the popup and restore hotspots
      e.target.style.display = 'none';
      document.body.classList.remove('modal-open'); // ← This is the key fix!
      document.body.style.overflow = '';
    }
  });



// UTILITY FUNCTIONS
function openPDF() {
    window.open('../assets/document/CATALOGUE.pdf', '_blank');
}

// Initialize on full load
window.addEventListener('load', () => {
    setTimeout(initImageMap, 300);

    // Fallback image handling
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', () => {
            img.src = 'fallback-image.png';
        });
    });
});

// Theme handling
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('siteTheme', newTheme);
    });

    const savedTheme = localStorage.getItem('siteTheme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
    }
}

//Landing Page Video
function playLandingVideo() {
    const image = document.getElementById("previewImage");
    const video = document.getElementById("landingVideo");
    image.style.display = "none";
    video.style.display = "block";
    video.play();
}

function scrollToVideo() {
    const target = document.getElementById("landing-video-element");
    if (target) {
        target.scrollIntoView({behavior: "smooth"});
    }
}

// Language switcher
function setLanguage(lang) {
  const flag = document.getElementById('currentLanguageFlag');
  flag.src = lang === 'it' ? '../assets/img/it.svg' : '../assets/img/en.svg';
  window.location.href = lang === 'it' ? '../it/index1.html' : '../en/index.html';
}

// Video panel trigger
function triggerVideosPanel() {
  const panel = document.getElementById('videos-panel');
  if (panel) panel.click();
}

//Stand back section 6


// Replace this function:
function showPopup(id) {
  console.log(`Opening popup: ${id}`);
  const popup = document.getElementById(id);
  if (popup) {
    popup.style.display = 'flex';
    document.body.classList.add('modal-open'); // Hide hotspots
    document.body.style.overflow = 'hidden';
  }
}

// With this enhanced version:
function showPopup(id) {
  console.log(`Opening popup: ${id}`);
  const popup = document.getElementById(id);
  
  if (!popup) {
    console.error(`Popup with ID ${id} not found`);
    return;
  }
  
  // Extract frame number from popup ID
  const frameNumber = parseInt(id.replace('popup-frame', ''));
  
  // Only reset flip state for frames that have flip functionality (7-11)
  if (frameNumber >= 7 && frameNumber <= 11) {
    const flipContainer = popup.querySelector('.popup-flip-container');
    if (flipContainer) {
      flipContainer.classList.remove('flipped');
      
      // Reset button text
      const flipBtn = popup.querySelector('.popup-flip-btn');
      if (flipBtn) {
        flipBtn.textContent = 'Show Info';
      }
    }
  }
  
  // Show the popup
  popup.style.display = 'flex';
  popup.classList.add('show');
  document.body.classList.add('modal-open');
  document.body.style.overflow = 'hidden';
  
  // Focus management for accessibility
  if (frameNumber >= 7 && frameNumber <= 11) {
    // For flip-enabled frames, focus the flip button
    const flipBtn = popup.querySelector('.popup-flip-btn');
    if (flipBtn) {
      setTimeout(() => flipBtn.focus(), 100);
    }
  } else {
    // For simple frames (1-6), focus the close button
    const closeBtn = popup.querySelector('.close');
    if (closeBtn) {
      setTimeout(() => closeBtn.focus(), 100);
    }
  }
}

let hotspotsInitialized = false;

// Reset hotspots function
function resetBackWallHotspots() {
  console.log('Resetting back wall hotspots...');
  const existingHotspots = document.querySelectorAll('.frame-hotspot');
  existingHotspots.forEach(hotspot => hotspot.remove());
  hotspotsInitialized = false;
}

// Main hotspot initialization function
function initBackWallHotspots() {
  console.log('Starting back wall hotspot initialization...');
  
  const img = document.getElementById('back-wall-image');
  const container = document.querySelector('.image-map-container');
  const backWallSection = document.getElementById('back-wall');
  
  if (!img || !container || !backWallSection) {
    console.error('Required back wall elements not found');
    return false;
  }
  
  // Check if back-wall section is actually visible
  const sectionStyle = window.getComputedStyle(backWallSection);
  if (sectionStyle.display === 'none') {
    console.log('Back wall section not visible, skipping hotspot initialization');
    return false;
  }
  
  // Wait for image to be properly loaded and laid out
  if (!img.complete || img.naturalHeight === 0 || img.offsetWidth === 0) {
    console.log('Back wall image not ready, retrying...');
    return false;
  }

  const imageInfo = {
    naturalWidth: img.naturalWidth,
    naturalHeight: img.naturalHeight,
    displayedWidth: img.offsetWidth,
    displayedHeight: img.offsetHeight,
    scaleX: img.offsetWidth / img.naturalWidth,
    scaleY: img.offsetHeight / img.naturalHeight
  };

  console.log('Back wall image info:', imageInfo);

  if (imageInfo.displayedWidth === 0 || imageInfo.displayedHeight === 0) {
    console.log('Back wall image dimensions not ready, retrying...');
    return false;
  }

  // Get image position relative to container
  const imgRect = img.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  const imgOffsetX = imgRect.left - containerRect.left;
  const imgOffsetY = imgRect.top - containerRect.top;

  // Frame coordinates
  const frameCoords = [
    [484,499,750,499,755,732,479,735], // Frame 1
    [538,248,701,246,696,474,538,471], // Frame 2
    [349,305,528,305,528,471,347,471], // Frame 3
    [706,298,856,298,856,474,704,474], // Frame 4
    [960,802,1099,792,1115,893,975,893], // Frame 5
    [942,545,1055,537,1055,687,942,693], // Frame 6
    [896,300,1061,296,1063,520,896,524], // Frame 7
    [795,541,904,543,898,708,796,710], // Frame 8
    [154,524,292,526,296,729,153,729], // Frame 9
    [683,737,825,740,841,898,687,898], // Frame 10
    [210,754,310,754,308,831,208,831]  // Frame 11
  ];

  // Create hotspots for each frame
  frameCoords.forEach((coords, index) => {
    const polygon = [];
    for (let i = 0; i < coords.length; i += 2) {
      polygon.push({
        x: coords[i],
        y: coords[i + 1]
      });
    }

    // Calculate bounding box
    const xs = polygon.map(p => p.x);
    const ys = polygon.map(p => p.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    const natural = {
      x: minX,
      y: minY,
      w: maxX - minX,
      h: maxY - minY
    };

    const scaled = {
      x: natural.x * imageInfo.scaleX,
      y: natural.y * imageInfo.scaleY,
      w: natural.w * imageInfo.scaleX,
      h: natural.h * imageInfo.scaleY
    };

    console.log(`Frame ${index + 1}:`, { natural, scaled });

    // Create hotspot element
    const hotspot = document.createElement('div');
    hotspot.className = 'frame-hotspot';
    hotspot.style.position = 'absolute';
    hotspot.style.left = `${imgOffsetX + scaled.x}px`;
    hotspot.style.top = `${imgOffsetY + scaled.y}px`;
    hotspot.style.width = `${scaled.w}px`;
    hotspot.style.height = `${scaled.h}px`;
    
    // Create a clipped background showing the specific part of the image
    const backgroundPosX = -scaled.x;
    const backgroundPosY = -scaled.y;
    const backgroundSizeW = imageInfo.displayedWidth;
    const backgroundSizeH = imageInfo.displayedHeight;
    
    hotspot.style.backgroundImage = `url(${img.src})`;
    hotspot.style.backgroundPosition = `${backgroundPosX}px ${backgroundPosY}px`;
    hotspot.style.backgroundSize = `${backgroundSizeW}px ${backgroundSizeH}px`;
    
    hotspot.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log(`Clicked frame ${index + 1}`);
      if (typeof showPopup === 'function') {
        showPopup(`popup-frame${index + 1}`);
      }
    });

    // Add keyboard accessibility
    hotspot.tabIndex = 0;
    hotspot.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (typeof showPopup === 'function') {
          showPopup(`popup-frame${index + 1}`);
        }
      }
    });

    container.appendChild(hotspot);
  });

  console.log(`Back wall hotspots: Created ${frameCoords.length} hotspots`);
  return true;
}

// Hotspot initialization with retry
function initBackWallHotspotsOnce() {
  if (hotspotsInitialized) {
    console.log('Back wall hotspots already initialized, skipping...');
    return;
  }

  const backWallSection = document.getElementById('back-wall');
  if (!backWallSection) {
    console.error('Back wall section not found');
    return;
  }

  const sectionStyle = window.getComputedStyle(backWallSection);
  if (sectionStyle.display === 'none') {
    console.log('Back wall section not visible, cannot initialize hotspots');
    return;
  }

  let attempts = 0;
  const maxAttempts = 10;
  const retryDelay = 200;

  function attemptInit() {
    attempts++;
    console.log(`Back wall hotspot initialization attempt ${attempts}/${maxAttempts}`);
    
    if (initBackWallHotspots()) {
      hotspotsInitialized = true;
      console.log('Back wall hotspots successfully initialized!');
    } else if (attempts < maxAttempts) {
      console.log(`Attempt ${attempts} failed, retrying in ${retryDelay}ms...`);
      setTimeout(attemptInit, retryDelay);
    } else {
      console.error('Failed to initialize back wall hotspots after maximum attempts');
    }
  }

  attemptInit();
}

// Enhanced popup functions with modal-open class management
function showPopupWithHotspots(id) {
  const popup = document.getElementById(id);
  if (popup) {
    popup.style.display = 'flex';
    document.body.classList.add('modal-open'); // Hide hotspots
    document.body.style.overflow = 'hidden';
  }
}

function closePopupWithHotspots(popupId) {
  const popup = document.getElementById(popupId);
  if (popup) {
    popup.style.display = 'none';
    document.body.classList.remove('modal-open'); // Show hotspots
    document.body.style.overflow = '';
  }
}

// Window resize handler for hotspots
let hotspotsResizeTimeout;
function handleBackWallResize() {
  clearTimeout(hotspotsResizeTimeout);
  hotspotsResizeTimeout = setTimeout(function() {
    const backWallSection = document.getElementById('back-wall');
    if (backWallSection && window.getComputedStyle(backWallSection).display !== 'none' && hotspotsInitialized) {
      console.log('Window resized, reinitializing back wall hotspots...');
      resetBackWallHotspots();
      setTimeout(() => {
        initBackWallHotspotsOnce();
      }, 100);
    }
  }, 250);
}

window.addEventListener('resize', function() {
  if (typeof handleBackWallResize === 'function') {
    handleBackWallResize();
  }
});