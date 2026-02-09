// Smooth scroll functionality
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navMenu.classList.remove('active');
        }
    });
});

// Navigation scroll effect
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Mobile navigation toggle logic removed as per new dropdown design
// const navToggle = document.querySelector('.nav-toggle');
// const navMenu = document.querySelector('.nav-menu');

// if (navToggle) {
//     navToggle.addEventListener('click', () => {
//         navMenu.classList.toggle('active');
//         navToggle.classList.toggle('active');
//     });
// }

// Close mobile menu when clicking nav links
// document.querySelectorAll('.nav-link').forEach(link => {
//     link.addEventListener('click', () => {
//         navMenu.classList.remove('active');
//         if (navToggle) navToggle.classList.remove('active');
//     });
// });

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavLink() {
    let scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in to elements
document.querySelectorAll('.skill-category, .project-card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Contact form handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Construct mailto link
    // Note: We use window.location.href or a hidden link click to open the mail client
    const mailtoLink = `mailto:abhinandan.a1010@gmail.com?subject=${encodeURIComponent('[Portfolio Contact] ' + subject)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message)}`;

    // Open email client
    window.location.href = mailtoLink;

    // Show feedback
    const submitBtn = contactForm.querySelector('.btn-primary');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Opening Email Client...';
    submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

    // Reset form
    contactForm.reset();

    // Reset button after 3 seconds
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
    }, 3000);
});

// Parallax effect for home background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const homeBackground = document.querySelector('.home-background');
    if (homeBackground) {
        homeBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add typing effect to home title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
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

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add cursor glow effect (optional premium feature)
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(20, 184, 166, 0.15) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.2s ease;
    display: none;
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX - 10 + 'px';
    cursorGlow.style.top = e.clientY - 10 + 'px';
    cursorGlow.style.display = 'block';
});

// Hide cursor glow on mobile
if (window.innerWidth <= 768) {
    cursorGlow.style.display = 'none';
}

// Dynamic year in footer
const footer = document.querySelector('.footer p');
if (footer) {
    const currentYear = new Date().getFullYear();
    footer.innerHTML = footer.innerHTML.replace('2026', currentYear);
}

// ===== Advanced Particle Background System =====
class ParticleSystem {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }

    init() {
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            opacity: 0.6;
        `;
        document.querySelector('.home-section').appendChild(this.canvas);

        this.resize();
        this.createParticles();
        this.animate();

        window.addEventListener('resize', () => this.resize());
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 25000); // Fewer particles
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 1.5 + 0.5, // Smaller particles
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                color: this.getRandomColor()
            });
        }
    }

    getRandomColor() {
        // Only teal for minimalism
        const alpha = Math.random() * 0.2 + 0.1; // More transparent
        return `rgba(20, 184, 166, ${alpha})`;
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                particle.x -= dx / distance * 2;
                particle.y -= dy / distance * 2;
            }

            // Wrap around screen
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle system on load
window.addEventListener('load', () => {
    if (window.innerWidth > 768) { // Only on desktop
        new ParticleSystem();
    }
});

// ===== Animated Background Gradient =====
const homeBackground = document.querySelector('.home-background');
if (homeBackground) {
    homeBackground.style.backgroundSize = '400% 400%';
    homeBackground.style.animation = 'gradientShift 15s ease infinite';
}

// ===== Skill Tags Advanced Interaction =====
document.querySelectorAll('.skill-tag').forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.05}s`;

    tag.addEventListener('mouseenter', function () {
        this.style.animation = 'pulse 0.5s ease';
    });

    tag.addEventListener('animationend', function () {
        this.style.animation = '';
    });
});

// ===== Stat Counter Animation =====
function animateCounter(element, target) {
    let current = 0;
    const isFloat = !Number.isInteger(target);
    const suffix = element.getAttribute('data-suffix') || '';
    const increment = target / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = (isFloat ? target.toFixed(2) : target) + suffix;
            clearInterval(timer);
        } else {
            element.textContent = (isFloat ? current.toFixed(2) : Math.floor(current)) + suffix;
        }
    }, 30);
}

// Trigger counter animation when stat items are in view
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const number = entry.target.querySelector('.stat-number');
            const targetValue = parseFloat(number.textContent);
            if (!isNaN(targetValue)) {
                animateCounter(number, targetValue);
                statObserver.unobserve(entry.target);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(item => {
    statObserver.observe(item);
});

// ===== Project Cards 3D Tilt Effect =====
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ===== Skill Category Glow Effect =====
document.querySelectorAll('.skill-category').forEach((category, index) => {
    const glowColors = ['--shadow-glow', '--shadow-glow-sky', '--shadow-glow-mustard'];
    const glowColor = glowColors[index % glowColors.length];

    category.addEventListener('mouseenter', function () {
        this.style.boxShadow = `var(--shadow-xl), var(${glowColor})`;
    });
});

// ===== Smooth Color Transitions on Scroll =====
let scrollTimeout;
window.addEventListener('scroll', () => {
    document.body.style.setProperty('--scroll-progress', window.pageYOffset / (document.body.scrollHeight - window.innerHeight));

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // Add subtle effects based on scroll position
        const scrollPercent = window.pageYOffset / (document.body.scrollHeight - window.innerHeight);
        document.documentElement.style.setProperty('--dynamic-hue', scrollPercent * 20);
    }, 50);
});

