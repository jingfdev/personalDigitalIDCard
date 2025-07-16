// Digital ID Card Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Add smooth animations to elements as they appear
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    const sections = document.querySelectorAll('.section');
    sections.forEach(function(section) {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Add click analytics for social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const platform = this.getAttribute('title');
            const url = this.getAttribute('href');
            
            // Log the click (you can replace this with your analytics)
            console.log('Social link clicked:', platform, url);
            
            // Add a subtle feedback animation
            this.style.transform = 'translateY(-2px) scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-2px) scale(1)';
            }, 150);
        });
    });

    // Add hover effects for better interaction
    const card = document.querySelector('.card');
    if (card) {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        });
    }

    // Add typing effect to the name (optional cool effect)
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const originalText = nameElement.textContent;
        let index = 0;
        
        // Only run typing effect on desktop
        if (window.innerWidth > 768) {
            nameElement.textContent = '';
            
            function typeText() {
                if (index < originalText.length) {
                    nameElement.textContent += originalText.charAt(index);
                    index++;
                    setTimeout(typeText, 100);
                }
            }
            
            // Start typing effect after a short delay
            setTimeout(typeText, 500);
        }
    }

    // Add ripple effect to social buttons
    socialLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Status dot animation enhancement
    const statusDot = document.querySelector('.status-dot');
    if (statusDot) {
        setInterval(function() {
            statusDot.style.transform = 'scale(1.2)';
            setTimeout(() => {
                statusDot.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    }

    // Add smooth scrolling for any internal links (if needed later)
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // Performance optimization: Reduce animations on slower devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.body.classList.add('reduced-motion');
    }
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .social-link {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(59, 130, 246, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .keyboard-navigation .social-link:focus {
        outline: 2px solid #3b82f6;
        outline-offset: 2px;
    }
    
    .reduced-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
`;
document.head.appendChild(style);