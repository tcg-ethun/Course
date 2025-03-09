// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Initialize Smooth Scrollbar
const initSmoothScrollbar = () => {
    gsap.set(document.documentElement, {
        scrollBehavior: 'smooth'
    });
};

// Navigation Animation with improved timing
const navAnimation = () => {
    gsap.from('.nav-logo, .nav-links li', {
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.1
    });
};

// Hero Section Animation with smoother transitions
const heroAnimation = () => {
    const codeWindow = document.querySelector('.laptop-screen pre code');
    const isMobile = window.innerWidth <= 768;
    
    // Only initialize if codeWindow exists and doesn't have content
    if (codeWindow && !codeWindow.hasAttribute('data-typed-initialized')) {
        const codeText = isMobile 
            ? `function learn() {
  const success = 
    dedication + 
    practice;
  return success;
}`
            : `function startLearning() {
    const dedication = true;
    const practice = setInterval(() => {
        code();
        learn();
        grow();
    }, 24 * 60 * 60 * 1000);
    
    return "Welcome to coding!";
}`;
        
        const heroTimeline = gsap.timeline({
            defaults: {
                ease: 'power3.out',
                duration: 0.8
            }
        });

        heroTimeline
            .from('.hero-content', {
                y: 30,
                opacity: 0,
                duration: 1,
                clearProps: 'all'
            })
            .from('.hero-content h1, .hero-content p', {
                y: 30,
                opacity: 0,
                stagger: 0.15,
                clearProps: 'all'
            }, '-=0.4')
            .from('.cta-buttons .btn', {
                y: 30,
                opacity: 0,
                stagger: 0.15,
                clearProps: 'all'
            }, '-=0.3')
            .from('.laptop-container', {
                y: 50,
                opacity: 0,
                duration: 1,
                clearProps: 'all',
                onComplete: () => {
                    if (!codeWindow.hasAttribute('data-typed-initialized')) {
                        const typed = new Typed(codeWindow, {
                            strings: [codeText],
                            typeSpeed: isMobile ? 40 : 30,
                            showCursor: true,
                            cursorChar: '|',
                            autoInsertCss: true,
                            onComplete: () => {
                                codeWindow.setAttribute('data-typed-initialized', 'true');
                            }
                        });
                    }
                }
            }, '-=0.6');

        // Smoother floating animation with reduced movement on mobile
        gsap.to('.laptop-container', {
            y: isMobile ? '+=8' : '+=12',
            duration: 2.5,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: 1
        });
    }
};

// Add window resize handler for responsive behavior
let resizeTimeout;
window.addEventListener('resize', () => {
    // Clear the timeout if it exists
    if (resizeTimeout) {
        clearTimeout(resizeTimeout);
    }
    
    // Set a new timeout
    resizeTimeout = setTimeout(() => {
        if (window.innerWidth <= 768) {
            // Only reset necessary styles, don't reinitialize animations
            gsap.set('.code-window', { clearProps: 'all' });
        }
    }, 250); // Wait for resize to finish
});

// Initialize Particles.js with optimized settings
const initParticles = () => {
    particlesJS('particles-js', {
        particles: {
            number: { value: 50, density: { enable: true, value_area: 1000 } },
            color: { value: '#4a90e2' },
            shape: { type: 'circle' },
            opacity: {
                value: 0.5,
                random: false
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#4a90e2',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 1.5,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'grab' },
                resize: true
            },
            modes: {
                grab: { distance: 140, line_linked: { opacity: 1 } }
            }
        },
        retina_detect: true
    });
};

// Enhanced Language Cards Animation with better performance
const languageCardsAnimation = () => {
    const cards = gsap.utils.toArray('.language-card');
    
    gsap.set(cards, { opacity: 0, y: 30 });
    
    ScrollTrigger.batch(cards, {
        start: 'top bottom-=100',
        onEnter: batch => {
            gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out',
                stagger: 0.1,
                clearProps: 'transform'
            });
        }
    });
};

// Resource Cards Animation with better performance
const resourceCardsAnimation = () => {
    const cards = gsap.utils.toArray('.resource-card');
    
    gsap.set(cards, { opacity: 0, y: 30 });
    
    ScrollTrigger.batch(cards, {
        start: 'top bottom-=100',
        onEnter: batch => {
            gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out',
                stagger: 0.1,
                clearProps: 'transform'
            });
        }
    });
};

// Smoother Scroll Progress Indicator
const initScrollProgress = () => {
    gsap.to('.scroll-progress', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.2
        }
    });
};

// Improved Mobile Menu Toggle
const initMobileMenu = () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    // Create overlay if it doesn't exist
    let overlay = document.querySelector('.nav-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        body.appendChild(overlay);
    }
    
    const closeMenu = () => {
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
    };
    
    const openMenu = () => {
        navLinks.classList.add('active');
        overlay.classList.add('active');
        body.style.overflow = 'hidden';
    };
    
    // Toggle menu on button click
    navToggle.addEventListener('click', (e) => {
        e.preventDefault();
        if (navLinks.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    // Close menu when clicking overlay
    overlay.addEventListener('click', closeMenu);
    
    // Handle link clicks
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            closeMenu();
            
            setTimeout(() => {
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }, 300);
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });
};

// Initialize all animations and functionality
document.addEventListener('DOMContentLoaded', () => {
    initSmoothScrollbar();
    navAnimation();
    heroAnimation();
    initParticles();
    languageCardsAnimation();
    resourceCardsAnimation();
    initScrollProgress();
    initMobileMenu();
}); 