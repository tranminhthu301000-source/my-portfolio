// ===== Mobile Navigation Toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });
}

// ===== Gallery Modal (Portfolio) =====
class GalleryModal {
    constructor({ modal, modalImg, modalCaption, triggerSelector }) {
        this.modal = modal;
        this.modalImg = modalImg;
        this.modalCaption = modalCaption;
        this.triggers = document.querySelectorAll(triggerSelector);
        this.closeBtn = document.getElementById('modalClose');
        this.bindEvents();
    }

    open(src, alt) {
        if (!this.modal) return;
        this.modalImg.src = src;
        this.modalCaption.textContent = alt || '';
        this.modal.style.display = 'flex';
        this.modal.setAttribute('aria-hidden', 'false');
    }

    close() {
        if (!this.modal) return;
        this.modal.style.display = 'none';
        this.modal.setAttribute('aria-hidden', 'true');
    }

    bindEvents() {
        if (!this.triggers || !this.modal) return;

        this.triggers.forEach(img => {
            img.addEventListener('click', () => {
                this.open(img.src, img.alt);
            });
        });

        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }

        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
    }
}

const modalElement = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const modalCaption = document.getElementById('modalCaption');

if (modalElement && modalImg && modalCaption) {
    new GalleryModal({
        modal: modalElement,
        modalImg,
        modalCaption,
        triggerSelector: '.gallery-item img'
    });
}

// ===== SkillBar Class (animated skill bars) =====
class SkillBar {
    constructor(element) {
        this.element = element;
        this.fill = element.querySelector('.skill-bar-fill');
        this.percent = element.dataset.skill || 0;
    }

    animate() {
        if (!this.fill) return;
        this.fill.style.width = this.percent + '%';
    }
}

const skillCards = document.querySelectorAll('.skill-card');
const skillBars = [];

skillCards.forEach(card => {
    const bar = new SkillBar(card);
    skillBars.push(bar);
});

// Animate skill bars on page load
window.addEventListener('load', () => {
    skillBars.forEach(bar => bar.animate());
});

// ===== Contact Form Validation =====
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm && formMessage) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const message = contactForm.message.value.trim();

        if (name.length < 2) {
            formMessage.textContent = 'Name must be at least 2 characters.';
            formMessage.style.color = 'tomato';
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            formMessage.textContent = 'Please enter a valid email address.';
            formMessage.style.color = 'tomato';
            return;
        }

        if (message.length < 10) {
            formMessage.textContent = 'Message must be at least 10 characters.';
            formMessage.style.color = 'tomato';
            return;
        }

        formMessage.textContent = 'Your message has been processed (demo only).';
        formMessage.style.color = '#22c55e';
        contactForm.reset();
    });
}
