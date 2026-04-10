/* 
  Froebel School - Core Logic
*/

document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle Logic
    const menuBtn = document.querySelector('.menu-btn');
    const mobileClose = document.querySelector('.mobile-close');
    const navRight = document.querySelector('.nav-right');
    
    if (menuBtn && navRight) {
        menuBtn.addEventListener('click', () => {
            navRight.classList.add('mobile-active');
            document.body.style.overflow = 'hidden';
        });

        if (mobileClose) {
            mobileClose.addEventListener('click', () => {
                navRight.classList.remove('mobile-active');
                document.body.style.overflow = '';
            });
        }

        // Close when clicking links
        navRight.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navRight.classList.remove('mobile-active');
                document.body.style.overflow = '';
            });
        });

        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navRight.classList.contains('mobile-active')) {
                navRight.classList.remove('mobile-active');
                document.body.style.overflow = '';
            }
        });
    }

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                
                // If it's a stagger container, animate children
                if (entry.target.classList.contains('stagger-container')) {
                    const children = entry.target.querySelectorAll('.animate-child');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('show');
                        }, index * 200); // 200ms stagger
                    });
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate, .stagger-container').forEach(el => {
        observer.observe(el);
    });

    // Hero Slider Shuffle Logic
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        const slideInterval = setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000); // 5 seconds per slide
    }

    // Horizontal Scroll for Events - Optional mouse-wheel support
    const eventScroll = document.querySelector('.horizontal-scroll');
    if (eventScroll) {
        eventScroll.addEventListener('wheel', (evt) => {
            evt.preventDefault();
            eventScroll.scrollLeft += evt.deltaY;
        });
    }
    // Gallery Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => {
                    b.classList.remove('btn-secondary');
                    b.classList.add('btn-outline');
                });
                
                // Add active class to clicked button
                btn.classList.add('btn-secondary');
                btn.classList.remove('btn-outline');

                const filterValue = btn.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
});
