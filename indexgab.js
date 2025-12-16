// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let scroll;
    let isScrollInitialized = false;
    let isPageLoaded = false;

    // Loader functionality - FIXED
    const loader = document.querySelector('.loader');
    const progressBar = document.querySelector('.progress-bar');

    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            // Hide loader after progress completes
            setTimeout(() => {
                loader.classList.add('loaded');
                isPageLoaded = true;
                
                // Initialize scroll after loader hides
                setTimeout(initScroll, 500);
                initAnimations();
            }, 500);
        }
        progressBar.style.width = `${progress}%`;
    }, 100);

    // Initialize Locomotive Scroll - FIXED
    function initScroll() {
        if (isScrollInitialized) return;
        
        scroll = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]'),
            smooth: true,
            smartphone: {
                smooth: true,
                breakpoint: 768
            },
            tablet: {
                smooth: true,
                breakpoint: 1024
            },
            multiplier: 0.8,
            lerp: 0.1,
            reloadOnContextChange: false,
            touchMultiplier: 1.5,
            getDirection: true,
            getSpeed: true
        });

        // Update scroll on resize
        window.addEventListener('resize', () => {
            setTimeout(() => scroll.update(), 500);
        });

        // Refresh scroll after images load
        window.addEventListener('load', () => {
            setTimeout(() => scroll.update(), 1000);
        });

        isScrollInitialized = true;
        
        // Initialize GSAP ScrollTrigger after scroll is ready
        setTimeout(() => {
            gsap.registerPlugin(ScrollTrigger);
            ScrollTrigger.scrollerProxy("[data-scroll-container]", {
                scrollTop(value) {
                    return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
                },
                getBoundingClientRect() {
                    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
                },
                pinType: document.querySelector("[data-scroll-container]").style.transform ? "transform" : "fixed"
            });

            ScrollTrigger.addEventListener("refresh", () => scroll.update());
            ScrollTrigger.defaults({ scroller: "[data-scroll-container]" });
            ScrollTrigger.refresh();
        }, 1000);
    }

    // Initialize animations
    function initAnimations() {
        // Hero animations
        animateHero();
        
        // Navigation scroll effect
        setupNavigation();
        
        // Mobile menu
        setupMobileMenu();
        
        // Product card hover effects
        setupProductCards();
        
        // Social cards hover effects
        setupSocialCards();
        
        // Newsletter form
        setupNewsletter();
        
        // Back to top button
        setupBackToTop();
        
        // Custom cursor
        setupCustomCursor();
        
        // Section entrance animations
        setupSectionAnimations();
        
        // Interactive elements
        setupInteractiveElements();
    }

    // Hero animations
    function animateHero() {
        // Animate title lines
        gsap.to('.title-line', {
            y: 0,
            opacity: 1,
            duration: 1.5,
            stagger: 0.3,
            ease: "power4.out",
            delay: 0.5
        });

        // Animate subtitle
        gsap.to('.hero-subtitle', {
            y: 0,
            opacity: 1,
            duration: 1.2,
            delay: 1,
            ease: "power2.out"
        });

        // Animate CTA buttons
        gsap.to('.hero-cta', {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 1.5,
            ease: "power2.out"
        });

        // Animate floating shapes
        gsap.to('.shape', {
            scale: 1,
            opacity: 0.3,
            duration: 2,
            stagger: 0.2,
            delay: 0.2,
            ease: "power2.out"
        });
    }

    // Navigation scroll effect
    function setupNavigation() {
        const navbar = document.querySelector('.navbar');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.classList.add('scrolled');
                
                if (currentScroll > lastScroll && currentScroll > 200) {
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

        // Navigation link hover effects
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(link, {
                    scale: 1.1,
                    duration: 0.3,
                    ease: "back.out(1.7)"
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
    }

    // Mobile menu toggle
    function setupMobileMenu() {
        const menuBtn = document.querySelector('.menu-hamburger');
        const navMenu = document.querySelector('.nav-center');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (!menuBtn || !navMenu) return;

        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            if (menuBtn.classList.contains('active')) {
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

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                
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
            });
        });
    }

    // Product cards hover effects
    function setupProductCards() {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    scale: 1.02,
                    duration: 0.3,
                    ease: "power2.out"
                });
                
                gsap.to(card.querySelector('.product-image img'), {
                    scale: 1.1,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
                
                gsap.to(card.querySelector('.product-image img'), {
                    scale: 1,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });
        });
    }

    // Social cards hover effects
    function setupSocialCards() {
        const socialCards = document.querySelectorAll('.social-card');
        
        socialCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -10,
                    duration: 0.3,
                    ease: "back.out(1.7)"
                });
                
                gsap.to(card.querySelector('.card-icon'), {
                    scale: 1.2,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
                
                gsap.to(card.querySelector('.card-icon'), {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    }

    // Newsletter form
    function setupNewsletter() {
        const newsletterForm = document.querySelector('.newsletter-form');
        
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const submitBtn = newsletterForm.querySelector('button');
                const emailInput = newsletterForm.querySelector('input[type="email"]');
                
                // Button animation
                gsap.to(submitBtn, {
                    scale: 0.95,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.inOut",
                    onComplete: () => {
                        // Success state
                        submitBtn.innerHTML = '<i class="fas fa-check"></i><span>Subscribed!</span>';
                        submitBtn.style.background = 'linear-gradient(45deg, #4CAF50, #2E7D32)';
                        
                        // Create confetti effect
                        createConfetti();
                        
                        // Reset after delay
                        setTimeout(() => {
                            newsletterForm.reset();
                            submitBtn.innerHTML = '<span>Subscribe</span><i class="fas fa-paper-plane"></i>';
                            submitBtn.style.background = 'linear-gradient(45deg, #d0bae5, #b39ad9)';
                        }, 3000);
                    }
                });
            });
        }
    }

    // Confetti effect
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
                x: gsap.utils.random(-300, 300),
                y: gsap.utils.random(-300, 300),
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
    function setupBackToTop() {
        const backToTop = document.querySelector('.back-to-top');
        
        if (backToTop) {
            backToTop.addEventListener('click', () => {
                if (scroll) {
                    scroll.scrollTo(0, {
                        duration: 1.5,
                        easing: [0.25, 0.1, 0.25, 1]
                    });
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                
                // Button animation
                gsap.to(backToTop, {
                    y: -10,
                    duration: 0.3,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.inOut"
                });
            });

            // Show/hide button on scroll
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 500) {
                    backToTop.style.opacity = '1';
                    backToTop.style.visibility = 'visible';
                } else {
                    backToTop.style.opacity = '0';
                    backToTop.style.visibility = 'hidden';
                }
            });
        }
    }

    // Custom cursor - FIXED
    function setupCustomCursor() {
        const cursor = document.querySelector('.custom-cursor');
        const follower = document.querySelector('.cursor-follower');
        
        // Only setup custom cursor on desktop
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches && cursor && follower) {
            let mouseX = 0;
            let mouseY = 0;
            let followerX = 0;
            let followerY = 0;
            let speed = 0.15;

            // Mouse move event
            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
                cursor.style.left = mouseX + 'px';
                cursor.style.top = mouseY + 'px';
            });

            // Animate follower
            function animateFollower() {
                // Calculate distance
                let distX = mouseX - followerX;
                let distY = mouseY - followerY;
                
                // Move follower
                followerX = followerX + (distX * speed);
                followerY = followerY + (distY * speed);
                
                // Apply position
                follower.style.left = followerX + 'px';
                follower.style.top = followerY + 'px';
                
                // Continue animation
                requestAnimationFrame(animateFollower);
            }
            
            // Start animation
            animateFollower();

            // Hover effects on interactive elements
            const interactiveElements = document.querySelectorAll(
                'a, button, .cta-btn, .writing-btn, .buy-btn, .social-card, .product-card, .back-to-top'
            );

            interactiveElements.forEach(element => {
                element.addEventListener('mouseenter', () => {
                    gsap.to(cursor, {
                        scale: 2,
                        backgroundColor: '#f3ece6',
                        duration: 0.3
                    });
                    gsap.to(follower, {
                        scale: 1.5,
                        borderColor: '#f3ece6',
                        duration: 0.3
                    });
                });

                element.addEventListener('mouseleave', () => {
                    gsap.to(cursor, {
                        scale: 1,
                        backgroundColor: '#d0bae5',
                        duration: 0.3
                    });
                    gsap.to(follower, {
                        scale: 1,
                        borderColor: 'rgba(208, 186, 229, 0.5)',
                        duration: 0.3
                    });
                });
            });
        } else {
            // Hide custom cursor on touch devices
            if (cursor) cursor.style.display = 'none';
            if (follower) follower.style.display = 'none';
        }
    }

    // Section entrance animations
    function setupSectionAnimations() {
        // Observer for section animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Animate writing section
                    if (entry.target.id === 'writing') {
                        gsap.from('.writing-left', {
                            x: -100,
                            opacity: 0,
                            duration: 1,
                            ease: "power2.out"
                        });
                        gsap.from('.writing-right', {
                            x: 100,
                            opacity: 0,
                            duration: 1,
                            ease: "power2.out",
                            delay: 0.2
                        });
                    }
                    
                    // Animate products section
                    if (entry.target.id === 'products') {
                        gsap.from('.product-card', {
                            y: 100,
                            opacity: 0,
                            duration: 0.8,
                            stagger: 0.1,
                            ease: "power2.out"
                        });
                    }
                    
                    // Animate about section
                    if (entry.target.id === 'about') {
                        gsap.from('.about-left', {
                            x: -100,
                            opacity: 0,
                            duration: 1,
                            ease: "power2.out"
                        });
                        gsap.from('.about-right', {
                            x: 100,
                            opacity: 0,
                            duration: 1,
                            ease: "power2.out",
                            delay: 0.2
                        });
                    }
                    
                    // Animate social section
                    if (entry.target.id === 'social') {
                        gsap.from('.social-card', {
                            y: 100,
                            opacity: 0,
                            duration: 0.8,
                            stagger: 0.1,
                            ease: "power2.out"
                        });
                    }
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }

    // Interactive elements animations
    function setupInteractiveElements() {
        // Button hover effects
        const buttons = document.querySelectorAll('.cta-btn, .writing-btn, .buy-btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                gsap.to(button, {
                    scale: 1.05,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });
            
            button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                    scale: 1,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });
        });

        // Image hover effects
        const images = document.querySelectorAll('.image-container img, .image-wrapper img');
        
        images.forEach(img => {
            const parent = img.parentElement;
            
            parent.addEventListener('mouseenter', () => {
                gsap.to(img, {
                    scale: 1.05,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });
            
            parent.addEventListener('mouseleave', () => {
                gsap.to(img, {
                    scale: 1,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });
        });
    }

    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            
            if (document.body.classList.contains('light-theme')) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                document.body.style.setProperty('--bg-color', '#f3ece6');
                document.body.style.setProperty('--text-color', '#222021');
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                document.body.style.setProperty('--bg-color', '#000');
                document.body.style.setProperty('--text-color', '#f3ece6');
            }
        });
    }

    // Handle page refresh - FIXED
    window.addEventListener('beforeunload', () => {
        // Save scroll position
        sessionStorage.setItem('scrollPosition', window.pageYOffset);
    });

    window.addEventListener('load', () => {
        // Restore scroll position if exists
        const savedPosition = sessionStorage.getItem('scrollPosition');
        if (savedPosition) {
            window.scrollTo(0, parseInt(savedPosition));
            sessionStorage.removeItem('scrollPosition');
        }
    });

    // Handle page visibility changes - FIXED
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && isScrollInitialized && scroll) {
            // Refresh scroll when page becomes visible again
            setTimeout(() => {
                scroll.update();
                ScrollTrigger.refresh();
            }, 100);
        }
    });

    // Prevent scroll issues on refresh - FIXED
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    // Force scroll to top on page load
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }

    // Additional safety for scroll initialization
    window.addEventListener('load', () => {
        if (!isScrollInitialized && isPageLoaded) {
            setTimeout(initScroll, 1000);
        }
    });
});