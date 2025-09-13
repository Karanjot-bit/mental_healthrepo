document.addEventListener('DOMContentLoaded', function() {
    
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const progressBars = document.querySelectorAll('.progress-fill');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(250, 204, 21, 0.2)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinksAll = document.querySelectorAll('.nav-links a, .explore-btn, .footer-links a');
    navLinksAll.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            }
        });
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate progress bars
                if (entry.target.classList.contains('progress-fill')) {
                    const width = entry.target.getAttribute('data-width');
                    setTimeout(() => {
                        entry.target.style.width = width + '%';
                    }, 500);
                }
                
                // Stagger card animations
                if (entry.target.classList.contains('planet-card') || 
                    entry.target.classList.contains('content-card') ||
                    entry.target.classList.contains('fact-card')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.planet-card, .content-card, .fact-card, .timeline-item, .progress-fill');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Planet card hover effects with sound simulation
    const planetCards = document.querySelectorAll('.planet-card');
    planetCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.planet-icon');
            icon.style.transform = 'scale(1.3) rotate(15deg)';
            
            // Add glow effect
            this.style.boxShadow = '0 20px 50px rgba(76, 29, 149, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.planet-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
        });
        
        // Click to show planet info
        card.addEventListener('click', function() {
            const planetName = this.querySelector('h3').textContent;
            showPlanetModal(planetName, this);
        });
    });
    
    // Fact cards interactive effects
    const factCards = document.querySelectorAll('.fact-card');
    factCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) rotate(3deg) scale(1.05)';
            
            // Add particle effect
            createParticles(this);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg) scale(1)';
        });
    });
    
    // Timeline items animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.timeline-icon');
            icon.style.transform = 'scale(1.2)';
            icon.style.boxShadow = '0 0 30px rgba(250, 204, 21, 0.5)';
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.timeline-icon');
            icon.style.transform = 'scale(1)';
            icon.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
        });
    });
    
    // Section highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Dynamic star creation
    function createDynamicStars() {
        const starsContainer = document.querySelector('.stars-bg');
        
        setInterval(() => {
            if (starsContainer.children.length < 20) {
                const star = document.createElement('div');
                star.className = 'star dynamic-star';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.width = Math.random() * 3 + 1 + 'px';
                star.style.height = star.style.width;
                star.style.animationDelay = Math.random() * 3 + 's';
                
                starsContainer.appendChild(star);
                
                // Remove star after animation
                setTimeout(() => {
                    if (star.parentNode) {
                        star.remove();
                    }
                }, 5000);
            }
        }, 2000);
    }
    
    // Particle effect for fact cards
    function createParticles(element) {
        const rect = element.getBoundingClientRect();
        
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.position = 'fixed';
            particle.style.left = rect.left + Math.random() * rect.width + 'px';
            particle.style.top = rect.top + Math.random() * rect.height + 'px';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = '#FACC15';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            particle.style.animation = 'particle-float 1s ease-out forwards';
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                }
            }, 1000);
        }
    }
    
    // Planet modal functionality
    function showPlanetModal(planetName, card) {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.className = 'planet-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${planetName}</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>Detailed information about ${planetName} would go here...</p>
                    <div class="modal-stats">
                        <div class="modal-stat">
                            <span class="stat-label">Distance from Sun:</span>
                            <span class="stat-value">${card.querySelector('.distance').textContent}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    // Initialize progress bars
    progressBars.forEach(bar => {
        bar.style.width = '0%';
    });
    
    // Initialize dynamic stars
    createDynamicStars();
    
    // Page load animations
    window.addEventListener('load', function() {
        // Animate header elements
        const headerElements = document.querySelectorAll('.space-icon, .header h1, .header p, .explore-btn');
        headerElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 300);
        });
    });
    
    // Initialize header elements for animation
    const headerElements = document.querySelectorAll('.space-icon, .header h1, .header p, .explore-btn');
    headerElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease';
    });
    
    // Add CSS for additional animations
    const additionalStyles = `
        .nav-links.active {
            display: flex;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(15, 23, 42, 0.98);
            flex-direction: column;
            padding: 20px;
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(250, 204, 21, 0.2);
        }
        
        .nav-links a.active {
            background: rgba(250, 204, 21, 0.2);
            color: #FACC15;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        .dynamic-star {
            animation: star-fall 5s linear forwards;
        }
        
        @keyframes star-fall {
            from {
                transform: translateY(-10px);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            to {
                transform: translateY(100vh);
                opacity: 0;
            }
        }
        
        @keyframes particle-float {
            from {
                transform: translateY(0) scale(1);
                opacity: 1;
            }
            to {
                transform: translateY(-50px) scale(0);
                opacity: 0;
            }
        }
        
        .planet-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: modal-fade-in 0.3s ease;
        }
        
        .modal-content {
            background: white;
            border-radius: 15px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            color: #374151;
            animation: modal-slide-up 0.3s ease;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            border-bottom: 2px solid #F3F4F6;
            padding-bottom: 1rem;
        }
        
        .modal-header h2 {
            color: #4C1D95;
            margin: 0;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 2rem;
            color: #6B7280;
            cursor: pointer;
            transition: color 0.3s ease;
        }
        
        .modal-close:hover {
            color: #4C1D95;
        }
        
        @keyframes modal-fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes modal-slide-up {
            from {
                transform: translateY(50px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        @media (max-width: 768px) {
            .nav-links.active {
                position: fixed;
                top: 70px;
                left: 0;
                right: 0;
                height: calc(100vh - 70px);
                justify-content: center;
                align-items: center;
                gap: 2rem;
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);
});
