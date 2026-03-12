// ─── SCROLL PROGRESS ───
const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    scrollProgress.style.width = ((scrollTop / docHeight) * 100) + '%';
});

// ─── MOBILE MENU ───
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const icon = mobileMenuBtn.querySelector('i');
    icon.className = mobileMenu.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
    });
});

// ─── SMOOTH SCROLL ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 64,
                behavior: 'smooth'
            });
        }
    });
});

// ─── INTERSECTION OBSERVER (REVEAL) ───
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    revealObserver.observe(el);
});

// ─── SKILL BARS ANIMATION ───
const skillBarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
                const targetWidth = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, 100);
            });
            skillBarObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-card').forEach(card => {
    skillBarObserver.observe(card);
});

// ─── TYPING CURSOR IN HERO TAG ───
// Already handled via CSS ::after pseudo-element with blink animation

// ─── CONTACT FORM ───
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const original = submitBtn.textContent;
        submitBtn.textContent = 'Transmission en cours...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.6';

        setTimeout(() => {
            submitBtn.textContent = '// Message envoyé !';
            submitBtn.style.borderColor = 'var(--green)';
            submitBtn.style.color = 'var(--green)';
            submitBtn.style.opacity = '1';

            setTimeout(() => {
                submitBtn.textContent = original;
                submitBtn.disabled = false;
                submitBtn.style.borderColor = '';
                submitBtn.style.color = '';
                this.reset();
            }, 2500);
        }, 1500);
    });
}

// ─── NAV ACTIVE LINK HIGHLIGHT ON SCROLL ───
const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
const sections = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === '#' + entry.target.id) {
                    link.style.color = 'var(--cyan)';
                }
            });
        }
    });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));

// ─── MOUSE PARALLAX ON HERO DECO ───
const heroDeco1 = document.querySelector('.hero-deco-1');
const heroDeco2 = document.querySelector('.hero-deco-2');

document.addEventListener('mousemove', (e) => {
    if (!heroDeco1 || !heroDeco2) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    heroDeco1.style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.5}deg)`;
    heroDeco2.style.transform = `translate(${-x * 0.7}px, ${-y * 0.7}px) rotate(${-x * 0.3}deg)`;
});

// ─── CURSOR GLOW (subtle) ───
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(ellipse, rgba(0,245,255,0.035) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9997;
    transform: translate(-50%, -50%);
    transition: left 0.15s, top 0.15s;
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});
