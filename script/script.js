document.addEventListener('DOMContentLoaded', () => {
    // header behavior: solid background on scroll
    const header = document.querySelector('header');
    const onScrollHeader = () => {
        if (!header) return;
        if (window.scrollY > 40) header.classList.add('header-solid'); else header.classList.remove('header-solid');
    };
    onScrollHeader();
    window.addEventListener('scroll', onScrollHeader);

    // mobile nav toggle
    const navToggle = document.createElement('button');
    navToggle.className = 'nav-toggle';
    navToggle.setAttribute('aria-label','Toggle navigation');
    navToggle.innerHTML = '<span></span>';
    const nav = document.querySelector('nav');
    if (nav) nav.insertBefore(navToggle, nav.querySelector('ul'));

    const navList = document.querySelector('nav ul');
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('open');
        if (navList) navList.classList.toggle('show');
    });

    // close mobile nav when clicking a link
    if (navList) {
        navList.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                navList.classList.remove('show');
                navToggle.classList.remove('open');
            });
        });
    }

    // Smooth scroll for same-page anchors only
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = this.getAttribute('href');
            if (!target || target === '#') return;
            const el = document.querySelector(target);
            if (!el) return; // let normal navigation happen for cross-page links
            e.preventDefault();
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Intersection Observer for reveal animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.12 });
    document.querySelectorAll('section').forEach(s => observer.observe(s));

    // Active nav link based on current page or hash
    const links = document.querySelectorAll('nav ul li a');
    const path = window.location.pathname.split('/').pop();
    links.forEach(a => {
        const href = a.getAttribute('href');
        if (!href) return;
        if (href === path || (href === window.location.hash && window.location.hash !== '')) {
            a.parentElement && a.parentElement.classList.add('nav-active');
        }
    });

    // Safe form handler
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you — message received! I will reply soon.');
            form.reset();
        });
    }
});