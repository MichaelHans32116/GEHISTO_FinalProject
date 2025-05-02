document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const modal = document.getElementById('modal');
    const learnMoreBtn = document.getElementById('learn-more');
    const closeBtn = document.querySelector('.close-btn');
    
    learnMoreBtn.addEventListener('click', function() {
        modal.style.display = 'block';
    });
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // gallery
    const galleryItems = document.querySelectorAll('.gallery-item');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentIndex = 0;
    
    function showSlide(index) {
        galleryItems.forEach((item, i) => {
            item.style.transform = `translateX(-${index * 100}%)`;
        });
    }
    
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : galleryItems.length - 1;
        showSlide(currentIndex);
    });
    
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex < galleryItems.length - 1) ? currentIndex + 1 : 0;
        showSlide(currentIndex);
    });
    
    // auto slideshow of gallery
    let galleryInterval = setInterval(function() {
        currentIndex = (currentIndex < galleryItems.length - 1) ? currentIndex + 1 : 0;
        showSlide(currentIndex);
    }, 5000);
    
    // pause auto slideshow on gallery when hovered
    const galleryContainer = document.querySelector('.gallery-container');
    galleryContainer.addEventListener('mouseenter', function() {
        clearInterval(galleryInterval);
    });
    
    galleryContainer.addEventListener('mouseleave', function() {
        galleryInterval = setInterval(function() {
            currentIndex = (currentIndex < galleryItems.length - 1) ? currentIndex + 1 : 0;
            showSlide(currentIndex);
        }, 5000);
    });
    
    // smooth scrolling
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
    

    
    
    // highlight the section in nav bar
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});