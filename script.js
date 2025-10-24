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

// Scroll Progress Indicator with Scroll Limit
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');
  
  if (!progressBar) return;

  let isScrollLocked = false;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // Cap the progress at 100%
    const cappedPercent = Math.min(scrollPercent, 100);
    progressBar.style.width = cappedPercent + '%';

    // Add visual feedback when complete
    if (cappedPercent >= 100) {
      progressBar.classList.add('complete');
    } else {
      progressBar.classList.remove('complete');
    }

    // Lock scrolling when progress reaches 100%
    if (scrollPercent >= 100 && !isScrollLocked) {
      isScrollLocked = true;
      // Immediately scroll back to the maximum allowed position
      window.scrollTo({
        top: docHeight,
        behavior: 'smooth'
      });
    } else if (scrollPercent < 99) {
      isScrollLocked = false;
    }

    // Show/hide back to top button
    if (backToTopBtn) {
      if (scrollTop > 300) {
        backToTopBtn.classList.remove('hidden');
      } else {
        backToTopBtn.classList.add('hidden');
      }
    }
  });

  // Prevent wheel scrolling when at 100%
  window.addEventListener('wheel', (e) => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // Prevent scrolling down when at 100%
    if (scrollPercent >= 99 && e.deltaY > 0) {
      e.preventDefault();
      // Ensure we're exactly at the bottom
      window.scrollTo({
        top: docHeight,
        behavior: 'smooth'
      });
    }
  }, { passive: false });

  // Back to top functionality
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      isScrollLocked = false; // Allow scrolling when going back to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// Enhanced Animations and Interactions
function initAdvancedFeatures() {
  // Parallax effect for hero section
  const hero = document.querySelector('section');
  const crystal = document.querySelector('.data-crystal-container');
  
  if (hero && crystal) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      crystal.style.transform = `translateY(${rate}px)`;
    });
  }

  // Add typing effect to hero text
  const heroTitle = document.querySelector('h1');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '2px solid var(--accent-color)';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      } else {
        setTimeout(() => {
          heroTitle.style.borderRight = 'none';
        }, 1000);
      }
    };
    
    setTimeout(typeWriter, 1000);
  }
}

// Main initialization function
function initializePortfolio() {
  new PortfolioApp();
  handlePageLoad();
  initScrollProgress();
  initAdvancedFeatures();
  initTestimonialsToggle();
  initMobileMenu();
  
  // Initialize fade-in animations
  document.querySelectorAll('section').forEach((section, index) => {
    // Don't hide the first section (hero) to prevent black screen
    if (index === 0) {
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
      section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    } else {
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
      section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(section);
      
      // Fallback: Show sections after a delay if observer fails
      setTimeout(() => {
        if (section.style.opacity === '0') {
          section.style.opacity = '1';
          section.style.transform = 'translateY(0)';
        }
      }, 1000 + (index * 200));
    }
  });
  
  // Initialize advanced features
  if (typeof initAdvancedAnimations === 'function') initAdvancedAnimations();
  if (typeof initPerformanceMonitoring === 'function') initPerformanceMonitoring();
  if (typeof initKeyboardShortcuts === 'function') initKeyboardShortcuts();
  if (typeof initThemeSystem === 'function') initThemeSystem();
  if (typeof initErrorHandling === 'function') initErrorHandling();
  
  // Initialize particle system for larger screens
  if (window.innerWidth > 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    if (typeof ParticleSystem === 'function') {
      new ParticleSystem();
    }
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePortfolio);

// Simple fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Fade-in animations are now handled in main initialization

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
  
  if (!showMoreBtn || !container) {
    console.log('Testimonials elements not found');
    return;
  }
  
  let showingAll = false;
  
  showMoreBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (showingAll) {
      // Hide additional testimonials
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
    
    console.log('Testimonials toggle - showing all:', showingAll);
    console.log('Container classes:', container.className);
  });
}

// Testimonials initialization is now handled in main initialization

// Mobile Menu Functionality
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (!mobileMenuBtn || !mobileMenu) return;
  
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('show');
  });
  
  // Close menu when clicking on a link
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      mobileMenu.classList.remove('show');
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenuBtn.classList.remove('active');
      mobileMenu.classList.remove('show');
    }
  });
}

// Mobile menu initialization is now handled in main initialization

// Particle System for Background Effect
class ParticleSystem {
  constructor() {
    this.particles = [];
    this.maxParticles = 50;
    this.init();
  }

  init() {
    this.createParticles();
    this.animate();
  }

  createParticles() {
    for (let i = 0; i < this.maxParticles; i++) {
      this.createParticle();
    }
  }

  createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
    document.body.appendChild(particle);
    
    this.particles.push(particle);
    
    // Remove particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
      const index = this.particles.indexOf(particle);
      if (index > -1) {
        this.particles.splice(index, 1);
      }
    }, 25000);
  }

  animate() {
    // Create new particles periodically
    setInterval(() => {
      if (this.particles.length < this.maxParticles) {
        this.createParticle();
      }
    }, 2000);
  }
}

// Enhanced Intersection Observer for Animations
function initAdvancedAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        
        // Special handling for different elements
        if (entry.target.classList.contains('skill-tag')) {
          entry.target.style.animationPlayState = 'running';
        }
        
        if (entry.target.classList.contains('timeline-item')) {
          entry.target.style.animationPlayState = 'running';
        }
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll('.skill-tag, .timeline-item, .project-card, .testimonial-card, .education-card').forEach(el => {
    el.style.animationPlayState = 'paused';
    animationObserver.observe(el);
  });
}

// Performance Monitoring
function initPerformanceMonitoring() {
  // Monitor page load performance
  window.addEventListener('load', () => {
    const perfData = performance.getEntriesByType('navigation')[0];
    console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
    
    // Log Core Web Vitals if available
    if ('web-vital' in window) {
      // This would integrate with web-vitals library if included
    }
  });
}

// Keyboard Shortcuts
function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Alt + H: Go to home/top
    if (e.altKey && e.key === 'h') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Alt + P: Go to projects
    if (e.altKey && e.key === 'p') {
      e.preventDefault();
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Alt + C: Go to contact
    if (e.altKey && e.key === 'c') {
      e.preventDefault();
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Alt + A: Go to about
    if (e.altKey && e.key === 'a') {
      e.preventDefault();
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// Theme Persistence (for future dark/light mode toggle)
function initThemeSystem() {
  // Check for saved theme preference or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
}

// Enhanced Error Handling
function initErrorHandling() {
  window.addEventListener('error', (e) => {
    console.error('Portfolio Error:', e.error);
    // Could send to analytics service in production
  });

  window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
    // Could send to analytics service in production
  });
}

// Advanced features initialization is now handled in main initialization

// Service Worker Registration (for future PWA features)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // navigator.serviceWorker.register('/sw.js')
    //   .then(registration => console.log('SW registered'))
    //   .catch(error => console.log('SW registration failed'));
  });
}

