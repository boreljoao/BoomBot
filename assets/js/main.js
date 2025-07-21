// Espera todo o HTML ser carregado para executar os scripts
document.addEventListener('DOMContentLoaded', function() {

    // --- EFEITO DE CURSOR ---
    const cursor = document.getElementById('cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
            const target = e.target.closest('a, button, .service-card, .social-linke, .form-control');
            if (target) {
                cursor.style.transform = 'translate(-50%, -50%) scale(2)';
                cursor.style.backgroundColor = 'rgba(168, 85, 247, 0.3)';
            } else {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.backgroundColor = 'rgba(168, 85, 247, 0.5)';
            }
        });
    }

    // --- LOADER DA PÁGINA ---
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.add('loader-hide');
        setTimeout(() => loader.style.display = 'none', 600);
    }
    
    // --- PARTICLES.JS ---
    particlesJS("particles-js", {
        particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: "#A855F7" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 2, random: true },
            line_linked: { enable: true, distance: 150, color: "#A855F7", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 1, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
            modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
        },
        retina_detect: true
    });

    // --- SCROLLREVEAL ---
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '50px',
        duration: 800,
        reset: false,
        easing: 'cubic-bezier(0.5, 0, 0, 1)'
    });

    // Animando os elementos DENTRO das seções
    sr.reveal('.hero-content h1', { delay: 200 });
    sr.reveal('.hero-content p', { delay: 300 });
    sr.reveal('.hero-content .cta-button', { delay: 400 });
    sr.reveal('.hero-image', { delay: 500, origin: 'right' });
    sr.reveal('.scroll-down', { delay: 800 });
    
    sr.reveal('.services .section-title', { delay: 200 });
    sr.reveal('.service-card', { interval: 100, delay: 300 });

    // Correção: Agora vai animar, pois o CSS foi corrigido
    sr.reveal('.about-image', { delay: 200, origin: 'left' });
    sr.reveal('.about-content', { delay: 300 });

    // ✅ NOVO: Animação para a seção de depoimentos e estatísticas
    sr.reveal('.testimonials .section-title2', { delay: 200 });
    sr.reveal('.testimonial-slider', { delay: 300 });
    sr.reveal('.stats div', { interval: 100, delay: 400 });

    // Correção: Agora vai animar, pois o CSS foi corrigido
    sr.reveal('.contact-info', { delay: 200 });
    sr.reveal('.contact-form', { delay: 300, origin: 'right' });


    // --- HEADER COM SOMBRA ---
    const header = document.getElementById('mainHeader');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 10);
        });
    }

    // --- MENU MOBILE ---
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMobile = document.getElementById('navMobile');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    if (hamburgerBtn && navMobile && closeMenuBtn) {
        const closeMenu = () => {
            navMobile.classList.remove('open');
            hamburgerBtn.classList.remove('active');
        };
        hamburgerBtn.addEventListener('click', () => {
            navMobile.classList.add('open');
            hamburgerBtn.classList.add('active');
        });
        closeMenuBtn.addEventListener('click', closeMenu);
        document.querySelectorAll('.nav-mobile a').forEach(link => link.addEventListener('click', closeMenu));
    }

    // --- CONTADOR DE ESTATÍSTICAS ---
    const counters = document.querySelectorAll('.count');
    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const increment = target / 100;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(updateCount, 15);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                counterObserver.unobserve(counter); // Anima só uma vez
            }
        });
    }, { threshold: 0.8 });
    counters.forEach(counter => counterObserver.observe(counter));


    // --- NAVEGAÇÃO POR PONTOS (DOTS) ---
    const dots = document.querySelectorAll('.nav-dot');
    if (dots.length > 0) {
        const sections = Array.from(dots).map(dot => document.getElementById(dot.dataset.target));

        // Scroll suave ao clicar
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const targetId = this.dataset.target;
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Destaque ativo durante o scroll
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    dots.forEach(dot => {
                        dot.classList.toggle('active', dot.dataset.target === entry.target.id);
                    });
                }
            });
        }, { rootMargin: '-50% 0px -50% 0px' });
        
        sections.forEach(section => {
            if(section) sectionObserver.observe(section);
        });
    }


    // --- LINK DE EMAIL PARA GMAIL ---
    function handleEmailClick(e) {
        if (!/Mobi|Android/i.test(navigator.userAgent)) {
            e.preventDefault();
            window.open('https://mail.google.com/mail/?view=cm&fs=1&to=boombotinc@gmail.com&su=Contato%20via%20Site&body=Ol%C3%A1,%20BoomBot!', '_blank');
        }
    }
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => link.addEventListener('click', handleEmailClick));

    ScrollReveal().reveal('#about, #contact', {
        distance: '50px',
        duration: 1000,
        easing: 'ease-in-out',
        origin: 'bottom',
    });
});

