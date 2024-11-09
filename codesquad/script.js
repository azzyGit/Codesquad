// script.js

// Menu Mobile Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});


document.addEventListener('DOMContentLoaded', () => {
    const matrixRain = document.querySelector('.matrix-rain');
    const binaryText = document.querySelector('.binary-text');
    const progressSegments = document.querySelectorAll('.progress-segments span');
    const floatingElements = document.querySelector('.floating-elements');
    
    // Criar efeito Matrix
    function createMatrixRain() {
        const chars = '01';
        for(let i = 0; i < 50; i++) {
            const drop = document.createElement('div');
            drop.className = 'matrix-drop';
            drop.style.left = `${Math.random() * 100}%`;
            drop.style.animationDelay = `${Math.random() * 2}s`;
            drop.style.animationDuration = `${1 + Math.random() * 2}s`;
            matrixRain.appendChild(drop);
        }
    }

    // Animar texto binário
    function animateBinaryText() {
        setInterval(() => {
            binaryText.textContent = Array(30).fill(0)
                .map(() => Math.random() > 0.5 ? '1' : '0').join('');
        }, 100);
    }

    // Animar segmentos de progresso
    progressSegments.forEach((segment, index) => {
        segment.style.animationDelay = `${index * 0.2}s`;
    });

    // Criar partículas de código flutuantes
    function createCodeParticles() {
        const particles = ['</>', '{}', '()', '', '#', '*', '&&', '=>'];
        particles.forEach((particle, index) => {
            const elem = document.createElement('div');
            elem.className = 'code-particle';
            elem.textContent = particle;
            elem.style.left = `${Math.random() * 100}%`;
            elem.style.animationDelay = `${index * 0.5}s`;
            floatingElements.appendChild(elem);
        });
    }

    createMatrixRain();
    animateBinaryText();
    createCodeParticles();

    // Remover tela de loading após 4 segundos
    setTimeout(() => {
        document.querySelector('.loading-screen').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.loading-screen').style.display = 'none';
        }, 1000);
    }, 4000);
});



const particles = document.querySelectorAll('.code-particle');
particles.forEach(particle => {
    const randomX = Math.random() * window.innerWidth;
    particle.style.left = `${randomX}px`;
});



// Função para criar efeito de digitação com animação de apagar
function typeWriter(element, texts, speed = 300, pause = 2000) {
    let textIndex = 0;
    let charIndex = 0;
    const cursorElement = document.querySelector('.cursor');

    function type() {
        if (charIndex < texts[textIndex].length) {
            element.textContent += texts[textIndex][charIndex];
            charIndex++;

            // Controla a velocidade de digitação com variação aleatória
            const randomSpeed = speed + Math.random() * 90;
            setTimeout(type, randomSpeed);
        } else {
            // Pausa antes de apagar
            setTimeout(erase, pause);
        }
    }

    function erase() {
        if (charIndex > 0) {
            element.textContent = texts[textIndex].substring(0, charIndex - 1);
            charIndex--;

            setTimeout(erase, speed / 1); // Velocidade de apagar
        } else {
            // Troca para a próxima frase
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, speed);
        }
    }

    element.style.opacity = '1'; // Fade-in inicial
    cursorElement.style.opacity = '1'; // Fade-in do cursor
    setTimeout(type, speed);
}

// Iniciar animação de digitação no carregamento da página
window.addEventListener('load', () => {
    const dynamicElement = document.getElementById('dynamic-text');
    const subtitleElement = document.getElementById('hero-subtitle');

    const titleTexts = [
        "Transforme sua presença digital",
        "Impulsione seu negócio online",
        "Desenvolvimento web com excelência"
    ];
    const subtitleText = "Desenvolvimento web profissional com foco em resultados";

    // Executa a animação de digitação para o título com várias frases
    typeWriter(dynamicElement, titleTexts, 100);

    // Aparece o subtítulo após um tempo
    setTimeout(() => {
        subtitleElement.style.opacity = '1'; // Fade-in para o subtítulo
        subtitleElement.textContent = subtitleText;
    }, 4000);
});


// Smooth Scroll para links do menu
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Fecha o menu mobile se estiver aberto
            navLinks.classList.remove('active');
        }
    });
});

// Animação de entrada dos elementos
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Inicializa os elementos com opacidade 0
document.querySelectorAll('.animate-on-scroll').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Slider de Depoimentos
const testimonials = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
}

// Eventos para os dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    });
});

// Autoplay do slider
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Form Submission
const contactForm = document.getElementById('contact-form');
const newsletterForm = document.querySelector('.newsletter-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica de envio do formulário
    alert('Mensagem enviada com sucesso!');
    contactForm.reset();
});

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica de inscrição na newsletter
    alert('Inscrição realizada com sucesso!');
    newsletterForm.reset();
});

// Header Scroll Effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.boxShadow = 'none';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Efeito Parallax no Hero
const heroImage = document.querySelector('.hero-image');

window.addEventListener('scroll', () => {
    const scroll = window.pageYOffset;
    if (heroImage) {
        heroImage.style.transform = `translateY(${scroll * 0.4}px)`;
    }

    // Cookie Modal Implementation
document.addEventListener('DOMContentLoaded', function() {
    const cookieModal = document.querySelector('.cookie-modal');
    
    // Função para mostrar o modal
    function showCookieModal() {
        // Verifica se já tem consentimento salvo
        if (!localStorage.getItem('cookieConsent')) {
            // Adiciona a classe active após um pequeno delay
            setTimeout(() => {
                cookieModal.classList.add('active');
            }, 1000);
        }
    }

    // Função para salvar as preferências
    function savePreferences(all = false) {
        const analyticsConsent = document.querySelector('.cookie-preferences .cookie-preference-item:nth-child(2) .slider');
        const marketingConsent = document.querySelector('.cookie-preferences .cookie-preference-item:nth-child(3) .slider');
        
        const preferences = {
            essential: true, // Sempre true pois é necessário
            analytics: all ? true : analyticsConsent.checked,
            marketing: all ? true : marketingConsent.checked,
            timestamp: new Date().toISOString()
        };

        localStorage.setItem('cookieConsent', JSON.stringify(preferences));
        cookieModal.classList.remove('active');
    }

    // Event Listeners para os botões
    const acceptAllBtn = document.querySelector('.cookie-actions').lastElementChild;
    const acceptSelectedBtn = document.querySelector('.cookie-actions').firstElementChild;

    acceptAllBtn.addEventListener('click', () => {
        savePreferences(true);
    });

    acceptSelectedBtn.addEventListener('click', () => {
        savePreferences(false);
    });

    // Mostrar o modal quando a página carregar
    showCookieModal();
});
});