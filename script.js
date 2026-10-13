/**
 * Portfolio Express - Patri Escudero (Maquilladora Profesional)
 * Script interactivo: Navegación, Modal de contacto y efectos de interfaz
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elementos de Navegación
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Elementos del Modal de Contacto
  const contactModal = document.getElementById('contact-modal');
  const modalClose = document.getElementById('modal-close');
  const btnContactar = document.getElementById('btn-contactar');
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');

  // --- 1. Sombra de la barra de navegación al hacer scroll ---
  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- 2. Menú móvil (Abrir / Cerrar) ---
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      const icon = navToggle.querySelector('i');
      if (icon) {
        if (isOpen) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Cerrar menú al hacer click en cualquier enlace de navegación
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          const icon = navToggle.querySelector('i');
          if (icon) {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
          }
        }
      });
    });
  }

  // --- 3. Resaltar enlace activo según la sección visible ---
  const sections = document.querySelectorAll('section[id]');
  const highlightNavLink = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      const correspondingLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);
      if (correspondingLink) {
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          correspondingLink.classList.add('active');
        } else {
          correspondingLink.classList.remove('active');
        }
      }
    });
  };

  window.addEventListener('scroll', highlightNavLink, { passive: true });

  // --- 4. Modal de Contacto ---
  const openModal = () => {
    contactModal.classList.add('active');
    contactModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Evitar scroll de fondo
    const firstInput = contactForm.querySelector('input');
    if (firstInput) firstInput.focus();
  };

  const closeModal = () => {
    contactModal.classList.remove('active');
    contactModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (btnContactar) {
    btnContactar.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  }

  // Enlaces de la cabecera o botones que lleven al contacto también abren el modal si tienen clase específica o click directo
  const navContactBtn = document.querySelector('.nav-btn');
  if (navContactBtn) {
    navContactBtn.addEventListener('click', (e) => {
      // Si la pantalla es grande o si se prefiere modal directo
      e.preventDefault();
      openModal();
    });
  }

  const heroContactBtn = document.querySelector('.hero-actions .btn-secondary');
  if (heroContactBtn) {
    heroContactBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  // Cerrar modal al hacer clic en el backdrop exterior
  if (contactModal) {
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) {
        closeModal();
      }
    });
  }

  // Cerrar modal con la tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactModal.classList.contains('active')) {
      closeModal();
    }
  });

  // --- 5. Envío del Formulario de Contacto y Toast ---
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameVal = document.getElementById('form-name').value.trim();
      const emailVal = document.getElementById('form-email').value.trim();

      // Feedback visual rápido
      closeModal();
      contactForm.reset();

      showToast(`¡Gracias, ${nameVal}! Tu mensaje ha sido recibido con éxito.`);
    });
  }

  // Función para mostrar Toast flotante
  function showToast(message) {
    if (!toast) return;

    if (toastText) {
      toastText.textContent = message;
    }

    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }
});
