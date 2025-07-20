 // Custom cursor effect
 const cursor = document.getElementById('cursor');
 if (cursor) {
     document.addEventListener('mousemove', (e) => {
         cursor.style.left = `${e.clientX}px`;
         cursor.style.top = `${e.clientY}px`;
         
         // Scale up when hovering interactive elements
         const target = e.target;
         if (target.tagName === 'A' || target.classList.contains('cta-button') || 
             target.classList.contains('service-card') || target.classList.contains('social-link') ||
             target.classList.contains('form-control') || target.classList.contains('submit-btn')) {
             cursor.style.transform = 'translate(-50%, -50%) scale(2)';
             cursor.style.backgroundColor = 'rgba(168, 85, 247, 0.3)';
         } else {
             cursor.style.transform = 'translate(-50%, -50%) scale(1)';
             cursor.style.backgroundColor = 'rgba(168, 85, 247, 0.5)';
         }
     });
 }
 
 // Circle navigation functionality
 const circleNav = document.getElementById('circleNav');
 const navDots = document.querySelectorAll('.nav-dot');
 const sections = document.querySelectorAll('section');
 
 // Update active dot based on scroll position
 window.addEventListener('scroll', () => {
     let current = '';
     
     sections.forEach(section => {
         const sectionTop = section.offsetTop;
         const sectionHeight = section.clientHeight;
         
         if (pageYOffset >= sectionTop - 300) {
             current = section.getAttribute('id');
         }
     });
     
     navDots.forEach(dot => {
         dot.classList.remove('active');
         if (dot.getAttribute('data-target') === current) {
             dot.classList.add('active');
         }
     });
 });
 
 // Click navigation for dots
 navDots.forEach(dot => {
     dot.addEventListener('click', () => {
         const target = dot.getAttribute('data-target');
         document.getElementById(target).scrollIntoView({
             behavior: 'smooth'
         });
     });
 });
 
 // Scroll down button
 document.getElementById('scrollDown').addEventListener('click', () => {
     document.getElementById('services').scrollIntoView({
         behavior: 'smooth'
     });
 });
 
 // Scroll animation for elements
 const animateOnScroll = () => {
     const elements = document.querySelectorAll('.service-card, .about-image, .about-content, .contact-info, .contact-form');
     
     elements.forEach(element => {
         const elementPosition = element.getBoundingClientRect().top;
         const screenPosition = window.innerHeight / 1.2;
         
         if (elementPosition < screenPosition) {
             element.classList.add('visible');
         }
     });
 };
 
 window.addEventListener('scroll', animateOnScroll);
 window.addEventListener('load', animateOnScroll);
 
 // Form submission
 const contactForm = document.getElementById('contactForm');
 if (contactForm) {
     contactForm.addEventListener('submit', (e) => {
         // Não previne o envio, deixa o Formspree funcionar
         // Pode exibir um loading ou feedback se quiser
     });
 }
 
 // HEADER SCROLL SHADOW
const header = document.getElementById('mainHeader');
window.addEventListener('scroll', () => {
    if(window.scrollY > 10) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
// MENU MOBILE
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navMobile = document.getElementById('navMobile');
const closeMenuBtn = document.getElementById('closeMenuBtn');

document.querySelectorAll('.nav-mobile a').forEach(link => {
    link.addEventListener('click', () => {
        navMobile.classList.remove('open');
        hamburgerBtn.classList.remove('active');
    });
});

hamburgerBtn.addEventListener('click', () => {
    const isOpen = navMobile.classList.contains('open');
    if (isOpen) {
        navMobile.classList.remove('open');
        hamburgerBtn.classList.remove('active');
    } else {
        navMobile.classList.add('open');
        hamburgerBtn.classList.add('active');
    }
});
closeMenuBtn.addEventListener('click', () => {
    navMobile.classList.remove('open');
    hamburgerBtn.classList.remove('active');
});

// Partículas roxas customizadas
const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
    for (let i = 0; i < 150; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.width = `${Math.random() * 3 + 1}px`;
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = `rgba(168, 85, 247, ${Math.random() * 0.5 + 0.3})`;
        particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particlesContainer.appendChild(particle);
    }
}