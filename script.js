// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Locomotive Scroll
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        smartphone: { smooth: true },
        tablet: { smooth: true },
        multiplier: 0.8,
        lerp: 0.1
    });

    // Update scroll on resize
    window.addEventListener('resize', () => scroll.update());

    // Loading animation
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        gsap.to(loader, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                loader.style.display = 'none';
                scroll.update();
            }
        });
    }, 2000);

    // Animate loader text
    gsap.to('.loader-char', {
        y: -20,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out"
    });

    // Animate hero title
    gsap.to('.title-line', {
        y: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out",
        delay: 2.5
    });

    // Navigation hover effect
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', (e) => {
            gsap.to(link, {
                scale: 1.1,
                duration: 0.3
            });
        });
        
        link.addEventListener('mouseleave', (e) => {
            gsap.to(link, {
                scale: 1,
                duration: 0.3
            });
        });
    });

    // Menu toggle for mobile
    const menuBtn = document.querySelector('.menu-hamburger');
    const navMenu = document.querySelector('.nav-center');
    
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        if (menuBtn.classList.contains('active')) {
            gsap.to('.hamburger-line:nth-child(1)', {
                rotate: 45,
                y: 6,
                duration: 0.3
            });
            gsap.to('.hamburger-line:nth-child(2)', {
                opacity: 0,
                duration: 0.3
            });
            gsap.to('.hamburger-line:nth-child(3)', {
                rotate: -45,
                y: -6,
                duration: 0.3
            });
            gsap.to(navMenu, {
                x: 0,
                opacity: 1,
                duration: 0.5
            });
        } else {
            gsap.to('.hamburger-line:nth-child(1)', {
                rotate: 0,
                y: 0,
                duration: 0.3
            });
            gsap.to('.hamburger-line:nth-child(2)', {
                opacity: 1,
                duration: 0.3
            });
            gsap.to('.hamburger-line:nth-child(3)', {
                rotate: 0,
                y: 0,
                duration: 0.3
            });
            gsap.to(navMenu, {
                x: 100,
                opacity: 0,
                duration: 0.5
            });
        }
    });

    // Animate stats counter
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += Math.ceil(target / 100);
                if (current > target) current = target;
                stat.textContent = current;
                requestAnimationFrame(updateCounter);
            }
        };
        
        // Start counter when in view
        scroll.on('call', (value) => {
            if (value === 'counter') {
                updateCounter();
            }
        });
        
        // Trigger counter when section is in view
        gsap.to(stat, {
            scrollTrigger: {
                trigger: stat,
                start: 'top 80%',
                onEnter: updateCounter
            }
        });
    });

    // Floating cards animation
    gsap.to('.floating-card', {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.5
    });

    // Custom cursor
    const cursor = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3
        });
    });

    // Hover effect for cards
    const cards = document.querySelectorAll('.work-card, .gallery-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(cursor, {
                scale: 3,
                duration: 0.3
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(cursor, {
                scale: 1,
                duration: 0.3
            });
        });
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Animation for submit button
            const submitBtn = contactForm.querySelector('.submit-btn');
            gsap.to(submitBtn, {
                scale: 0.9,
                duration: 0.1,
                yoyo: true,
                repeat: 1
            });
            
            // Simulate form submission
            setTimeout(() => {
                // In real app, you would send data to server here
                alert('Message sent successfully!');
                contactForm.reset();
            }, 1000);
        });
    }

    // Scroll to top
    const scrollTopBtn = document.querySelector('.scroll-top');
    scrollTopBtn.addEventListener('click', () => {
        scroll.scrollTo(0, {
            duration: 1.5,
            easing: [0.25, 0.1, 0.25, 1]
        });
    });

    // Gallery navigation
    const galleryPrev = document.querySelector('.gallery-nav.prev');
    const galleryNext = document.querySelector('.gallery-nav.next');
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentGalleryIndex = 0;

    function updateGallery() {
        gsap.to(galleryItems, {
            opacity: 0.3,
            scale: 0.9,
            duration: 0.5
        });
        
        gsap.to(galleryItems[currentGalleryIndex], {
            opacity: 1,
            scale: 1,
            duration: 0.5
        });
    }

    galleryNext.addEventListener('click', () => {
        currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
        updateGallery();
    });

    galleryPrev.addEventListener('click', () => {
        currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
        updateGallery();
    });

    // Initialize gallery
    updateGallery();

    // Scroll-triggered animations
    gsap.utils.toArray('[data-scroll-speed]').forEach(element => {
        gsap.to(element, {
            y: () => scroll.scroll.instance.scroll.y * element.dataset.scrollSpeed * -1,
            ease: "none",
            scrollTrigger: {
                trigger: element.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                invalidateOnRefresh: true
            }
        });
    });

    // Theme toggle (optional dark/light mode)
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        
        if (document.body.classList.contains('light-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            document.body.style.background = '#fff';
            document.body.style.color = '#000';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            document.body.style.background = '#000';
            document.body.style.color = '#fff';
        }
    });

    // Parallax effect for hero background
    gsap.to('.hero-bg .bg-img', {
        y: 100,
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // Animate section titles on scroll
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            x: -100,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });
});