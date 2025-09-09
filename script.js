document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scrolling for navigation links (both main and sidebar)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                // Close sidebar if open
                if (document.body.classList.contains('sidebar-open')) {
                    toggleSidebar(false);
                }
            }
        });
    });

    // Hamburger & Sidebar logic
    const navToggle = document.querySelector('.nav-toggle');
    const sidebarNav = document.querySelector('.sidebar-nav');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const closeSidebarBtn = document.querySelector('.close-sidebar');

    function toggleSidebar(open) {
        if (open) {
            navToggle.classList.add('active');
            sidebarNav.classList.add('active');
            sidebarOverlay.classList.add('active');
            document.body.classList.add('sidebar-open');
            setTimeout(() => { sidebarNav.focus && sidebarNav.focus(); }, 200);
        } else {
            navToggle.classList.remove('active');
            sidebarNav.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.classList.remove('sidebar-open');
        }
    }

    navToggle.addEventListener('click', () => toggleSidebar(true));
    closeSidebarBtn.addEventListener('click', () => toggleSidebar(false));
    sidebarOverlay.addEventListener('click', () => toggleSidebar(false));

    // Escape closes sidebar
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && document.body.classList.contains('sidebar-open')) {
            toggleSidebar(false);
        }
    });

    // Add 'active' class to current section in nav (for both menus)
    const sections = document.querySelectorAll('section');
    function setActiveNav() {
        let current = '';
        const scrollY = window.pageYOffset;
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        // Desktop
        document.querySelectorAll('.main-nav ul li a').forEach(link => {
            link.classList.remove('active');
            if (current && link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
        // Sidebar
        document.querySelectorAll('.sidebar-nav ul li a').forEach(link => {
            link.classList.remove('active');
            if (current && link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', setActiveNav);

    // Hero image scroll animation
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        window.addEventListener('scroll', () => {
            heroImage.style.transform = `translateY(${window.scrollY * 0.1}px)`;
        });
    }

    // Return to Top Button
    const toTopBtn = document.getElementById('toTopBtn');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            toTopBtn.classList.add('show');
        } else {
            toTopBtn.classList.remove('show');
        }
    });
    toTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // (WhatsApp float always visible, no extra JS needed)
});