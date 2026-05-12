// Initialize AOS Animation Library
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        once: true,
        offset: 60,
        duration: 1000,
        easing: 'ease-out-cubic',
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }

        // Scroll Spy - Highlight active section
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileCloseBtn = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.remove('translate-x-full');
            mobileMenu.classList.add('translate-x-0');
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.add('translate-x-full');
            mobileMenu.classList.remove('translate-x-0');
            document.body.style.overflow = '';
        }
    }

    if (mobileBtn) mobileBtn.addEventListener('click', toggleMenu);
    if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Text Reveal Animation for Hero Headline
    const revealText = document.querySelector('.animate-text-reveal');
    if (revealText) {
        const text = revealText.textContent;
        revealText.textContent = '';
        revealText.style.opacity = '1';

        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                revealText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            }
        }
        setTimeout(typeWriter, 600);
    }

    // Dynamic Number Counter Animation
    const speed = 150;
    
    function startCounter(counter) {
        const target = +counter.getAttribute('data-target');
        const updateCount = () => {
            const count = +counter.innerText.replace(/\./g, '').replace(/,/g, '');
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc).toLocaleString('tr-TR');
                setTimeout(updateCount, 12);
            } else {
                counter.innerText = target.toLocaleString('tr-TR');
            }
        };
        updateCount();
    }

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.counter').forEach(counter => {
        counterObserver.observe(counter);
    });

    // Parallax effect for hero section on mouse move
    const heroSection = document.getElementById('hero');
    const parallaxImg = document.querySelector('.hero-parallax');

    if (heroSection && parallaxImg && window.innerWidth > 768) {
        heroSection.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth - e.pageX * 2) / 80;
            const y = (window.innerHeight - e.pageY * 2) / 80;
            parallaxImg.style.transform = `scale(1.08) translate(${x}px, ${y}px)`;
        });

        heroSection.addEventListener('mouseleave', () => {
            parallaxImg.style.transform = 'scale(1) translate(0px, 0px)';
        });
    }

    // Staggered reveal for feature cards on scroll
    const featureCards = document.querySelectorAll('.feature-card');
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                featureObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        featureObserver.observe(card);
    });

    // Pricing Tab Switcher
    window.switchTab = function(tabName) {
        // Hide all panes
        document.querySelectorAll('.pricing-pane').forEach(pane => {
            pane.classList.add('hidden');
        });
        
        // Remove active style from all buttons
        document.querySelectorAll('.pricing-tab-btn').forEach(btn => {
            btn.classList.remove('bg-terra', 'text-white');
            btn.classList.add('text-dark/60');
        });
        
        // Show active pane
        const activePane = document.getElementById(`tab-${tabName}`);
        activePane.classList.remove('hidden');
        
        // Restart counters in active pane
        activePane.querySelectorAll('.counter').forEach(counter => {
            counter.innerText = '0';
            startCounter(counter);
        });
        
        // Add active style to current button
        const activeBtn = document.getElementById(`btn-${tabName}`);
        activeBtn.classList.remove('text-dark/60');
        activeBtn.classList.add('bg-terra', 'text-white');
    };

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const button = item.querySelector('button');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('i');

        button.addEventListener('click', () => {
            const isOpen = !answer.classList.contains('max-h-0');
            
            // Close all other FAQs
            faqItems.forEach(otherItem => {
                const otherAnswer = otherItem.querySelector('.faq-answer');
                const otherIcon = otherItem.querySelector('i');
                otherAnswer.style.maxHeight = '0';
                otherIcon.classList.remove('rotate-45');
                otherAnswer.classList.add('max-h-0');
            });

            if (!isOpen) {
                answer.classList.remove('max-h-0');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.classList.add('rotate-45');
            }
        });
    });

    // Scroll To Top Button Logic
    const scrollTopBtn = document.getElementById('scroll-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('scroll-show');
        } else {
            scrollTopBtn.classList.remove('scroll-show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Countdown Timer Logic
    let targetYear = 2026;
    let targetDate = new Date(`May 27, ${targetYear} 00:00:00`).getTime();

    function getNextKurbanDate() {
        let year = targetYear;
        let date = new Date(`May 27, ${year} 00:00:00`).getTime();
        while (date <= new Date().getTime()) {
            year += 1;
            date = new Date(`May 27, ${year} 00:00:00`).getTime();
        }
        return { year, date };
    }

    function updateCountdown() {
        const now = new Date().getTime();
        let gap = targetDate - now;

        const dEl = document.getElementById('days');
        const hEl = document.getElementById('hours');
        const mEl = document.getElementById('minutes');
        const sEl = document.getElementById('seconds');

        if (!dEl) return;

        if (gap <= 0) {
            const next = getNextKurbanDate();
            targetYear = next.year;
            targetDate = next.date;
            gap = targetDate - now;
        }

        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const d = Math.floor(gap / day);
        const h = Math.floor((gap % day) / hour);
        const m = Math.floor((gap % hour) / minute);
        const s = Math.floor((gap % minute) / second);

        dEl.innerText = d < 10 ? '0' + d : d;
        hEl.innerText = h < 10 ? '0' + h : h;
        mEl.innerText = m < 10 ? '0' + m : m;
        sEl.innerText = s < 10 ? '0' + s : s;
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();
});

// Video Modal Logic
window.openVideoModal = function() {
    const modal = document.getElementById('videoModal');
    const modalContent = document.getElementById('videoModalContent');
    const video = document.getElementById('modalVideo');
    
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modalContent.classList.remove('scale-95');
    modalContent.classList.add('scale-100');
    
    // Play video when modal opens
    video.currentTime = 0;
    video.play();
};

window.closeVideoModal = function() {
    const modal = document.getElementById('videoModal');
    const modalContent = document.getElementById('videoModalContent');
    const video = document.getElementById('modalVideo');
    
    modal.classList.add('opacity-0', 'pointer-events-none');
    modalContent.classList.remove('scale-100');
    modalContent.classList.add('scale-95');
    
    // Stop video when modal closes
    video.pause();
};

// Close modal on outside click
document.addEventListener('click', function(e) {
    const modal = document.getElementById('videoModal');
    if (e.target === modal) {
        closeVideoModal();
    }
});
