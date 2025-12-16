// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Locomotive Scroll
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        smartphone: { smooth: true },
        tablet: { smooth: true },
        multiplier: 0.6,
        lerp: 0.08,
        reloadOnContextChange: true,
        touchMultiplier: 2
    });

    // Update scroll on resize
    window.addEventListener('resize', () => scroll.update());

    // Loading animation
    const loader = document.querySelector('.loader');
    const loaderChars = document.querySelectorAll('.loader-char');
    
    // Animate loader characters
    gsap.to(loaderChars, {
        y: -30,
        rotation: 10,
        opacity: 1,
        duration: 1.5,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.5
    });

    // Hide loader
    setTimeout(() => {
        gsap.to(loader, {
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
                loader.style.display = 'none';
                scroll.update();
                // Trigger hero animations after loader
                animateHero();
            }
        });
    }, 3000);

    // Animate hero section
    function animateHero() {
        // Animate title lines
        gsap.to('.title-line span', {
            y: 0,
            opacity: 1,
            duration: 1.5,
            stagger: 0.2,
            ease: "power4.out"
        });

        // Animate subtitle
        gsap.to('.hero-subtitle', {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.8,
            ease: "power2.out"
        });

        // Animate CTA buttons
        gsap.to('.hero-cta', {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 1.2,
            ease: "power2.out"
        });

        // Animate shapes
        gsap.to('.shape', {
            scale: 1,
            opacity: 0.3,
            duration: 2,
            stagger: 0.2,
            ease: "power2.out"
        });
    }

    // Navigation scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
            
            if (currentScroll > lastScroll) {
                // Scrolling down
                gsap.to(navbar, {
                    y: -100,
                    duration: 0.3,
                    ease: "power2.out"
                });
            } else {
                // Scrolling up
                gsap.to(navbar, {
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        } else {
            navbar.classList.remove('scrolled');
            gsap.to(navbar, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        }
        
        lastScroll = currentScroll;
    });

    // Navigation hover effects
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                scale: 1.1,
                duration: 0.3,
                ease: "back.out(1.7)"
            });
            
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: radial-gradient(circle, rgba(208, 186, 229, 0.3) 0%, transparent 70%);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                pointer-events: none;
            `;
            link.appendChild(ripple);
            
            gsap.to(ripple, {
                width: '100px',
                height: '100px',
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
                onComplete: () => ripple.remove()
            });
        });
        
        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // Mobile menu toggle
    const menuBtn = document.querySelector('.menu-hamburger');
    const navMenu = document.querySelector('.nav-center');
    
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        
        if (menuBtn.classList.contains('active')) {
            // Show menu
            navMenu.style.display = 'block';
            gsap.fromTo(navMenu,
                { y: -50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
            );
            
            // Animate hamburger to X
            gsap.to('.hamburger-line:nth-child(1)', {
                rotate: 45,
                y: 9,
                duration: 0.3
            });
            gsap.to('.hamburger-line:nth-child(2)', {
                opacity: 0,
                duration: 0.3
            });
            gsap.to('.hamburger-line:nth-child(3)', {
                rotate: -45,
                y: -9,
                duration: 0.3
            });
        } else {
            // Hide menu
            gsap.to(navMenu, {
                y: -50,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    navMenu.style.display = 'none';
                }
            });
            
            // Animate X to hamburger
            gsap.to('.hamburger-line:nth-child(1)', {
                rotate: 0,
                y: 0,
                duration: 0.3
            });
            gsap.to('.hamburger-line:nth-child(2)', {
                opacity: 1,
                duration: 0.3,
                delay: 0.1
            });
            gsap.to('.hamburger-line:nth-child(3)', {
                rotate: 0,
                y: 0,
                duration: 0.3
            });
        }
    });

    // Product cards hover effects
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Scale up image slightly
            gsap.to(card.querySelector('img'), {
                scale: 1.1,
                duration: 0.5,
                ease: "power2.out"
            });
            
            // Add glow effect
            gsap.to(card, {
                boxShadow: '0 40px 80px rgba(208, 186, 229, 0.3)',
                duration: 0.5,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset image scale
            gsap.to(card.querySelector('img'), {
                scale: 1,
                duration: 0.5,
                ease: "power2.out"
            });
            
            // Reset glow
            gsap.to(card, {
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
                duration: 0.5,
                ease: "power2.out"
            });
        });
    });

    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        scroll.on('call', (value) => {
            if (value === 'skills') {
                gsap.to(bar, {
                    width: bar.style.width,
                    duration: 1.5,
                    ease: "power2.out"
                });
            }
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const submitBtn = newsletterForm.querySelector('button');
            
            // Animation
            gsap.to(submitBtn, {
                scale: 0.9,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut",
                onComplete: () => {
                    // Success animation
                    gsap.to(submitBtn, {
                        background: 'linear-gradient(45deg, #4CAF50, #2E7D32)',
                        duration: 0.3
                    });
                    
                    // Create confetti effect
                    createConfetti();
                    
                    // Reset form after delay
                    setTimeout(() => {
                        newsletterForm.reset();
                        gsap.to(submitBtn, {
                            background: 'linear-gradient(45deg, #d0bae5, #b39ad9)',
                            duration: 0.3
                        });
                    }, 2000);
                }
            });
        });
    }

    // Confetti effect function
    function createConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(confettiContainer);

        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: linear-gradient(45deg, #d0bae5, #f3ece6, #b39ad9);
                border-radius: 2px;
                top: 50%;
                left: 50%;
            `;
            confettiContainer.appendChild(confetti);

            gsap.to(confetti, {
                x: gsap.utils.random(-200, 200),
                y: gsap.utils.random(-200, 200),
                rotation: gsap.utils.random(0, 360),
                scale: 0,
                duration: 1.5,
                ease: "power2.out",
                onComplete: () => confetti.remove()
            });
        }

        setTimeout(() => confettiContainer.remove(), 2000);
    }

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    backToTop.addEventListener('click', () => {
        scroll.scrollTo(0, {
            duration: 2,
            easing: [0.25, 0.1, 0.25, 1]
        });
        
        // Button animation
        gsap.to(backToTop, {
            y: -10,
            duration: 0.3,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
        });
    });

    // Social card hover effects
    const socialCards = document.querySelectorAll('.social-card');
    socialCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Icon animation
            gsap.to(card.querySelector('.card-icon'), {
                y: -10,
                duration: 0.3,
                ease: "back.out(1.7)"
            });
            
            // Color shift
            gsap.to(card, {
                borderColor: 'rgba(208, 186, 229, 0.5)',
                duration: 0.3
            });
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset icon
            gsap.to(card.querySelector('.card-icon'), {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
            
            // Reset border
            gsap.to(card, {
                borderColor: 'rgba(243, 236, 230, 0.1)',
                duration: 0.3
            });
        });
    });

    // Image hover effects
    const images = document.querySelectorAll('.image-container img, .image-wrapper img');
    images.forEach(img => {
        img.addEventListener('mouseenter', () => {
            gsap.to(img, {
                scale: 1.05,
                duration: 0.5,
                ease: "power2.out"
            });
        });
        
        img.addEventListener('mouseleave', () => {
            gsap.to(img, {
                scale: 1,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    });

    // Theme toggle (optional)
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        const body = document.body;
        const isDark = body.style.backgroundColor === 'rgb(255, 255, 255)';
        
        if (isDark) {
            // Switch to dark
            body.style.backgroundColor = '#000';
            body.style.color = '#fff';
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            
            gsap.to('body', {
                background: '#000',
                duration: 0.5,
                ease: "power2.inOut"
            });
        } else {
            // Switch to light
            body.style.backgroundColor = '#fff';
            body.style.color = '#000';
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            
            gsap.to('body', {
                background: '#fff',
                duration: 0.5,
                ease: "power2.inOut"
            });
        }
    });

    // Parallax effects for sections
    gsap.utils.toArray('[data-scroll-speed]').forEach(element => {
        if (element.dataset.scrollDirection === 'horizontal') {
            gsap.to(element, {
                x: () => scroll.scroll.instance.scroll.y * element.dataset.scrollSpeed * -1,
                ease: "none",
                scrollTrigger: {
                    trigger: element.parentElement,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                    invalidateOnRefresh: true
                }
            });
        } else {
            gsap.to(element, {
                y: () => scroll.scroll.instance.scroll.y * element.dataset.scrollSpeed * -1,
                ease: "none",
                scrollTrigger: {
                    trigger: element.parentElement,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                    invalidateOnRefresh: true
                }
            });
        }
    });

    // Section entrance animations
    gsap.utils.toArray('[data-scroll-section]').forEach(section => {
        gsap.from(section, {
            y: 100,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Counter animation for stats (if any)
    const counters = document.querySelectorAll('[data-count]');
    if (counters.length > 0) {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += Math.ceil(target / 100);
                    if (current > target) current = target;
                    counter.textContent = current;
                    requestAnimationFrame(updateCounter);
                }
            };
            
            // Trigger when section is in view
            gsap.to(counter, {
                scrollTrigger: {
                    trigger: counter,
                    start: "top 80%",
                    onEnter: updateCounter
                }
            });
        });
    }

    // Infinite animation for floating dots
    gsap.to('.floating-dots .dot', {
        y: -100,
        x: 100,
        rotation: 360,
        duration: 10,
        repeat: -1,
        stagger: 2,
        ease: "none"
    });

    // Pulse animation for circles
    gsap.to('.pulse-circles .circle', {
        scale: 1.5,
        opacity: 0,
        duration: 3,
        repeat: -1,
        ease: "power2.inOut",
        stagger: 1
    });

    // Writing button trail effect
    const writingBtn = document.querySelector('.writing-btn');
    if (writingBtn) {
        writingBtn.addEventListener('mousemove', (e) => {
            const rect = writingBtn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            writingBtn.style.setProperty('--x', `${x}px`);
            writingBtn.style.setProperty('--y', `${y}px`);
        });
    }

    // Initialize scroll triggers
    ScrollTrigger.refresh();
});