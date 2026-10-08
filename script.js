const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ─── STARFIELD ───
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];

function resizeStars() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round((window.innerWidth * window.innerHeight) / 6000);
    stars = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.1 + 0.2,
        a: Math.random() * 0.6 + 0.15,
        s: Math.random() * 0.15 + 0.03,
        t: Math.random() * Math.PI * 2
    }));
}

function drawStars() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (const st of stars) {
        st.t += 0.02;
        if (!reduceMotion) {
            st.y -= st.s;
            if (st.y < -2) st.y = window.innerHeight + 2;
        }
        const alpha = st.a * (0.7 + 0.3 * Math.sin(st.t));
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
    }
    if (!reduceMotion) requestAnimationFrame(drawStars);
}

resizeStars();
drawStars();
window.addEventListener('resize', () => {
    resizeStars();
    if (reduceMotion) drawStars();
});

// ─── NAV ───
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
});

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    mobileMenuBtn.setAttribute('aria-expanded', open);
    mobileMenuBtn.querySelector('i').className = open ? 'fas fa-times' : 'fas fa-bars';
});

mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', false);
        mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
    });
});

const navLinks = document.querySelectorAll('.nav-links a');
const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
    });
}, { rootMargin: '-45% 0px -50% 0px' });

document.querySelectorAll('section[id]').forEach(s => navObserver.observe(s));

// ─── REVEAL ON SCROLL ───
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── TERMINAL ───
const terminal = document.getElementById('terminal');
const script = [
    { cmd: 'whoami' },
    { out: '<span class="out">noham_agboton — fullstack &amp; software developer</span>' },
    { cmd: 'ls -la skills/' },
    { out: '<span class="perm">drwxr-xr-x</span>  <span class="out">8 languages</span>' },
    { out: '<span class="perm">drwxr-xr-x</span>  <span class="out">frontend_frameworks</span>' },
    { out: '<span class="perm">drwxr-xr-x</span>  <span class="out">backend_systems</span>' },
    { out: '<span class="perm">drwxr-xr-x</span>  <span class="out">devops_tools</span>' },
    { out: '<span class="perm">drwxr-xr-x</span>  <span class="out">iot_aiot</span>' },
    { cmd: 'cat status.txt' },
    { out: '<span class="out">5ème année @ Epitech · stage de fin d\'études</span>' },
    { cmd: '' }
];

const PROMPT = '<span class="prompt">$</span> ';
const CURSOR = '<span class="cursor"></span>';

function renderTerminal() {
    if (reduceMotion) {
        terminal.innerHTML = script.map(l => l.out !== undefined ? l.out : PROMPT + l.cmd).join('\n') + CURSOR;
        return;
    }
    let html = '';
    let line = 0;

    function next() {
        if (line >= script.length) return;
        const l = script[line++];
        if (l.out !== undefined) {
            html += l.out + '\n';
            terminal.innerHTML = html + CURSOR;
            setTimeout(next, 120);
            return;
        }
        let i = 0;
        html += PROMPT;
        (function type() {
            terminal.innerHTML = html + l.cmd.slice(0, i) + CURSOR;
            if (i < l.cmd.length) {
                i++;
                setTimeout(type, 55 + Math.random() * 50);
            } else if (line < script.length) {
                html += l.cmd + '\n';
                setTimeout(next, 350);
            }
        })();
    }
    next();
}

setTimeout(renderTerminal, 500);

// ─── SKILL TABS ───
const skillTabs = document.querySelectorAll('#skill-tabs .tab');
const skills = document.querySelectorAll('#skills-grid .skill');

function showSkills(cat) {
    skills.forEach(s => {
        s.hidden = !s.dataset.cat.split(' ').includes(cat);
    });
}

skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        skillTabs.forEach(t => t.classList.toggle('active', t === tab));
        showSkills(tab.dataset.filter);
    });
});
showSkills('lang');

// ─── PROJECT FILTER & SEARCH ───
const projectTabs = document.querySelectorAll('#project-tabs .tab');
const projects = document.querySelectorAll('#projects-grid .project');
const search = document.getElementById('project-search');
const empty = document.getElementById('projects-empty');
let projectFilter = 'all';

function filterProjects() {
    const q = search.value.trim().toLowerCase();
    let visible = 0;
    projects.forEach(p => {
        const inCat = projectFilter === 'all' || p.dataset.cat.split(' ').includes(projectFilter);
        const match = !q || p.textContent.toLowerCase().includes(q);
        p.hidden = !(inCat && match);
        if (!p.hidden) visible++;
    });
    empty.style.display = visible ? 'none' : 'block';
}

projectTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        projectTabs.forEach(t => t.classList.toggle('active', t === tab));
        projectFilter = tab.dataset.filter;
        filterProjects();
    });
});
search.addEventListener('input', filterProjects);

// ─── CONTACT FORM (opens the visitor's mail client) ───
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const data = new FormData(this);
    const subject = data.get('sujet') || `Contact portfolio — ${data.get('nom')}`;
    const body = `${data.get('message')}\n\n${data.get('nom')} (${data.get('email')})`;
    window.location.href = `mailto:agbotonnoham@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

document.getElementById('year').textContent = new Date().getFullYear();
