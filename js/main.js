document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        if (themeToggle) {
            themeToggle.innerHTML = '<svg class="icon" viewBox="0 0 24 24"><use href="#icon-sun"/></svg>';
        }
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            body.classList.toggle('light-theme');
            
            if (body.classList.contains('light-theme')) {
                themeToggle.innerHTML = '<svg class="icon" viewBox="0 0 24 24"><use href="#icon-sun"/></svg>';
                localStorage.setItem('theme', 'light');
            } else {
                themeToggle.innerHTML = '<svg class="icon" viewBox="0 0 24 24"><use href="#icon-moon"/></svg>';
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    const navItems = document.querySelectorAll('.nav-links a');
    
    const currentUrl = window.location.href;
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        
        let shouldActivate = currentUrl.includes(href);
        
        if (href === 'works.html' && currentUrl.includes('photography.html')) {
            shouldActivate = true;
        }
        
        if (shouldActivate) {
            navItems.forEach(link => link.classList.remove('active'));
            item.classList.add('active');
        }

        item.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const target = e.currentTarget;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            target.appendChild(ripple);
            
            const rect = target.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            navItems.forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
            
            navLinks.classList.remove('active');
            
            setTimeout(() => {
                document.body.classList.add('page-transition');
                setTimeout(() => {
                    window.location.href = href;
                }, 100);
            }, 100);
        });
    });

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            console.log('Form submitted:', data);
            
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }

    const workCards = document.querySelectorAll('.work-card');
    workCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });

    const modalOverlay = document.getElementById('photoModal');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closePhotoGallery();
            }
        });
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    const scrollThreshold = 150;
    let hasNavigated = false;
    let lastScrollTop = 0;

    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        window.addEventListener('scroll', function handleScroll() {
            if (hasNavigated) return;
            
            const scrollHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;
            const clientHeight = window.innerHeight;
            
            if (scrollTop > scrollThreshold && scrollTop + clientHeight >= scrollHeight - 50) {
                hasNavigated = true;
                window.removeEventListener('scroll', handleScroll);
                setTimeout(() => {
                    window.location.href = 'works.html';
                }, 200);
            }
        });
    }

    if (window.location.pathname === '/works.html' || window.location.pathname.endsWith('/works.html')) {
        window.addEventListener('scroll', function handleScroll() {
            if (hasNavigated) return;
            
            const scrollHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;
            const clientHeight = window.innerHeight;
            const isScrollingDown = scrollTop > lastScrollTop;
            lastScrollTop = scrollTop;
            
            if (isScrollingDown && scrollTop > scrollThreshold && scrollTop + clientHeight >= scrollHeight - 50) {
                hasNavigated = true;
                window.removeEventListener('scroll', handleScroll);
                setTimeout(() => {
                    window.location.href = 'resume.html';
                }, 200);
            }
            
            if (!isScrollingDown && scrollTop <= 0) {
                hasNavigated = true;
                window.removeEventListener('scroll', handleScroll);
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 200);
            }
        });
    }

    if (window.location.pathname === '/resume.html' || window.location.pathname.endsWith('/resume.html')) {
        window.addEventListener('scroll', function handleScroll() {
            if (hasNavigated) return;
            
            const scrollHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;
            const clientHeight = window.innerHeight;
            const isScrollingDown = scrollTop > lastScrollTop;
            lastScrollTop = scrollTop;
            
            if (isScrollingDown && scrollTop > scrollThreshold && scrollTop + clientHeight >= scrollHeight - 50) {
                hasNavigated = true;
                window.removeEventListener('scroll', handleScroll);
                setTimeout(() => {
                    window.location.href = 'contact.html';
                }, 200);
            }
            
            if (!isScrollingDown && scrollTop <= 0) {
                hasNavigated = true;
                window.removeEventListener('scroll', handleScroll);
                setTimeout(() => {
                    window.location.href = 'works.html';
                }, 200);
            }
        });
    }

    if (window.location.pathname === '/contact.html' || window.location.pathname.endsWith('/contact.html')) {
        window.addEventListener('scroll', function handleScroll() {
            if (hasNavigated) return;
            
            const scrollTop = window.scrollY;
            const isScrollingDown = scrollTop > lastScrollTop;
            lastScrollTop = scrollTop;
            
            if (!isScrollingDown && scrollTop <= 0) {
                hasNavigated = true;
                window.removeEventListener('scroll', handleScroll);
                setTimeout(() => {
                    window.location.href = 'resume.html';
                }, 200);
            }
        });
    }
});