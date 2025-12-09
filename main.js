/* main.js — shared site behavior
   - Header transparent <-> solid on scroll
   - Hamburger toggle for mobile
   - Scroll reveal using IntersectionObserver
   - Smooth internal link scrolling
*/

/* Header behaviour: solid on downward scroll, transparent when scrolling up */
(function () {
    const header = document.getElementById('site-header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const current = window.pageYOffset || document.documentElement.scrollTop;

        // If scrolling down past 70px -> solid header
        if (current > lastScroll && current > 70) {
            header.classList.remove('transparent');
            header.classList.add('solid');
        } else {
            // scrolling up -> transparent
            header.classList.remove('solid');
            header.classList.add('transparent');
        }

        lastScroll = current <= 0 ? 0 : current;
    });
})();

/* Hamburger toggle: simple show/hide nav for beginners */
(function () {
    const btn = document.getElementById('hamburger');
    const nav = document.getElementById('nav');

    btn && btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));

        // toggle display style (very simple)
        if (nav.style.display === 'block') {
            nav.style.display = '';
        } else {
            nav.style.display = 'block';
        }
    });

    // hide mobile nav if user resizes to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 800 && nav.style.display === 'block') {
            nav.style.display = '';
            btn.setAttribute('aria-expanded', 'false');
        }
    });
})();

/* Simple scroll reveal using IntersectionObserver */
(function () {
    const reveals = document.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window)) {
        // Fallback: show all elements if not supported
        reveals.forEach(el => el.classList.add('visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    reveals.forEach(el => observer.observe(el));
})();

/* Smooth scrolling for internal links (if any) */
(function () {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
})();
