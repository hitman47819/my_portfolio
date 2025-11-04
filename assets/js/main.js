// Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initThemeToggle();
    initMobileMenu();
    initScrollAnimations();
    initNavbarScroll();
    initSmoothScrolling();
    initContactForm();
    initActiveNavLink();
    initScrollToTop();
    initCertificateSlider();
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.classList.toggle('dark', currentTheme === 'dark');
    
    themeToggle.addEventListener('click', function() {
        const isDark = html.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Add animation effect
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    });
}

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('show');
        
        // Animate hamburger menu
        const icon = mobileMenuBtn.querySelector('i');
        if (mobileMenu.classList.contains('show')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('show');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileMenuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
            mobileMenu.classList.remove('show');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Enhanced Scroll Animations with Fade In/Out
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-in-left, .animate-slide-in-right, .animate-bounce-in');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            const element = entry.target;
            
            if (entry.isIntersecting) {
                // Fade in
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                element.classList.add('animated');
            } else {
                // Fade out (optional - remove if you don't want fade out)
                if (!element.classList.contains('no-fade-out')) {
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(30px)';
                }
            }
        });
    }, observerOptions);
    
    // Set initial state and observe elements
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        observer.observe(element);
    });
    
    // Add fade out behavior to sections when scrolling away
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            const section = entry.target;
            const animatedElements = section.querySelectorAll('.animate-fade-in, .animate-slide-in-left, .animate-slide-in-right, .animate-bounce-in');
            
            if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
                // Section has scrolled out of view from top
                animatedElements.forEach(element => {
                    if (!element.classList.contains('no-fade-out')) {
                        element.style.opacity = '0.3';
                        element.style.transform = 'translateY(-20px)';
                    }
                });
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Active Navigation Link
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll to Top Button
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.remove('opacity-0', 'invisible');
            scrollToTopBtn.classList.add('opacity-100', 'visible');
        } else {
            scrollToTopBtn.classList.add('opacity-0', 'invisible');
            scrollToTopBtn.classList.remove('opacity-100', 'visible');
        }
    });
    
    // Scroll to top when clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };

            if (!validateForm(data)) {
                return;
            }

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="loading"></span> Sending...';
            submitBtn.disabled = true;

            try {
                let ip = 'unknown';
                try {
                    const ipRes = await fetch('https://api.ipify.org?format=json');
                    const ipData = await ipRes.json();
                    ip = ipData.ip;
                } catch (err) {
                    console.warn('Failed to fetch IP:', err);
                }

                data.ip = ip;
                data.timestamp = new Date().toISOString();

                const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxHXFKcIpdYMPLYEV-_PYNwvBfP9rfvyvgp5WN0-eTCca9L6t_zb1OB57Hg8r_QNBLDNQ/exec';

                const response = await fetch(SCRIPT_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (result.status === 'success') {
                    showFormMessage('✅ Message sent successfully!', 'success');
                    form.reset();
                } else {
                    showFormMessage('⚠️ Error sending message. Please try again.', 'error');
                }
            } catch (error) {
                console.error('Submission failed:', error);
                showFormMessage('❌ Network error. Please try again later.', 'error');
            } finally {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;

                // Hide message after 5 seconds
                setTimeout(() => {
                    hideFormMessage();
                }, 5000);
            }
        });
    }
}


// Form Validation
function validateForm(data) {
    const formMessage = document.getElementById('form-message');
    
    if (!data.name || data.name.trim().length < 2) {
        showFormMessage('Please enter a valid name (at least 2 characters).', 'error');
        return false;
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return false;
    }
    
    if (!data.subject || data.subject.trim().length < 3) {
        showFormMessage('Please enter a subject (at least 3 characters).', 'error');
        return false;
    }
    
    if (!data.message || data.message.trim().length < 10) {
        showFormMessage('Please enter a message (at least 10 characters).', 'error');
        return false;
    }
    
    return true;
}

// Email Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show Form Message
function showFormMessage(message, type) {
    const formMessage = document.getElementById('form-message');
    formMessage.textContent = message;
    formMessage.className = `mt-4 text-center p-4 rounded-lg ${
        type === 'success' 
            ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300 success-message' 
            : 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-300 error-message'
    }`;
    formMessage.classList.remove('hidden');
}

// Hide Form Message
function hideFormMessage() {
    const formMessage = document.getElementById('form-message');
    formMessage.classList.add('hidden');
}

// Typing Animation for Hero Section
function initTypingAnimation() {
    const element = document.querySelector('.typing-text');
    if (element) {
        const text = element.getAttribute('data-text');
        let index = 0;
        
        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, 100);
            }
        }
        
        type();
    }
}

// Parallax Effect for Hero Section
function initParallaxEffect() {
    const heroSection = document.querySelector('#home');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = heroSection.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(function() {
    // Scroll-related functions are already debounced in their individual implementations
}, 10));

// Certificate Slider Functionality
function initCertificateSlider() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.certificate-slide');
    const totalSlides = slides.length;
    const navButtons = document.querySelectorAll('.certificate-nav-btn');
    const indicators = document.querySelectorAll('.certificate-indicator');
    const prevBtn = document.getElementById('prev-certificate');
    const nextBtn = document.getElementById('next-certificate');
    const container = document.getElementById('certificate-container');
    
    if (!container || totalSlides === 0) return;
    
    // Auto-play functionality
    let autoplayInterval;
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach((slide, i) => {
            slide.classList.remove('opacity-100', 'translate-x-0');
            slide.classList.add('opacity-0');
            
            if (i < index) {
                slide.classList.remove('translate-x-full');
                slide.classList.add('-translate-x-full');
            } else if (i > index) {
                slide.classList.remove('-translate-x-full');
                slide.classList.add('translate-x-full');
            } else {
                slide.classList.remove('-translate-x-full', 'translate-x-full');
                slide.classList.add('opacity-100', 'translate-x-0');
            }
        });
        
        // Update navigation buttons
        navButtons.forEach((btn, i) => {
            if (i === index) {
                btn.classList.add('bg-primary', 'text-white');
                btn.classList.remove('text-gray-700', 'dark:text-gray-300', 'hover:bg-gray-200', 'dark:hover:bg-gray-700');
            } else {
                btn.classList.remove('bg-primary', 'text-white');
                btn.classList.add('text-gray-700', 'dark:text-gray-300', 'hover:bg-gray-200', 'dark:hover:bg-gray-700');
            }
        });
        
        // Update indicators
        indicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.classList.add('bg-primary', 'w-8');
                indicator.classList.remove('bg-gray-300', 'dark:bg-gray-600', 'w-3');
            } else {
                indicator.classList.remove('bg-primary', 'w-8');
                indicator.classList.add('bg-gray-300', 'dark:bg-gray-600', 'w-3');
            }
        });
        
        currentSlide = index;
        
        // Restart autoplay
        resetAutoplay();
    }
    
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % totalSlides;
        showSlide(nextIndex);
    }
    
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prevIndex);
    }
    
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 10000); // Change slide every 10 seconds
    }
    
    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
        }
    }
    
    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }
    
    // Navigation button clicks
    navButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Arrow navigation
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            prevSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            nextSlide();
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide(); // Swipe left, go to next
            } else {
                prevSlide(); // Swipe right, go to previous
            }
        }
    }
const downloadPdfBtn = document.getElementById('downloadPdfBtn');
        if(downloadPdfBtn){
        downloadPdfBtn.addEventListener('click', ()=>{
            const link = document.createElement('a');
            link.href = 'assets/pdf/Mohamed_Ali.pdf';
            link.download = '';
            document.body.appendChild(link);
            link.click();
            link.remove();
        });
}
   
    // Pause autoplay on hover
    container.addEventListener('mouseenter', stopAutoplay);
    container.addEventListener('mouseleave', startAutoplay);
    
    // Pause autoplay when tab is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    });
    
    // Certificate zoom functionality
    const certificateImages = document.querySelectorAll('.zoom-certificate');
    certificateImages.forEach(img => {
        img.addEventListener('click', function() {
            // Create modal for full-size view
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 cursor-pointer';
            modal.innerHTML = `
                <div class="relative max-w-4xl max-h-full">
                    <img src="${this.src}" alt="${this.alt}" class="max-w-full max-h-full rounded-lg shadow-2xl">
                    <button class="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition-all">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Close modal on click
            modal.addEventListener('click', () => {
                document.body.removeChild(modal);
            });
            
            // Close on escape key
            const handleEscape = (e) => {
                if (e.key === 'Escape') {
                    document.body.removeChild(modal);
                    document.removeEventListener('keydown', handleEscape);
                }
            };
            document.addEventListener('keydown', handleEscape);
        });
    });
    
    // Start autoplay
    startAutoplay();
    
    // Add smooth scroll animation to certificates section
    const certificateSection = document.getElementById('certificates');
    if (certificateSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add entrance animation to certificate cards
                    const activeSlide = slides[currentSlide];
                    if (activeSlide) {
                        const card = activeSlide.querySelector('.bg-white, .dark\\:bg-gray-800');
                        if (card) {
                            card.style.animation = 'bounceIn 0.8s ease-out';
                        }
                    }
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(certificateSection);
    }
}
