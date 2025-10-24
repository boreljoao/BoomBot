// Espera todo o HTML ser carregado para executar os scripts
document.addEventListener('DOMContentLoaded', function() {

    // --- EFEITO DE CURSOR ---
    const cursor = document.getElementById('cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
            const target = e.target.closest('a, button, .service-card, .social-linke, .form-control, .contact-input, .contact-textarea');
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
    
    sr.reveal('.services', { delay: 140, distance: '55px' });
    sr.reveal('.services .section-led', { delay: 180, distance: '45px' });
    sr.reveal('.services .section-title', { delay: 200 });
    sr.reveal('.service-card', { interval: 140, delay: 260 });

    // Correção: Agora vai animar, pois o CSS foi corrigido
    sr.reveal('.about', { delay: 150, distance: '55px' });
    sr.reveal('.about-image', { delay: 220, origin: 'left' });
    sr.reveal('.about-content', { delay: 320 });

    // ✅ NOVO: Animação para a seção de depoimentos e estatísticas
    sr.reveal('.testimonials', { delay: 170, distance: '55px' });
    sr.reveal('.testimonials-head', { delay: 230 });
    sr.reveal('.testimonial-card', { delay: 320, interval: 140 });
    

    // Contato com iluminação mágica
    sr.reveal('.contact', { delay: 170, distance: '55px' });
    sr.reveal('.contact-head', { delay: 220, origin: 'top' });
    sr.reveal('.contact-card', { delay: 300, origin: 'bottom' });
    sr.reveal('.contact-meta-item', { delay: 360, interval: 80, origin: 'bottom' });


    // --- HEADER COM SOMBRA ---
    const header = document.getElementById('mainHeader');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 10);
        });
    }

    // --- MENU MOBILE (REFEITO) ---
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMobile = document.getElementById('navMobile');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const body = document.body;

    // --- TRANSIÇÃO DE TEMAS POR SEÇÃO ---
    const themeSections = document.querySelectorAll('[data-theme]');
    const removeThemeClasses = () => {
        Array.from(body.classList)
            .filter(cls => cls.startsWith('theme-'))
            .forEach(cls => body.classList.remove(cls));
    };
    const applyTheme = (themeName) => {
        if (!themeName) return;
        const targetClass = `theme-${themeName}`;
        if (body.classList.contains(targetClass)) return;
        removeThemeClasses();
        body.classList.add(targetClass);
    };
    if (themeSections.length) {
        const isSmallViewport = window.matchMedia('(max-width: 768px)').matches;
        const themeObserver = new IntersectionObserver((entries) => {
            const visibleEntry = entries
                .filter(entry => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
            if (visibleEntry) {
                applyTheme(visibleEntry.target.dataset.theme);
            }
        }, { threshold: isSmallViewport ? 0.3 : 0.45 });

        themeSections.forEach(section => themeObserver.observe(section));

        const ensureInitialTheme = () => {
            const midpoint = window.innerHeight / 2;
            const current = Array.from(themeSections).find(section => {
                const rect = section.getBoundingClientRect();
                return rect.top <= midpoint && rect.bottom >= midpoint;
            }) || themeSections[0];
            if (current) {
                applyTheme(current.dataset.theme);
            }
        };

        window.addEventListener('load', ensureInitialTheme);
        window.addEventListener('resize', ensureInitialTheme);
        ensureInitialTheme();
    }

    function openMenu() {
        navMobile.classList.add('open');
        hamburgerBtn.classList.add('active');
        body.style.overflow = 'hidden'; // Impede scroll do fundo
        closeMenuBtn.focus();
    }
    function closeMenu() {
        navMobile.classList.remove('open');
        hamburgerBtn.classList.remove('active');
        body.style.overflow = '';
        hamburgerBtn.focus();
    }
    if (hamburgerBtn && navMobile && closeMenuBtn) {
        hamburgerBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (navMobile.classList.contains('open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
        closeMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeMenu();
        });
        // Fecha ao clicar em qualquer link do menu mobile
        navMobile.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        // Fecha ao clicar fora do menu
        document.addEventListener('click', function(e) {
            if (navMobile.classList.contains('open') && !navMobile.contains(e.target) && e.target !== hamburgerBtn) {
                closeMenu();
            }
        });
        // Fecha ao pressionar ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMobile.classList.contains('open')) {
                closeMenu();
            }
        });
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

    // --- TESTIMONIAL AUDIO PLAYERS ---
    const testimonialPlayers = document.querySelectorAll('.testimonial-audio');
    let activeAudioState = null;

    const waveformHeights = [60, 80, 40, 90, 70, 50, 85, 45, 75, 55, 95, 65, 50, 80, 60, 70, 85, 55, 75, 65];

    const formatAudioTime = (seconds) => {
        if (!Number.isFinite(seconds)) return '0:00';
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
        return `${minutes}:${secs}`;
    };

    const updateWaveBars = (state, percentage) => {
        if (!state.waveBars.length) return;
        const activeCount = Math.round((percentage / 100) * state.waveBars.length);
        state.waveBars.forEach((bar, index) => {
            bar.classList.toggle('is-active', index < activeCount);
        });
    };

    const pauseState = (state, reset = false) => {
        if (!state) return;
        state.audio.pause();
        if (reset) {
            state.audio.currentTime = 0;
            state.slider.value = 0;
            updateWaveBars(state, 0);
        } else if (Number.isFinite(state.audio.duration) && state.audio.duration > 0) {
            const percentage = (state.audio.currentTime / state.audio.duration) * 100;
            state.slider.value = percentage;
            updateWaveBars(state, percentage);
        }
        state.wrapper.classList.remove('is-playing');
        state.control.setAttribute('aria-label', state.playLabel);
        if (Number.isFinite(state.audio.duration) && state.audio.duration > 0) {
            state.time.textContent = `${formatAudioTime(state.audio.duration - state.audio.currentTime)}`;
        } else {
            state.time.textContent = '0:00';
        }
        if (activeAudioState === state) {
            activeAudioState = null;
        }
    };

    testimonialPlayers.forEach((wrapper) => {
        const control = wrapper.querySelector('.audio-button');
        const slider = wrapper.querySelector('.audio-progress');
        const time = wrapper.querySelector('.audio-time');
        const wave = wrapper.querySelector('.audio-waveform');
        const audioEl = wrapper.querySelector('.audio-element');
        const src = wrapper.dataset.audio || (audioEl ? audioEl.getAttribute('src') : '');
        const audio = audioEl || new Audio(src);

        if (!src || !control || !slider || !time) return;
        if (!audioEl) {
            audio.preload = 'metadata';
            wrapper.appendChild(audio);
        } else {
            audio.preload = 'metadata';
        }

        if (audio.src !== src) {
            audio.src = src;
        }

        if (wave && wave.children.length === 0) {
            const bars = Number(wave.dataset.bars) || waveformHeights.length;
            for (let i = 0; i < bars; i += 1) {
                const span = document.createElement('span');
                const height = waveformHeights[i % waveformHeights.length];
                span.style.height = `${height}%`;
                wave.appendChild(span);
            }
        }

        const state = {
            wrapper,
            control,
            slider,
            time,
            audio,
            waveBars: wave ? Array.from(wave.children) : [],
            playLabel: control.getAttribute('aria-label') || 'Reproduzir depoimento',
            pauseLabel: 'Pausar depoimento',
        };

        slider.value = 0;
        slider.disabled = true;
        time.textContent = '0:00';
        updateWaveBars(state, 0);

        audio.addEventListener('loadedmetadata', () => {
            slider.disabled = false;
            time.textContent = `${formatAudioTime(audio.duration)}`;
        });

        audio.addEventListener('timeupdate', () => {
            if (!Number.isFinite(audio.duration) || audio.duration === 0) return;
            const percentage = (audio.currentTime / audio.duration) * 100;
            if (!slider.matches(':active')) {
                slider.value = percentage;
            }
            time.textContent = `${formatAudioTime(audio.duration - audio.currentTime)}`;
            updateWaveBars(state, percentage);
        });

        audio.addEventListener('play', () => {
            wrapper.classList.add('is-playing');
            control.setAttribute('aria-label', state.pauseLabel);
        });

        audio.addEventListener('pause', () => {
            if (audio.ended) return;
            wrapper.classList.remove('is-playing');
            control.setAttribute('aria-label', state.playLabel);
        });

        audio.addEventListener('ended', () => {
            pauseState(state, true);
        });

        control.addEventListener('click', () => {
            if (audio.paused) {
                if (activeAudioState && activeAudioState !== state) {
                    pauseState(activeAudioState, false);
                }
                audio.play().then(() => {
                    activeAudioState = state;
                }).catch(() => {});
            } else {
                pauseState(state, false);
            }
        });

        slider.addEventListener('input', () => {
            if (!Number.isFinite(audio.duration) || audio.duration === 0) return;
            const percentage = Number(slider.value);
            audio.currentTime = (percentage / 100) * audio.duration;
            updateWaveBars(state, percentage);
            time.textContent = `${formatAudioTime(audio.duration - audio.currentTime)}`;
        });

        if (wave) {
            wave.addEventListener('click', (event) => {
                if (!Number.isFinite(audio.duration) || audio.duration === 0) return;
                const rect = wave.getBoundingClientRect();
                const percentage = ((event.clientX - rect.left) / rect.width) * 100;
                const clamped = Math.min(Math.max(percentage, 0), 100);
                slider.value = clamped;
                audio.currentTime = (clamped / 100) * audio.duration;
                updateWaveBars(state, clamped);
                time.textContent = `${formatAudioTime(audio.duration - audio.currentTime)}`;
            });
        }
    });

    // --- TOUCH FRIENDLY: Tap-to-toggle nos service cards ---
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches || 'ontouchstart' in window;
    const serviceCards = Array.from(document.querySelectorAll('.service-card'));
    if (serviceCards.length && isTouch) {
        function deactivateAll() {
            serviceCards.forEach(card => {
                card.classList.remove('active');
                card.setAttribute('aria-expanded', 'false');
            });
        }
        serviceCards.forEach(card => {
            card.addEventListener('click', (e) => {
                // Evita que cliques internos fechem imediatamente
                e.stopPropagation();
                const willActivate = !card.classList.contains('active');
                deactivateAll();
                if (willActivate) {
                    card.classList.add('active');
                    card.setAttribute('aria-expanded', 'true');
                }
            });
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });
        });
        document.addEventListener('click', () => deactivateAll());
    }

    // --- ABOUT VISUAL tilt/parallax (desktop only) ---
    const aboutVisual = document.querySelector('.about-visual');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (aboutVisual && !isTouch && !reduceMotion) {
        const strength = 10; // deg
        function resetTilt(){
            aboutVisual.style.transform = 'rotateX(0deg) rotateY(0deg)';
        }
        aboutVisual.addEventListener('mousemove', (e) => {
            const rect = aboutVisual.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;   // 0..1
            const y = (e.clientY - rect.top) / rect.height;  // 0..1
            const rotY = (x - 0.5) * strength;  // left/right
            const rotX = -(y - 0.5) * strength; // up/down
            aboutVisual.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        });
        aboutVisual.addEventListener('mouseleave', resetTilt);
        resetTilt();
    }

    
});

// service-pages.js
document.addEventListener('DOMContentLoaded', function() {
    // Animação de revelação para elementos das páginas de serviço
    const sr = ScrollReveal({
      origin: 'bottom',
      distance: '50px',
      duration: 800,
      reset: false,
      easing: 'cubic-bezier(0.5, 0, 0, 1)'
    });
    
    // Animações específicas para páginas de serviço
    sr.reveal('.service-hero-content', { delay: 200 });
    sr.reveal('.service-hero-image', { delay: 300, origin: 'right' });
    sr.reveal('.about-card', { interval: 100, delay: 400 });
    sr.reveal('.feature-item', { interval: 100, delay: 400 });
    sr.reveal('.process-step', { interval: 100, delay: 400 });
    sr.reveal('.service-feature', { interval: 100, delay: 400 });
    sr.reveal('.pricing-card', { interval: 100, delay: 400 });
    
    // Contador para estatísticas (se aplicável)
    const stats = document.querySelectorAll('.stat-number');
    if (stats.length > 0) {
      const statObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const stat = entry.target;
            const target = +stat.getAttribute('data-target');
            const increment = target / 100;
            let current = 0;
            
            const updateStat = () => {
              if (current < target) {
                current += increment;
                stat.textContent = Math.ceil(current);
                setTimeout(updateStat, 20);
              } else {
                stat.textContent = target;
              }
            };
            
            updateStat();
            statObserver.unobserve(stat);
          }
        });
      }, { threshold: 0.5 });
      
      stats.forEach(stat => statObserver.observe(stat));
    }
    
    // FAQ interactivity
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      question.addEventListener('click', () => {
        item.classList.toggle('active');
      });
    });
  });

