/**
 * Portfolio Express — Begoña García
 * Interactividad principal: menú móvil, navegación activa, modal de contacto y vista rápida de proyectos
 */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('site-header');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinksContainer = document.getElementById('nav-links');
  const navLinks = document.querySelectorAll('.nav-link');
  const contactBtn = document.getElementById('btn-contactar');
  const contactModal = document.getElementById('contact-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const modalTitle = document.getElementById('modal-title');
  const messageInput = document.getElementById('sender-message');
  const projectButtons = document.querySelectorAll('.project-link-btn');
  const yearSpan = document.getElementById('current-year');

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 1. Sombra en la cabecera al hacer scroll
  const handleScroll = () => {
    if (window.scrollY > 12) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Menú desplegable para móvil
  if (mobileMenuBtn && navLinksContainer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = navLinksContainer.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Apertura y cierre del modal de contacto
  const openModal = (customTitle, prefilledMessage = '') => {
    if (!contactModal) return;
    modalTitle.textContent = customTitle || 'Contactar con Begoña García';
    if (prefilledMessage && messageInput) {
      messageInput.value = prefilledMessage;
    }
    formStatus.classList.remove('visible');
    contactModal.classList.add('open');
    contactModal.setAttribute('aria-hidden', 'false');
  };

  const closeModal = () => {
    if (!contactModal) return;
    contactModal.classList.remove('open');
    contactModal.setAttribute('aria-hidden', 'true');
  };

  if (contactBtn) {
    contactBtn.addEventListener('click', () => {
      openModal('Contactar con Begoña García', '');
    });
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (contactModal) {
    contactModal.addEventListener('click', (event) => {
      if (event.target === contactModal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && contactModal?.classList.contains('open')) {
      closeModal();
    }
  });

  // 4. Botones "Ver detalles" en las 3 tarjetas de proyectos
  projectButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const title = button.getAttribute('data-project-title') || 'Proyecto';
      const detail = button.getAttribute('data-project-detail') || '';
      openModal(
        `Proyecto: ${title}`,
        `Hola Begoña, me gustaría conocer más sobre "${title}". (${detail})`
      );
    });
  });

  // 5. Envío simulado del formulario de contacto
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const nameValue = document.getElementById('sender-name')?.value.trim() || 'visitante';
      formStatus.textContent = `¡Gracias, ${nameValue}! Tu mensaje ha sido enviado correctamente.`;
      formStatus.classList.add('visible');
      contactForm.reset();

      setTimeout(() => {
        closeModal();
      }, 1800);
    });
  }
});
