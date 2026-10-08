const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.documentElement;

function store(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (e) { /* storage unavailable: preference lasts for this visit only */ }
}

// ─── STARFIELD ───
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];
let starRgb = '255,255,255';

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
        ctx.fillStyle = `rgba(${starRgb},${alpha})`;
        ctx.fill();
    }
    if (!reduceMotion) requestAnimationFrame(drawStars);
}

resizeStars();
window.addEventListener('resize', () => {
    resizeStars();
    if (reduceMotion) drawStars();
});

// ─── THEME ───
const themeBtn = document.getElementById('theme-toggle');

function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    themeBtn.querySelector('i').className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    starRgb = theme === 'light' ? '40,30,80' : '255,255,255';
    if (reduceMotion) drawStars();
}

themeBtn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(next);
    store('theme', next);
});

applyTheme(root.getAttribute('data-theme') || 'dark');
drawStars();

// ─── TRANSLATIONS (French lives in the HTML, English below) ───
const EN = {
    'meta.title': 'Noham Agboton | Portfolio',
    'meta.description': 'Portfolio of Noham Agboton – Fullstack & Software Developer, 5th-year Epitech student specialised in Web, Mobile and IoT.',
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.experience': 'Experience',
    'nav.contact': 'Contact',
    'nav.theme': 'Toggle theme',
    'hero.role': 'Fullstack &amp; Software Developer',
    'hero.hello': 'Hi, I\'m',
    'hero.title': 'I turn <span>ideas</span> into applications.',
    'hero.sub': '5th-year student at Epitech, I design and ship web, mobile and IoT applications, from the front-end all the way to the infrastructure.',
    'hero.cta1': 'View my projects',
    'hero.cta2': 'Contact me',
    'hero.terminal': 'Introduction terminal',
    'about.title': 'About <span>me</span>',
    'about.who': 'Who am I?',
    'about.p1': '<strong>Fullstack &amp; Software</strong> developer in my 5th year at EPITECH, currently doing my end-of-studies internship. Passionate about computing, I specialise in <strong>Web and Mobile</strong> development, with an <strong>IoT / AIoT</strong> specialisation earned at EPITECH Barcelona.',
    'about.p2': 'I\'m comfortable across Core and DevOps stacks, and I enjoy designing, building and deploying robust software, always as part of a team.',
    'about.stat1': 'Work experiences',
    'about.stat2': 'Projects',
    'about.stat3': 'Languages',
    'about.f1k': 'Based in',
    'about.f1': 'Strasbourg — Driving licence (own car)',
    'about.f2k': 'Education',
    'about.f2': 'EPITECH — Master\'s in Software Engineering',
    'about.f3k': 'Specialisation',
    'about.f4k': 'Languages',
    'about.f4': 'French (native), English (B1), Spanish (A1)',
    'about.f5k': 'Hobbies',
    'about.f5': 'Club football, weight training',
    'projects.title': 'My <span>projects</span>',
    'projects.sub': 'Personal, professional and Epitech projects.',
    'projects.all': 'All',
    'projects.systems': 'Systems',
    'projects.search': 'Search a project...',
    'projects.live': 'Live',
    'projects.view': 'View project',
    'projects.site': 'Website',
    'projects.empty': '// No project matches your search.',
    'tag.calendar': 'Calendar',
    'tag.booking': 'Booking',
    'tag.ai': 'AI',
    'p.mysquad': 'Mobile-first web app (PWA) for managing an amateur football team: call-ups, line-ups, stats, news feed, chat and more — built for a coach and their players, installable like a native app without going through an app store.',
    'p.sacusi': 'Showcase website for a mobile afro hairdresser in Strasbourg. I built the online booking calendar behind it: one schedule per service family, so clients can book their slot directly.',
    'p.gamechanger': 'All-in-one fitness mobile app: workout builder, GPS run tracker, AI food scanner, body-shape analysis and a full social layer.',
    'p.area': 'IFTTT / Zapier-style automation platform: an action on one service triggers a reaction on another. Server, web client and mobile client. Epitech project.',
    'p.rtype': 'Networked multiplayer remake of the R-Type shoot\'em up: custom game engine and client / server architecture. Epitech project.',
    'p.esp32': 'Connected device on an ESP32 microcontroller: sensor readings, data upload and remote control. Built during the IoT / AIoT specialisation at Epitech Barcelona.',
    'p.smartplanner': 'Smart planning app to organise your tasks and schedule.',
    'p.habit': 'Web app to track and analyse your daily habits, with visualisations and advanced statistics.',
    'p.network.title': 'Networking Project',
    'p.network': 'Client / server handling TCP/IP connections and custom protocols, written in C at Epitech.',
    'skills.title': 'Tech stack &amp; <span>skills</span>',
    'skills.sub': 'Built at Epitech (Strasbourg &amp; Barcelona), at work and through self-learning.',
    'skills.lang': 'Languages',
    'skills.iot': 'IoT &amp; AI',
    'skills.network': 'Networking',
    'skills.agile': 'Agile methods',
    'skills.embedded': 'Embedded systems',
    'skills.connected': 'Connected devices',
    'skills.aiot': 'AI for IoT',
    'journey.title': 'My <span>journey</span>',
    'journey.exp': 'Experience',
    'journey.edu': 'Education',
    'exp1.title': 'IT Support &amp; Fullstack Developer (Internship)',
    'exp1.l1': 'Fullstack development: front-end (HTML/CSS/JS) and back-end (PHP/Node.js).',
    'exp1.l2': 'Architecture: designing and managing SQL database architecture.',
    'exp1.l3': 'Maintenance: support and upkeep of IT hardware.',
    'exp2.title': 'IT Support',
    'exp2.l1': 'Level-1 user support and hardware troubleshooting.',
    'exp2.l2': 'Inventory management and replacement of the IT fleet.',
    'exp3.title': 'Fullstack Developer (Internship)',
    'exp3.l1': 'Back-end: implemented features with PHP, Laravel and WordPress.',
    'exp3.l2': 'Front-end: took part in HTML/CSS integration and client project follow-up.',
    'edu1.date': 'Since 2022',
    'edu1.title': 'Master\'s in Software Engineering (RNCP level 7)',
    'edu1.l1': '5th and final year in progress (end-of-studies internship). Bachelor\'s degree obtained.',
    'edu2.date': 'International programme',
    'edu2.title': 'IoT &amp; AIoT specialisation',
    'edu2.place': 'EPITECH — Barcelona',
    'edu2.l1': 'Internet of Things (IoT) and Artificial Intelligence of Things (AIoT).',
    'edu3.title': 'French Scientific Baccalaureate',
    'edu3.l1': 'Majors: Physics-Chemistry, Computer Science (NSI).',
    'contact.title': 'Let\'s work <span>together</span>',
    'contact.sub': 'Got a project in mind, an internship or job offer, or just want to chat? Drop me a line.',
    'contact.phone': 'Phone',
    'contact.location': 'Location',
    'form.name': 'Name',
    'form.name.ph': 'Your name',
    'form.email.ph': 'you@email.com',
    'form.subject': 'Subject',
    'form.subject.ph': 'What is it about?',
    'form.message.ph': 'Your message...',
    'form.send': 'Send message',
    'footer': 'Designed &amp; built with passion'
};

const FR = {
    'meta.title': document.title,
    'meta.description': document.querySelector('meta[name="description"]').content
};
document.querySelectorAll('[data-i18n]').forEach(el => { FR[el.dataset.i18n] = el.innerHTML; });
document.querySelectorAll('[data-i18n-ph]').forEach(el => { FR[el.dataset.i18nPh] = el.placeholder; });
document.querySelectorAll('[data-i18n-aria]').forEach(el => { FR[el.dataset.i18nAria] = el.getAttribute('aria-label'); });

const TERMINAL = {
    fr: { role: 'développeur fullstack &amp; logiciel', status: '5ème année @ Epitech · stage de fin d\'études' },
    en: { role: 'fullstack &amp; software developer', status: '5th year @ Epitech · end-of-studies internship' }
};

function applyLang(lang) {
    const dict = lang === 'en' ? EN : FR;
    const t = key => dict[key] !== undefined ? dict[key] : FR[key];
    root.setAttribute('lang', lang);
    document.title = t('meta.title');
    document.querySelector('meta[name="description"]').content = t('meta.description');
    document.querySelectorAll('[data-i18n]').forEach(el => { el.innerHTML = t(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
    document.querySelectorAll('.lang-switch button').forEach(b => {
        b.setAttribute('aria-pressed', b.dataset.lang === lang);
    });
    renderTerminal(lang);
}

document.querySelectorAll('.lang-switch button').forEach(b => {
    b.addEventListener('click', () => {
        if (root.getAttribute('lang') === b.dataset.lang) return;
        applyLang(b.dataset.lang);
        store('lang', b.dataset.lang);
    });
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
const PROMPT = '<span class="prompt">$</span> ';
const CURSOR = '<span class="cursor"></span>';
let terminalRun = 0;

function terminalScript(lang) {
    const txt = TERMINAL[lang] || TERMINAL.fr;
    const dir = name => ({ out: `<span class="perm">drwxr-xr-x</span>  <span class="out">${name}</span>` });
    return [
        { cmd: 'whoami' },
        { out: `<span class="out">noham_agboton — ${txt.role}</span>` },
        { cmd: 'ls -la skills/' },
        dir('8 languages'),
        dir('frontend_frameworks'),
        dir('backend_systems'),
        dir('devops_tools'),
        dir('iot_aiot'),
        { cmd: 'cat status.txt' },
        { out: `<span class="out">${txt.status}</span>` },
        { cmd: '' }
    ];
}

function renderTerminal(lang) {
    const script = terminalScript(lang);
    const run = ++terminalRun;
    if (reduceMotion) {
        terminal.innerHTML = script.map(l => l.out !== undefined ? l.out : PROMPT + l.cmd).join('\n') + CURSOR;
        return;
    }
    let html = '';
    let line = 0;
    const later = (fn, ms) => setTimeout(() => { if (run === terminalRun) fn(); }, ms);

    function next() {
        if (line >= script.length) return;
        const l = script[line++];
        if (l.out !== undefined) {
            html += l.out + '\n';
            terminal.innerHTML = html + CURSOR;
            later(next, 120);
            return;
        }
        let i = 0;
        html += PROMPT;
        (function type() {
            terminal.innerHTML = html + l.cmd.slice(0, i) + CURSOR;
            if (i < l.cmd.length) {
                i++;
                later(type, 55 + Math.random() * 50);
            } else if (line < script.length) {
                html += l.cmd + '\n';
                later(next, 350);
            }
        })();
    }
    later(next, 500);
}

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

applyLang(root.getAttribute('lang') === 'en' ? 'en' : 'fr');
