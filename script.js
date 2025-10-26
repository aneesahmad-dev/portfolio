// Portfolio Interactive Features - optimized with element caching
class PortfolioApp {
  constructor() {
    // Cache DOM elements to avoid repeated queries
    this.elements = {
      contactForm: document.getElementById('contact-form'),
      messageStatus: document.getElementById('message-status'),
      smoothScrollLinks: document.querySelectorAll('a[href^="#"]')
    };
    
    this.init();
  }

  init() {
    this.setupContactForm();
    this.setupSmoothScrolling();
    this.setupKeyboardNavigation();
  }

  setupContactForm() {
    const { contactForm, messageStatus } = this.elements;

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
    this.elements.smoothScrollLinks.forEach(anchor => {
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

// Optimized Scroll Progress Indicator with throttling
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');
  
  if (!progressBar) return;

  let isScrollLocked = false;
  let ticking = false;

  const updateScrollProgress = () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // Cap the progress at 100%
    const cappedPercent = Math.min(scrollPercent, 100);
    
    // Batch DOM updates
    requestAnimationFrame(() => {
      progressBar.style.width = cappedPercent + '%';

      // Add visual feedback when complete
      if (cappedPercent >= 100) {
        progressBar.classList.add('complete');
      } else {
        progressBar.classList.remove('complete');
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

    // Lock scrolling when progress reaches 100%
    if (scrollPercent >= 100 && !isScrollLocked) {
      isScrollLocked = true;
      window.scrollTo({
        top: docHeight,
        behavior: 'smooth'
      });
    } else if (scrollPercent < 99) {
      isScrollLocked = false;
    }
    
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollProgress);
      ticking = true;
    }
  }, { passive: true });

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

// Enhanced Animations and Interactions - optimized for performance
function initAdvancedFeatures() {
  // Throttled parallax effect
  const hero = document.querySelector('section');
  const crystal = document.querySelector('.data-crystal-container');
  
  if (hero && crystal) {
    let ticking = false;
    
    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      crystal.style.transform = `translateY(${rate}px)`;
      ticking = false;
    };
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    });
  }

  // Non-blocking typewriter effect
  const heroTitle = document.querySelector('h1');
  if (heroTitle && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '2px solid var(--accent-color)';
    
    let i = 0;
    
    const typeWriter = async () => {
      while (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        
        // Yield to browser every few characters
        if (i % 3 === 0) {
          await new Promise(resolve => setTimeout(resolve, 50));
        }
      }
      
      setTimeout(() => {
        heroTitle.style.borderRight = 'none';
      }, 1000);
    };
    
    // Start after a delay
    setTimeout(typeWriter, 1500);
  }
}

// Critical initialization - runs immediately
function initCritical() {
  // Only essential features for first paint
  initMobileMenu();
  handlePageLoad();
  initScrollProgress();
  
  // Show hero section immediately
  const heroSection = document.querySelector('section');
  if (heroSection) {
    heroSection.style.opacity = '1';
    heroSection.style.transform = 'translateY(0)';
    heroSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  }
}

// Non-critical initialization - deferred
function initEnhancements() {
  return new Promise((resolve) => {
    // Split into smaller chunks to avoid long tasks
    const tasks = [
      () => new PortfolioApp(),
      () => initTestimonialsToggle(),
      () => initAchievementGallery(),
      () => initFadeInAnimations(),
      () => initAdvancedFeatures()
    ];
    
    let taskIndex = 0;
    
    function runNextTask() {
      if (taskIndex >= tasks.length) {
        resolve();
        return;
      }
      
      try {
        tasks[taskIndex]();
      } catch (error) {
        console.error('Task failed:', error);
      }
      
      taskIndex++;
      
      // Yield to browser between tasks
      if (taskIndex < tasks.length) {
        setTimeout(runNextTask, 0);
      } else {
        resolve();
      }
    }
    
    runNextTask();
  });
}

// Fade-in animations separated
function initFadeInAnimations() {
  document.querySelectorAll('section').forEach((section, index) => {
    if (index === 0) return; // Skip hero section
    
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
    
    // Fallback with staggered timing
    setTimeout(() => {
      if (section.style.opacity === '0') {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      }
    }, 500 + (index * 100));
  });
}

// Advanced features - lowest priority
function initAdvancedFeatures() {
  // Use requestIdleCallback if available
  const runAdvanced = () => {
    if (typeof initAdvancedAnimations === 'function') initAdvancedAnimations();
    if (typeof initPerformanceMonitoring === 'function') initPerformanceMonitoring();
    if (typeof initKeyboardShortcuts === 'function') initKeyboardShortcuts();
    if (typeof initThemeSystem === 'function') initThemeSystem();
    if (typeof initErrorHandling === 'function') initErrorHandling();
    
    // Particle system only for large screens and no reduced motion
    if (window.innerWidth > 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (typeof ParticleSystem === 'function') {
        setTimeout(() => new ParticleSystem(), 1000);
      }
    }
  };
  
  if ('requestIdleCallback' in window) {
    requestIdleCallback(runAdvanced, { timeout: 2000 });
  } else {
    setTimeout(runAdvanced, 1000);
  }
}

// Main initialization
document.addEventListener('DOMContentLoaded', initCritical);

// Enhanced initialization after load
window.addEventListener('load', () => {
  // Use requestIdleCallback for non-critical features
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      initEnhancements().then(() => {
        console.log('Portfolio fully initialized');
      });
    }, { timeout: 1000 });
  } else {
    setTimeout(() => {
      initEnhancements().then(() => {
        console.log('Portfolio fully initialized');
      });
    }, 100);
  }
});

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

// Optimized Particle System - reduced resource usage
class ParticleSystem {
  constructor() {
    this.particles = [];
    this.maxParticles = 20; // Reduced from 50
    this.isVisible = true;
    this.init();
  }

  init() {
    // Check if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    
    // Use document fragment for better performance
    this.createInitialParticles();
    this.setupVisibilityHandling();
    this.animate();
  }

  createInitialParticles() {
    const fragment = document.createDocumentFragment();
    
    for (let i = 0; i < this.maxParticles; i++) {
      const particle = this.createParticle();
      fragment.appendChild(particle);
    }
    
    document.body.appendChild(fragment);
  }

  createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
    
    this.particles.push(particle);
    
    // Clean up after animation
    setTimeout(() => {
      this.removeParticle(particle);
    }, 25000);
    
    return particle;
  }

  removeParticle(particle) {
    if (particle.parentNode) {
      particle.parentNode.removeChild(particle);
    }
    const index = this.particles.indexOf(particle);
    if (index > -1) {
      this.particles.splice(index, 1);
    }
  }

  setupVisibilityHandling() {
    // Pause particles when tab is not visible
    document.addEventListener('visibilitychange', () => {
      this.isVisible = !document.hidden;
      this.particles.forEach(particle => {
        particle.style.animationPlayState = this.isVisible ? 'running' : 'paused';
      });
    });
  }

  animate() {
    // Reduced frequency - create new particles less often
    setInterval(() => {
      if (this.isVisible && this.particles.length < this.maxParticles) {
        const particle = this.createParticle();
        document.body.appendChild(particle);
      }
    }, 4000); // Increased from 2000ms
  }
}

// Enhanced Intersection Observer for Animations - optimized
function initAdvancedAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const animationObserver = new IntersectionObserver((entries) => {
    // Batch DOM updates
    const updates = [];
    
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        updates.push(() => {
          entry.target.classList.add('animate-in');
          
          // Use CSS classes instead of direct style manipulation
          if (entry.target.classList.contains('skill-tag')) {
            entry.target.classList.add('animation-running');
          }
          
          if (entry.target.classList.contains('timeline-item')) {
            entry.target.classList.add('animation-running');
          }
        });
      }
    });
    
    // Apply all updates in one frame
    if (updates.length > 0) {
      requestAnimationFrame(() => {
        updates.forEach(update => update());
      });
    }
  }, observerOptions);

  // Batch element observation
  requestAnimationFrame(() => {
    const elements = document.querySelectorAll('.skill-tag, .timeline-item, .project-card, .testimonial-card, .education-card');
    elements.forEach(el => {
      el.classList.add('animation-paused');
      animationObserver.observe(el);
    });
  });
}

// Enhanced Performance Monitoring
function initPerformanceMonitoring() {
  // Monitor page load performance
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType('navigation')[0];
      const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
      const domContentLoaded = perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart;
      const firstPaint = performance.getEntriesByType('paint').find(entry => entry.name === 'first-paint');
      const firstContentfulPaint = performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint');
      
      console.group('🚀 Portfolio Performance Metrics');
      console.log('📊 Page Load Time:', loadTime.toFixed(2), 'ms');
      console.log('📊 DOM Content Loaded:', domContentLoaded.toFixed(2), 'ms');
      if (firstPaint) console.log('🎨 First Paint:', firstPaint.startTime.toFixed(2), 'ms');
      if (firstContentfulPaint) console.log('🎨 First Contentful Paint:', firstContentfulPaint.startTime.toFixed(2), 'ms');
      
      // Monitor long tasks (potential TBT contributors)
      if ('PerformanceObserver' in window) {
        const longTaskObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.duration > 50) {
              console.warn('⚠️ Long Task detected:', entry.duration.toFixed(2), 'ms');
            }
          });
        });
        
        try {
          longTaskObserver.observe({ entryTypes: ['longtask'] });
        } catch (e) {
          console.log('Long task monitoring not supported');
        }
      }
      
      console.groupEnd();
    }, 1000);
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


// Archive Drawer Gallery
function initAchievementGallery() {
  const photos = document.querySelectorAll('.terminal-photo');
  const viewer = document.getElementById('photo-viewer');
  const viewerImage = document.getElementById('viewer-image');
  const viewerTitle = document.getElementById('viewer-title');
  const viewerDescription = document.getElementById('viewer-description');
  const documentNumber = document.getElementById('document-number');
  const archiveDate = document.getElementById('archive-date');
  const viewerClose = document.querySelector('.archive-close');
  
  if (!viewer) return;
  
  const achievements = {
    'techtronix-cert': {
      title: 'TECHTRONIX 2022 - 1st Place Certificate',
      description: 'First place winner in National Level Speed Programming Competition at Wah University. Competed against top programmers from across Pakistan and secured victory through exceptional coding speed and accuracy.',
      src: 'assets/techtronix_certificate.png',
      docNumber: 'DOCUMENT NO. 22-A',
      archiveYear: 'ARCHIVED 2022'
    },
    'techtronix-group': {
      title: 'TECHTRONIX Victory Group Photo',
      description: 'Celebrating the victory moment at TECHTRONIX 2022 National Level Competition. This achievement led to university recognition and opened doors for future opportunities in competitive programming.',
      src: 'assets/techtronix_group_photo.jpeg',
      docNumber: 'PHOTOGRAPH 22-B',
      archiveYear: 'ARCHIVED 2022'
    },
    'president-cert': {
      title: 'University President Recognition Certificate',
      description: 'Special recognition certificate from the University President for representing MUST at national level and bringing honor to the institution through the TECHTRONIX victory.',
      src: 'assets/ajk_presdient_cert.jpeg',
      docNumber: 'CERTIFICATE 22-C',
      archiveYear: 'ARCHIVED 2022'
    },
    'pec-funding': {
      title: 'PEC Funding Receipt Ceremony',
      description: 'Receiving funding amount from Pakistan Engineering Council representative for our innovative Final Year Project. Our project was selected among hundreds of submissions for its practical applications and technical excellence.',
      src: 'assets/pec_funding_amount_rec_photo.png',
      docNumber: 'PHOTOGRAPH 24-A',
      archiveYear: 'ARCHIVED 2024'
    },
    'stanford-2024': {
      title: 'Stanford Code in Place 2024 Certificate',
      description: 'First year as Section Leader for Stanford University\'s CS106A programming course. Successfully mentored students through comprehensive Python curriculum and programming fundamentals.',
      src: 'assets/CIP24.png',
      docNumber: 'STANFORD DOC 24-B',
      archiveYear: 'ARCHIVED 2024'
    },
    'stanford-2025': {
      title: 'Stanford Code in Place 2025 Certificate',
      description: 'Second consecutive year as Section Leader for Stanford\'s prestigious Code in Place program. Continued excellence in mentoring 30+ students in programming best practices and problem-solving.',
      src: 'assets/CIP25.png',
      docNumber: 'STANFORD DOC 25-A',
      archiveYear: 'ARCHIVED 2025'
    },
    'gdsc-lead': {
      title: 'GDSC Technical Lead Certificate',
      description: 'Served as Technical Lead for Google Developer Student Clubs at MUST from 2022-2024. Led technical workshops, organized coding events, and mentored fellow students in mobile development and modern technologies.',
      src: 'assets/gdsc_tech_lead_cert.png',
      docNumber: 'GOOGLE DOC 23-A',
      archiveYear: 'ARCHIVED 2023'
    },
    'pec-fyp': {
      title: 'PEC Funded Final Year Project Certificate',
      description: 'Final Year Project funded by Pakistan Engineering Council for its innovation and practical industry applications. The project demonstrated advanced software engineering principles and real-world problem solving.',
      src: 'assets/pec_funded_fyp.jpeg',
      docNumber: 'PEC RECORD 24-C',
      archiveYear: 'ARCHIVED 2024'
    },
    'confiniti': {
      title: 'Confiniti MUST Technical Excellence',
      description: 'Recognition for outstanding technical performance and innovation at Mirpur University of Science & Technology. Demonstrated exceptional skills in software development and system design.',
      src: 'assets/confiniti_must.png',
      docNumber: 'MUST DOC 23-B',
      archiveYear: 'ARCHIVED 2023'
    },
    'president-appreciation': {
      title: 'Presidential Appreciation Certificate - AJK',
      description: 'Special appreciation certificate from the President of Azad Jammu & Kashmir for exceptional academic performance and bringing honor to the region through national level achievements.',
      src: 'assets/cert_of_appreciation_president_AJK.png',
      docNumber: 'AJK RECORD 24-D',
      archiveYear: 'ARCHIVED 2024'
    }
  };
  
  photos.forEach(photo => {
    photo.addEventListener('click', (e) => {
      e.preventDefault();
      
      const achievementId = photo.getAttribute('data-achievement');
      const achievement = achievements[achievementId];
      
      if (!achievement) return;
      
      viewerTitle.textContent = achievement.title;
      viewerDescription.textContent = achievement.description;
      viewerImage.src = achievement.src;
      viewerImage.alt = achievement.title;
      documentNumber.textContent = achievement.docNumber;
      archiveDate.textContent = achievement.archiveYear;
      
      viewer.classList.remove('hidden');
      document.body.classList.add('modal-open');
    });
  });
  
  // Close viewer
  function closeViewer() {
    viewer.classList.add('hidden');
    document.body.classList.remove('modal-open');
    viewerImage.src = '';
  }
  
  // Close on button click
  if (viewerClose) viewerClose.addEventListener('click', closeViewer);
  

  
  // Close when clicking outside the content
  if (viewer) {
    viewer.addEventListener('click', (e) => {
      if (e.target === viewer) {
        closeViewer();
      }
    });
  }
  
  // Prevent closing when clicking inside the drawer content
  const drawerContent = document.querySelector('.drawer-content');
  if (drawerContent) {
    drawerContent.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }
  
  // Add swipe down to close on mobile
  let startY = 0;
  let currentY = 0;
  let isDragging = false;
  
  if (drawerContent) {
    drawerContent.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
      isDragging = true;
    });
    
    drawerContent.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      currentY = e.touches[0].clientY;
      const deltaY = currentY - startY;
      
      // Only allow swipe down when at top of scroll
      if (drawerContent.scrollTop === 0 && deltaY > 0) {
        e.preventDefault();
        const progress = Math.min(deltaY / 200, 1);
        drawerContent.style.transform = `translateY(${deltaY * 0.5}px)`;
        drawerContent.style.opacity = 1 - progress * 0.3;
      }
    });
    
    drawerContent.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      isDragging = false;
      
      const deltaY = currentY - startY;
      
      if (deltaY > 100) {
        // Swipe down threshold reached - close drawer
        closeViewer();
      } else {
        // Snap back
        drawerContent.style.transform = '';
        drawerContent.style.opacity = '';
      }
    });
  }
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !viewer.classList.contains('hidden')) {
      closeViewer();
    }
  });
}