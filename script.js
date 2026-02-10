document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.header');
    const links = document.querySelectorAll('.nav-links a');
    const themeToggle = document.querySelector('.theme-toggle');
    const sections = document.querySelectorAll('section');

    // Mobile Menu Toggle
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Animate hamburger to X
        hamburger.classList.toggle('toggle');
    });

    // Close mobile menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });

    // Smooth Scrolling & Active Link Highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY;

        // Navbar Shadow on Scroll
        if (scrollPosition > 50) {
            header.style.boxShadow = '0 10px 30px -10px rgba(2, 12, 27, 0.7)';
            if (document.body.getAttribute('data-theme') === 'light') {
                header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            }
        } else {
            header.style.boxShadow = 'none';
        }

        // Active Section Highlight
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Offset for header height
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Theme Toggle (Dark/Light)
    themeToggle.addEventListener('click', () => {
        const body = document.body;
        const icon = themeToggle.querySelector('i');

        if (body.getAttribute('data-theme') === 'light') {
            body.removeAttribute('data-theme');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        } else {
            body.setAttribute('data-theme', 'light');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        }
    });

    // Check Local Storage for Theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.setAttribute('data-theme', 'light');
        themeToggle.querySelector('i').classList.remove('fa-moon');
        themeToggle.querySelector('i').classList.add('fa-sun');
    }


    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;

            // Mock sending
            btn.innerText = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerText = 'Message Sent!';
                btn.style.backgroundColor = 'var(--primary-color)';
                btn.style.color = 'var(--bg-color)';
                contactForm.reset();

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                }, 3000);
            }, 1500);
        });
    }

    // Scroll Animations (Simple Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add fade-in class to elements you want to animate
    document.querySelectorAll('.section-title, .hero-content, .about-content, .skill-card, .project-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // CSS for the javascript injection of styles for fade-in
    // We can just add the class logic here since we are handling style.opacity directly above initially to hide them
    // But a cleaner way:
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);
});
