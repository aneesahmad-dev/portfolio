// Portfolio Interactive Features
class PortfolioApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupContactForm();
    this.setupSmoothScrolling();
    this.setupKeyboardNavigation();
  }

  setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    const messageStatus = document.getElementById('message-status');

    if (!contactForm || !messageStatus) return;

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleFormSubmission(messageStatus, contactForm);
    });
  }

  async handleFormSubmission(messageStatus, form) {
    messageStatus.classList.remove('hidden', 'text-red-400', 'text-green-400');
    messageStatus.textContent = 'Sending message...';
    messageStatus.classList.remove('hidden');
    
    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        this.showSuccessMessage(messageStatus, form);
      } else {
        this.showErrorMessage(messageStatus);
      }
    } catch (error) {
      this.showErrorMessage(messageStatus);
    }
  }

  showSuccessMessage(messageStatus, form) {
    messageStatus.textContent = 'Thank you! Your message has been sent successfully. I will get back to you soon.';
    messageStatus.classList.add('text-green-400');
    form.reset();
  }

  showErrorMessage(messageStatus) {
    messageStatus.textContent = 'Sorry, there was an error sending your message. Please try again.';
    messageStatus.classList.add('text-red-400');
  }

  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  setupKeyboardNavigation() {
    // Enhanced keyboard navigation for accessibility
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        // Close any open modals or reset form status
        const messageStatus = document.getElementById('message-status');
        if (messageStatus && !messageStatus.classList.contains('hidden')) {
          messageStatus.classList.add('hidden');
        }
      }
    });
  }
}

// Loading Screen Management
function handlePageLoad() {
  const loadingOverlay = document.getElementById('loading-overlay');
  
  // Hide loading screen when page is fully loaded
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (loadingOverlay) {
        loadingOverlay.classList.add('hidden');
      }
    }, 500); // Small delay to ensure smooth transition
  });
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
  handlePageLoad();
});

// Simple fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Initialize fade-in animations
document.addEventListener('DOMContentLoaded', () => {
  // Set initial state for sections
  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
});

// Testimonials Functionality
window.toggleTestimonial = function(testimonialId) {
  const card = document.querySelector(`[data-testimonial="${testimonialId}"]`);
  const preview = card.querySelector('.testimonial-preview');
  const full = card.querySelector('.testimonial-full');
  const button = card.querySelector('.see-more-btn');
  
  if (full.classList.contains('visible')) {
    // Show less
    full.classList.remove('visible');
    preview.classList.remove('hidden');
    button.textContent = 'See More';
  } else {
    // Show more
    full.classList.add('visible');
    preview.classList.add('hidden');
    button.textContent = 'See Less';
  }
}

// Show/Hide All Testimonials
function initTestimonialsToggle() {
  const showMoreBtn = document.getElementById('show-more-testimonials');
  const container = document.querySelector('.testimonials-container');
  
  if (!showMoreBtn || !container) return;
  
  let showingAll = false;
  
  showMoreBtn.addEventListener('click', () => {
    if (showingAll) {
      // Hide testimonials 3 and 4
      container.classList.remove('show-all');
      showMoreBtn.textContent = 'Show All Testimonials';
      showingAll = false;
      
      // Scroll to testimonials section
      document.getElementById('testimonials').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // Show all testimonials
      container.classList.add('show-all');
      showMoreBtn.textContent = 'Show Less Testimonials';
      showingAll = true;
    }
  });
}

// Initialize testimonials functionality
document.addEventListener('DOMContentLoaded', () => {
  initTestimonialsToggle();
});