// Enhanced JavaScript for Portfolio Website

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }, 1000);
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    scrollProgress.style.width = scrollPercent + '%';
});

// Particle Background
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// Typing Animation
function typeWriter() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;
    
    const text = typingText.textContent;
    typingText.textContent = '';
    typingText.style.borderRight = '3px solid var(--primary)';
    
    let i = 0;
    function type() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        } else {
            setTimeout(() => {
                typingText.style.borderRight = '3px solid transparent';
            }, 1000);
        }
    }
    
    setTimeout(type, 1500);
}

typeWriter();

// Enhanced Contact Form Validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Check if EmailJS is available
        if (typeof emailjs === 'undefined') {
            alert('Email service is not available. Please try again later or contact directly at kquophilyrical@gmail.com');
            return;
        }
        
        // Clear previous errors
        clearErrors();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };
        
        // Validate form
        let isValid = true;
        
        if (!formData.name) {
            showError('nameError', 'Name is required');
            isValid = false;
        }
        
        if (!formData.email) {
            showError('emailError', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(formData.email)) {
            showError('emailError', 'Please enter a valid email');
            isValid = false;
        }
        
        if (!formData.message) {
            showError('messageError', 'Message is required');
            isValid = false;
        }
        
        if (isValid) {
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Send email using EmailJS
            console.log('Sending email with data:', formData);
            
            try {
                const response = await emailjs.send("service_l4dp3ep", "template_iibkwip", {
                    from_name: formData.name,
                    from_email: formData.email,
                    subject: formData.subject || 'Portfolio Contact Form Message',
                    message: formData.message,
                    to_email: "kquophilyrical@gmail.com"
                });
                
                console.log('SUCCESS!', response.status, response.text);
                
                // Show success message
                const successMsg = document.getElementById('formSuccess');
                successMsg.style.display = 'block';
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMsg.style.display = 'none';
                }, 5000);
                
            } catch (error) {
                console.log('FAILED...', error);
                console.log('Error details:', error.text || error.message);
                console.log('Full error object:', error);
                
                // Show specific error message
                let errorMessage = `Error: ${error.text || error.message || 'Unknown error'}`;
                
                if (error.text === 'The browser is blocked from sending emails') {
                    errorMessage = 'Please use a live server (localhost or https) to send emails.';
                } else if (error.text && (error.text.includes('SERVICE') || error.text.includes('TEMPLATE'))) {
                    errorMessage = 'Email service configuration error. Please check your EmailJS settings.';
                } else if (error.text && error.text.includes('Public Key')) {
                    errorMessage = 'Invalid EmailJS Public Key. Please check your configuration.';
                } else if (error.text && error.text.includes('Account')) {
                    errorMessage = 'EmailJS account not found. Please check your account setup.';
                }
                
                alert(errorMessage + '\n\nAlternatively, you can email directly to: kquophilyrical@gmail.com');
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    const inputElement = errorElement.previousElementSibling;
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    inputElement.classList.add('error');
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.form-error');
    const inputElements = document.querySelectorAll('.contact-form input, .contact-form textarea');
    
    errorElements.forEach(element => {
        element.style.display = 'none';
        element.textContent = '';
    });
    
    inputElements.forEach(element => {
        element.classList.remove('error');
    });
    
    const successMsg = document.getElementById('formSuccess');
    if (successMsg) {
        successMsg.style.display = 'none';
    }
}

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('nav ul');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animate skill bars when they come into view
const skillBars = document.querySelectorAll('.skill-level');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-skill-level');
        bar.classList.add('animated');
        bar.style.width = level + '%';
    });
}

// Intersection Observer for skill bars
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skills-container').forEach(section => {
    observer.observe(section);
});

// Enhanced Modal with Zoom Animation
const modal = document.getElementById('projectModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const closeModal = document.querySelector('.close-modal');
const viewProjectBtns = document.querySelectorAll('.view-project-btn');

// Open modal with enhanced animation
function openModal(imageSrc, title) {
  modalImage.src = imageSrc;
  modalTitle.textContent = title;
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  
  // Add entrance animation
  setTimeout(() => {
    modal.classList.add('modal-active');
  }, 10);
}

// Close modal with enhanced animation
function closeModalFunc() {
  modal.classList.remove('modal-active');
  
  setTimeout(() => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }, 300);
}

// Event listeners for project buttons
viewProjectBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    const imageSrc = this.getAttribute('data-image');
    const title = this.getAttribute('data-title');
    openModal(imageSrc, title);
  });
});

// Close modal when clicking the X button
closeModal.addEventListener('click', closeModalFunc);

// Close modal when clicking outside the modal content
modal.addEventListener('click', function(e) {
  if (e.target === modal) {
    closeModalFunc();
  }
});

// Close modal with ESC key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && modal.style.display === 'block') {
    closeModalFunc();
  }
});