/* 
  Froebel School - Animation Logic
*/

document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for Scroll Reveals
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // If it's a stagger container, animate children
                if (entry.target.classList.contains('stagger-container')) {
                    const children = entry.target.querySelectorAll('.card, .animate-child');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('show');
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, index * 150);
                    });
                }
                // Optional: stop observing once shown
                // revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with .animate class
    document.querySelectorAll('.animate, .stagger-container').forEach(el => {
        revealObserver.observe(el);
    });
});
