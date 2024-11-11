// script.js


document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Captura os valores dos campos do formulário
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Validação básica
    if (!name || !email || !message) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Dados a serem enviados para o webhook
    const webhookData = {
        content: null,
        embeds: [{
            title: "Novo Contato Recebido",
            color: 3447003,
            fields: [
                {
                    name: "Nome",
                    value: name,
                    inline: false
                },
                {
                    name: "Email",
                    value: email,
                    inline: false
                },
                {
                    name: "Mensagem",
                    value: message,
                    inline: false
                }
            ],
            footer: {
                text: "Formulário de Contato",
                icon_url: "https://i.imgur.com/AfFp7pu.png"
            },
            timestamp: new Date().toISOString()
        }]
    };

    try {
        // Envia o formulário para o webhook do Discord
        const response = await fetch('https://discord.com/api/webhooks/1304915154517102622/3PYRAkDmM3CHkzzijnTXjcm-DPAtri-N0inXN39g8ZqImE3wyVyIYieJcEB4Lty2_xqp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(webhookData)
        });

        // Verificação do status da resposta
        if (response.ok) {
            alert("Mensagem enviada com sucesso!");
            document.getElementById('contact-form').reset();
        } else {
            alert("Erro ao enviar a mensagem. Tente novamente.");
        }
    } catch (error) {
        console.error("Erro na solicitação:", error);
        alert("Erro ao enviar a mensagem. Verifique a conexão e tente novamente.");
    }
});

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
    dynamicElement.style.minWidth = '250px'; // Baseado no maior texto esperado
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

function toggleChat() {
            const chat = document.getElementById('whatsappChat');
            chat.classList.toggle('active');
            // Remove o badge de notificação quando o chat é aberto
            document.querySelector('.notification-badge').style.display = 'none';
        }

        function sendMessage() {
            const input = document.getElementById('messageInput');
            const message = input.value.trim();
            
            if (message) {
                const chatBody = document.getElementById('chatBody');
                const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                
                // Adiciona mensagem do usuário
                chatBody.innerHTML += `
                    <div class="message sent">
                        <div class="message-content">
                            ${message}
                        </div>
                        <div class="message-time">${time}</div>
                    </div>
                `;

                input.value = '';
                chatBody.scrollTop = chatBody.scrollHeight;

                // Simula resposta automática após 1 segundo
                setTimeout(() => {
                    chatBody.innerHTML += `
                        <div class="message received">
                            <div class="message-content">
                                Obrigado pela sua mensagem! Em breve um de nossos atendentes entrará em contato. 🙂
                            </div>
                            <div class="message-time">${time}</div>
                        </div>
                    `;
                    chatBody.scrollTop = chatBody.scrollHeight;
                }, 1000);

                // Redireciona para o WhatsApp após 2 segundos
                setTimeout(() => {
                    const phone = '5511999999999'; // Substitua pelo seu número
                    const text = encodeURIComponent(message);
                    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${text}`, '_blank');
                }, 2000);
            }
        }

        // Permite enviar mensagem com Enter
        document.getElementById('whatsapp-button').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        document.addEventListener('DOMContentLoaded', function() {
            // Função para atualizar o horário
            function updateTime() {
                const timeDisplay = document.getElementById('timeDisplay');
                if (timeDisplay) {  // Verifica se o elemento existe
                    const now = new Date();
                    const timeString = now.toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    });
                    timeDisplay.textContent = timeString;
                }
            }
        
            // Atualiza imediatamente
            updateTime();
        
            // Atualiza a cada minuto
            setInterval(updateTime, 60000);
        });

        function startProject() {
            // Mostrar vídeo em tela cheia
            const video = document.getElementById('videoFullScreen');
            video.style.display = 'block';
        
            // Reproduzir vídeo
            video.play();
        
            // Reproduzir som
            const audio = document.getElementById('audio');
            audio.play();
        
            // Colocar vídeo em tela cheia
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.mozRequestFullScreen) { // Firefox
                video.mozRequestFullScreen();
            } else if (video.webkitRequestFullscreen) { // Chrome, Safari and Opera
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) { // IE/Edge
                video.msRequestFullscreen();
            }
        }