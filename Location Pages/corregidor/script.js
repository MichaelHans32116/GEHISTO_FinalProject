// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Timeline drag/slide functionality
document.addEventListener('DOMContentLoaded', function() {
    // Hide all timeline items by default after a short delay for animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    setTimeout(() => {
        timelineItems.forEach(item => item.classList.remove('visible'));
    }, 600);

    // Add drag/click event to each handle
    document.querySelectorAll('.timeline-drag-handle').forEach((handle, idx) => {
        let isDragging = false;
        let startX = 0;
        let currentX = 0;
        let threshold = 60; // px to drag to open/close
        const item = handle.closest('.timeline-item');

        // Click to toggle
        handle.addEventListener('click', function(e) {
            e.stopPropagation();
            item.classList.toggle('visible');
        });

        // Drag to open/close
        handle.addEventListener('mousedown', function(e) {
            isDragging = true;
            startX = e.clientX;
            document.body.style.userSelect = 'none';
        });
        document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            currentX = e.clientX;
        });
        document.addEventListener('mouseup', function(e) {
            if (!isDragging) return;
            isDragging = false;
            document.body.style.userSelect = '';
            let delta = e.clientX - startX;
            if (!item.classList.contains('visible') && delta > threshold) {
                item.classList.add('visible');
            } else if (item.classList.contains('visible') && delta < -threshold) {
                item.classList.remove('visible');
            }
        });
    });

    // Timeline expansion functionality
    const headers = document.querySelectorAll('.timeline-header');
    headers.forEach(header => {
        header.addEventListener('click', function() {
            const timelineItem = this.closest('.timeline-item');
            timelineItem.classList.toggle('expanded');
            if (timelineItem.classList.contains('expanded')) {
                setTimeout(() => {
                    scroll.update();
                }, 300);
            }
        });
    });

    // Handle scroll progress
    const progressBar = document.querySelector('.scroll-progress-bar');
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // Handle navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

// Initialize Locomotive Scroll with enhanced settings
const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    multiplier: 1,
    lerp: 0.05,
    getDirection: true,
    getSpeed: true,
    smartphone: {
        smooth: true,
        breakpoint: 768
    },
    tablet: {
        smooth: true,
        breakpoint: 1024
    },
    // Enhanced interaction settings
    touchMultiplier: 2,
    smoothMobile: true,
    resetNativeScroll: true,
    // Parallax settings
    inertia: 0.8,
    // Performance optimizations
    reloadOnContextChange: true,
    // Scroll direction detection
    direction: 'vertical',
    // Scroll speed control
    scrollFromAnywhere: true,
    // Smooth scrolling behavior
    offset: ['0%', '0%']
});

// Update scroll position on window resize
window.addEventListener('resize', () => {
    scroll.update();
});

// Handle scroll events for additional effects
scroll.on('scroll', (args) => {
    // You can add custom scroll effects here
    if (args.direction === 'down') {
        document.body.classList.add('scrolling-down');
        document.body.classList.remove('scrolling-up');
    } else {
        document.body.classList.add('scrolling-up');
        document.body.classList.remove('scrolling-down');
    }
});
