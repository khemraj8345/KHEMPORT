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
    navToggle.setAttribute('aria-label', 'Toggle navigation');
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

    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (themeToggle) themeToggle.textContent = '🌙';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            themeToggle.textContent = isDark ? '🌙' : '☀';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // --- Night Sky Stars Logic ---
    const sky = document.getElementById('sky');
    if (sky) {
        const starCount = 200;
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';

            // Random size
            const size = Math.random() * 2 + 1 + 'px';
            star.style.width = size;
            star.style.height = size;

            // Random position
            const x = Math.random() * 100;
            const y = Math.random() * 80; // Upper 80%
            star.style.left = x + '%';
            star.style.top = y + '%';

            // Random twinkle
            const duration = Math.random() * 3 + 2 + 's';
            star.style.setProperty('--duration', duration);
            star.style.animationDelay = Math.random() * 5 + 's';

            sky.appendChild(star);
        }

        // Interactive star creation
        window.addEventListener('click', (e) => {
            // Only add star if in dark mode and clicking on hero area
            if (document.body.classList.contains('dark-mode') && e.target.closest('#home')) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.width = '3px';
                star.style.height = '3px';
                star.style.left = e.clientX + 'px';
                star.style.top = e.clientY + 'px';
                star.style.setProperty('--duration', '1s');
                sky.appendChild(star);
            }
        });
    }

    // --- Sunny Day Logic ---
    const daySky = document.getElementById('day-sky');
    const meadow = document.getElementById('meadow');

    if (daySky && meadow) {
        // Create 6 clouds
        for (let i = 0; i < 6; i++) {
            const cloud = document.createElement('div');
            cloud.className = 'cloud';

            const width = Math.random() * 100 + 100 + 'px'; // 100-200px

            cloud.style.width = width;
            cloud.style.height = '40px';
            cloud.style.top = Math.random() * 40 + '%';

            // Random speed
            const speed = Math.random() * 30 + 20 + 's';
            cloud.style.setProperty('--speed', speed);

            // Random delay
            cloud.style.animationDelay = Math.random() * -50 + 's';

            daySky.appendChild(cloud);
        }

        // Create random flowers
        for (let i = 0; i < 20; i++) {
            const flower = document.createElement('div');
            flower.className = 'flower';
            flower.style.left = Math.random() * 95 + '%';
            // Position near bottom but varied
            flower.style.bottom = Math.random() * 10 + 'vh';

            const petal = document.createElement('div');
            petal.className = 'petal';
            const colors = ['#FF69B4', '#FFFFFF', '#FFD700', '#FF4500'];
            petal.style.background = colors[Math.floor(Math.random() * colors.length)];

            flower.appendChild(petal);
            meadow.appendChild(flower);
        }
    }

    // --- Skills Section Space Logic ---
    const spaceStars = document.getElementById('space-stars');
    if (spaceStars) {
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'space-star';
            star.style.width = Math.random() * 3 + 'px';
            star.style.height = star.style.width;
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            spaceStars.appendChild(star);
        }
    }

    // Rocket Launch
    const rocket = document.getElementById('rocket');
    let isLaunching = false;

    if (rocket) {
        rocket.addEventListener('click', () => {
            if (isLaunching) return;
            isLaunching = true;

            rocket.style.transition = 'all 2s ease-in';
            // Launch up and rotate
            rocket.style.transform = 'translate(-50%, -150vh) rotate(-10deg)';

            setTimeout(() => {
                // Reset position smoothly while hidden (or snap back if preferred, user code snapped)
                rocket.style.transition = 'none';
                rocket.style.transform = 'translate(-50%, 150vh)'; /* Move to bottom */

                setTimeout(() => {
                    rocket.style.transition = 'all 2s ease-out';
                    rocket.style.transform = 'translate(-50%, -50%)'; /* Return to center */
                    isLaunching = false;
                }, 50);
            }, 2000);
        });
    }

    // Add particle effect logic if needed, but the main rocket/star logic is sufficient for the requested background effect.
});