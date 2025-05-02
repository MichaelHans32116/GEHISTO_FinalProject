// facts will show when clicked
function showFact(section) {
    const facts = {
        prelude: "The objective of the plan was to secure the unconditional surrender of Japan, an objective that might necessitate an invasion of the Japanese home islands. As such an invasion promised to be a 'vast undertaking,' it would be necessary to secure a large supply base from which a great aerial offensive could be mounted against Japan. According to the original plan, this base was to be located in China, but the Mariana Islands were afterward substituted for China. The plan called for the acquisition of successive island bases which could be used as 'steppingstones,' preferably those which would shorten the sea route, provide for its security, and at the same time deny to the Japanese bases from which they might interfere with the Allied line of communications. The main effort was to be through the waters of the Pacific Ocean. Nimitz' operations were to be conducted west through the Japanese mandated islands, while MacArthur's proceeded northwest along the New Guinea coast. The two series of operations were to be mutually supporting.",
        battle: "The battle for Leyte Gulf was over. It had ended in a resounding victory for the Americans, whose losses of 1 light carrier, 2 escort carriers, 2 destroyers, and 1 destroyer escort were small in comparison with the Japanese losses of 3 battleships, 1 large carrier, 3 light carriers, 6 heavy cruisers, 4 light cruisers, and 9 destroyers. As the Japanese retreated throughout the 25th and 26th of October, carrier- and land-based aircraft struck at the enemy vessels and inflicted fresh injuries upon them.",
        landing: "The U.S. landing on Leyte in October 1944 began with over 202,500 American troops, escalating to 257,766 by January 1945, though persistent logistical shortfalls left effective strength lagging—by December, shortages reached 1,228 officers and 22,536 enlisted men despite 187,647 authorized. Rapid reinforcement via amphibious operations underscored Allied dominance, yet delayed cargo discharge and tropical diseases strained frontline readiness. This unprecedented mobilization, surpassing initial Japanese defenders 3-to-1, secured Leyte as a strategic foothold, enabling airbases that crippled Japan’s hold on the Philippines. The campaign’s scale highlighted America’s industrial might and the grueling realities of Pacific warfare, where sheer troop numbers and supply tenacity proved decisive.",
        aftermath: "The liberation of Leyte had been accomplished at no slight cost. During the peak month, January 1945, there were 257,766 American Army, including Air Forces, troops on Leyte. The total Army casualties for the Leyte Campaign were over 15,500, including more than 3,500 killed and nearly 12,000 wounded. It is impossible, with data now available, to determine with any degree of exactitude the number of Japanese who participated in the campaign or their casualties. The estimates of the Sixth and Eighth Armies vary greatly, as do those of the various Japanese sources. The Sixth Army estimated that it had killed 56,263 and captured 389 men, and that as of 26 December 1944, when it relinquished control to Eighth Army, about 5,000 of the Japanese remained on the islands of Leyte and Samar."
    };
    
    const factElement = document.getElementById(`${section}-fact`);
    factElement.textContent = facts[section];
    factElement.style.display = factElement.style.display === 'block' ? 'none' : 'block';
}

// play speech
document.getElementById('speech-btn').addEventListener('click', function() {
    const audio = document.getElementById('speech-audio');
    if (audio.paused) {
        audio.play();
        this.textContent = 'Pause Speech';
    } else {
        audio.pause();
        this.textContent = 'Play MacArthur\'s Speech';
    }
});

// zoom on timeline
function zoomTimeline() {
    const timeline = document.querySelector('.timeline-container');
    timeline.style.transition = 'transform 0.5s ease';
    timeline.style.transform = timeline.style.transform === 'scale(1.1)' ? 'scale(1)' : 'scale(1.1)';
}

//smooth scrolling of navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        
        // Update active class
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// update the navigation highlighting function
function updateNavHighlight() {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('nav a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Initialize the navigation
document.addEventListener('DOMContentLoaded', function() {
    
    // Add indicator elements to each nav link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        link.appendChild(indicator);
    });
    
    // Set initial active state
    updateNavHighlight();
});

// Update on scroll
window.addEventListener('scroll', function() {
    updateNavHighlight();
});

// Smooth scrolling for navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 20,
                behavior: 'smooth'
            });
            
            // Update URL without page jump
            history.pushState(null, null, targetId);
        }
    });
});