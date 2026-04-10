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

    // Mobile Menu Toggle (Simplified)
    const menuBtn = document.createElement('div');
    menuBtn.className = 'menu-btn';
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    // Actually, I'll add this directly in HTML, but logic here:
    // This is a placeholder for more complex logic if needed.

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

    // Horizontal Scroll for Events - Optional mouse-wheel support
    const eventScroll = document.querySelector('.horizontal-scroll');
    if (eventScroll) {
        eventScroll.addEventListener('wheel', (evt) => {
            evt.preventDefault();
            eventScroll.scrollLeft += evt.deltaY;
        });
    }
});
