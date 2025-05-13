// script.js

mapboxgl.accessToken = 'pk.eyJ1Ijoid2luZGlndWVzcyIsImEiOiJjbWFtbGRycmIwa2xoMnJxMGJmNjYwYjZiIn0.a6XJTM1zPHONDFb8b15IIw';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v11',
    center: [122.5654, 12.8797],
    zoom: 5,
    pitch: 0,
    bearing: 0
});

const locations = [
    // ... (your locations array remains the same)
    {
        name: "Lingayen Gulf",
        coordinates: [120.1847, 16.0214],
        events: "Japanese Landings in 1941",
        image: "../InteractiveMap/images/lingayen-gulf.jpg",
        description: "Primary landing site for Japanese invasion forces in December 1941.",
        zoom: 10,
        pitch: 45,
        bearing: 0,
        pageUrl: "../Location Pages/lingayen/lingayen.html"
    },
    {
        name: "Bataan Peninsula",
        coordinates: [120.4833, 14.6667],
        events: "Fall of Bataan, Bataan Death March",
        image: "../InteractiveMap/images/bataan.png",
        description: "Site of the famous last stand and subsequent death march of American and Filipino prisoners of war.",
        zoom: 11,
        pitch: 45,
        bearing: 0,
        pageUrl: "../Location Pages/bataan/bataan.html"
    },
    {
        name: "Corregidor Island",
        coordinates: [120.5833, 14.3833],
        events: "Fall of Corregidor",
        image: "../InteractiveMap/images/corregidor.jpg",
        description: "Island fortress that was the last American stronghold to fall in 1942.",
        zoom: 13,
        pitch: 60,
        bearing: 45,
        pageUrl: "../Location Pages/corregidor/corregidor.html"
    },
    {
        name: "Central Luzon",
        coordinates: [120.7107, 15.4828],
        events: "Hukbalahap Guerrilla Movement",
        image: "../InteractiveMap/images/central-luzon.jpg",
        description: "Region where the communist Hukbalahap guerrilla movement was most active.",
        zoom: 9,
        pitch: 45,
        bearing: 0,
        pageUrl: "../Location Pages/central-luzon/central-luzon.html"
    },
    {
        name: "Manila",
        coordinates: [120.9842, 14.5995],
        events: "Battle of Manila, Japanese Occupation, Atrocities",
        image: "../InteractiveMap/images/manila.jpg",
        description: "Capital city that suffered devastating destruction and civilian casualties during the 1945 battle.",
        zoom: 12,
        pitch: 45,
        bearing: 0,
        pageUrl: "../Location Pages/manila/manila-intro.html"
    },
    {
        name: "Leyte",
        coordinates: [124.8500, 10.9500],
        events: "MacArthur's Return, Battle of Leyte Gulf",
        image: "../InteractiveMap/images/leyte.jpg",
        description: "Site of MacArthur's famous return and the largest naval battle in history.",
        zoom: 10,
        pitch: 45,
        bearing: 0,
        pageUrl: "../Location Pages/leyte/leyte.html"
    },
    {
        name: "Visayas Region",
        coordinates: [122.5654, 11.0000],
        events: "Resistance Activities",
        image: "../InteractiveMap/images/visayass.jpg",
        description: "Various guerrilla groups operated throughout the central islands.",
        zoom: 8,
        pitch: 45,
        bearing: 0,
        pageUrl: "../Location Pages/Platon/VisayasCode/Visayas.html"
    },
    {
        name: "Mindanao Region",
        coordinates: [125.0000, 8.0000],
        events: "Guerrilla Activities",
        image: "../InteractiveMap/images/mindanao.jpg",
        description: "Though less documented, resistance movements were active in the southern islands.",
        zoom: 8,
        pitch: 45,
        bearing: 0,
        pageUrl: "../Location Pages/Platon/MindanaoCode/Mindanao.html"
    }
];

const storyContainer = document.querySelector('.story-container');
const locationListUl = document.getElementById('location-list'); // Get the UL for the sidebar

// --- Helper function to create slug-like IDs ---
function generateSectionId(name, index) {
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    return `location-${index}-${slug}`;
}

// Add story sections dynamically AND populate sidebar
locations.forEach((location, index) => {
    const section = document.createElement('section');
    section.className = 'story-section';
    const sectionId = generateSectionId(location.name, index); // Use helper for consistent ID
    section.id = sectionId;
    section.innerHTML = `
        <img src="${location.image}" alt="${location.name}" style="width:100%;max-width:550px;height:340px;object-fit:cover;border-radius:3px;margin-bottom:1.2rem;box-shadow:0 0 30px rgba(229,57,53,0.15);">
        <h2>${location.name}</h2>
        <div style="color:var(--accent-red);font-size:1.1rem;font-weight:bold;margin-bottom:0.7rem;">${location.events}</div>
        <p>${location.description}</p>
        <a class="map-button" href="${location.pageUrl}">View Location Page</a> 
    `; // <-- ANG PAGBABAGO AY NANDITO: Tinanggal ang target="_blank" at rel="noopener"
    storyContainer.appendChild(section);

    // Create sidebar list items
    if (locationListUl) { // Check if sidebar UL exists
        const listItem = document.createElement('li');
        listItem.textContent = location.name;
        listItem.setAttribute('data-index', index);
        listItem.setAttribute('data-section-id', sectionId); // Store the section ID
        locationListUl.appendChild(listItem);
    }
});

// Cache DOM elements (sections needs to be queried AFTER they are created)
const sections = document.querySelectorAll('.story-section');
const intro = document.getElementById('intro');
let currentLocationIndex = -1;
let isAnimating = false;
let lastScrollTime = 0;
const SCROLL_THROTTLE = 30; // ms

// Smooth map transition function - ADD forceTransition parameter
function transitionMap(location, isIntro = false, forceTransition = false) {
    if (isAnimating && !forceTransition) {
        if (isIntro && (map.getZoom() > (5 + 0.5) || map.getPitch() > 5)) {
            // Allow intro transition to proceed and interrupt current
        } else if (!isIntro) {
            return;
        } else if (isIntro && map.getZoom() <= (5 + 0.5) && map.getPitch() <= 5) {
            isAnimating = false;
            return;
        }
    }
    isAnimating = true;

    const zoomOutConfig = {
        center: [122.5654, 12.8797],
        zoom: 5,
        pitch: 0,
        bearing: 0,
        duration: 800,
        essential: true
    };

    const zoomInConfig = location ? {
        center: location.coordinates,
        zoom: location.zoom,
        pitch: location.pitch,
        bearing: location.bearing,
        duration: 1300,
        essential: true
    } : null;

    if (isIntro) {
        zoomOutConfig.duration = 400;
    }

    map.flyTo(zoomOutConfig);

    if (zoomInConfig && !isIntro) {
        setTimeout(() => {
            map.flyTo(zoomInConfig);
            setTimeout(() => {
                isAnimating = false;
            }, zoomInConfig.duration);
        }, zoomOutConfig.duration);
    } else {
        setTimeout(() => {
            isAnimating = false;
        }, zoomOutConfig.duration);
    }
}

// --- Sidebar Click Handler ---
if (locationListUl) {
    locationListUl.addEventListener('click', function(e) {
        if (e.target && e.target.nodeName === 'LI') {
            const clickedIndex = parseInt(e.target.getAttribute('data-index'));
            const targetLocation = locations[clickedIndex];
            const targetSectionId = e.target.getAttribute('data-section-id');
            const targetSection = document.getElementById(targetSectionId);

            if (targetLocation && targetSection) {
                // Force transition for direct click
                transitionMap(targetLocation, false, true);

                // Scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });

                // Update active state in sidebar
                document.querySelectorAll('#location-list li').forEach(li => {
                    li.classList.remove('active-location');
                });
                e.target.classList.add('active-location');

                // Explicitly manage visibility for the clicked section
                sections.forEach(sec => sec.classList.remove('visible'));
                setTimeout(() => {
                    targetSection.classList.add('visible');
                }, 800); // Delay to match map transition visual cue

                currentLocationIndex = clickedIndex;
            }
        }
    });
}

// Improved debounce function
function debounce(func, wait) { /* ... (your existing debounce) ... */
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) { /* ... (your existing throttle) ... */
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

const observer = new IntersectionObserver(debounce((entries) => {
    const now = Date.now();
    if (now - lastScrollTime < SCROLL_THROTTLE) return;
    lastScrollTime = now;

    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.id === 'intro') {
                currentLocationIndex = -1;
                transitionMap(null, true, false); // Not forced for observer
                if (locationListUl) {
                    document.querySelectorAll('#location-list li').forEach(li => li.classList.remove('active-location'));
                }
                return;
            }

            const sectionIndex = Array.from(sections).indexOf(entry.target); // Simpler way to get index

            if (sectionIndex !== -1) {
                const location = locations[sectionIndex];
                // Only transition if it's a new section AND not already animating to it
                if (currentLocationIndex !== sectionIndex) {
                    transitionMap(location, false, false); // Not forced for observer
                    currentLocationIndex = sectionIndex;

                    // Update active state in sidebar
                    if (locationListUl) {
                        document.querySelectorAll('#location-list li').forEach(li => li.classList.remove('active-location'));
                        const activeLi = locationListUl.querySelector(`li[data-index="${sectionIndex}"]`);
                        if (activeLi) {
                            activeLi.classList.add('active-location');
                        }
                    }
                }
                // Handle visibility (ensure it becomes visible after transition if map was moved)
                entry.target.classList.remove('visible'); // Remove first to re-trigger animation if needed
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, 800); // Match map zoom-in duration
            }
        } else {
            if (entry.target.id !== 'intro') {
                entry.target.classList.remove('visible');
                // Optional: remove active class from sidebar when scrolling out of view
                // const sectionIndex = Array.from(sections).indexOf(entry.target);
                // if (locationListUl && currentLocationIndex === sectionIndex) { // Only if it was the active one
                //     const activeLi = locationListUl.querySelector(`li[data-index="${sectionIndex}"]`);
                //     if (activeLi) activeLi.classList.remove('active-location');
                // }
            }
        }
    });
}, 20), {
    threshold: 0.6,
    rootMargin: '-10% 0px -10% 0px'
});

observer.observe(intro);
sections.forEach(section => observer.observe(section));

// Optimized click handlers for navigation (if any # links exist beyond sidebar)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // This might conflict if you have other # links. For now, only intro handled
        if (this.getAttribute('href') === '#intro') {
            e.preventDefault();
            const targetSection = document.getElementById('intro');
            if (targetSection) {
                currentLocationIndex = -1;
                transitionMap(null, true, true); // Force for direct nav
                targetSection.scrollIntoView({ behavior: 'smooth' });
                 if (locationListUl) {
                    document.querySelectorAll('#location-list li').forEach(li => li.classList.remove('active-location'));
                }
            }
        }
        // If you have other # links pointing to story sections by their new IDs, handle them here.
    });
});


window.addEventListener('scroll', throttle(() => {
    const scrollPosition = window.scrollY;
    const introPosition = intro.offsetTop;
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (scrollPosition < introPosition + 100) {
        // Only transition if not already at intro or transitioning to intro
        if (currentLocationIndex !== -1 || (map.getZoom() > 5.5 || map.getPitch() !== 0)) {
             transitionMap(null, true, true); // Force intro state on scroll to top
        }
        currentLocationIndex = -1; // Ensure this is set
        if (locationListUl) {
            document.querySelectorAll('#location-list li').forEach(li => li.classList.remove('active-location'));
        }
        scrollIndicator.classList.remove('up');
        scrollIndicator.textContent = '↓';
    }

    const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
    if (isAtBottom) {
        scrollIndicator.classList.add('up');
        scrollIndicator.textContent = '↑';
    } else if (scrollPosition > introPosition + 100) { // Only reset to down arrow if past intro
        scrollIndicator.classList.remove('up');
        scrollIndicator.textContent = '↓';
    }
}, 50), { passive: true });


window.addEventListener('DOMContentLoaded', () => {
    let initialSectionFound = false;
    for (let i = 0; i < sections.length; i++) {
        const rect = sections[i].getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            sections[i].classList.remove('visible');
            const location = locations[i];
            if (location) {
                transitionMap(location, false, true); // Force on load
                setTimeout(() => {
                    sections[i].classList.add('visible');
                }, 800);

                if (locationListUl) {
                    document.querySelectorAll('#location-list li').forEach(li => li.classList.remove('active-location'));
                    const activeLi = locationListUl.querySelector(`li[data-index="${i}"]`);
                    if (activeLi) activeLi.classList.add('active-location');
                }
                currentLocationIndex = i;
                initialSectionFound = true;
            }
            break;
        }
    }
    // If no story section is initially visible (e.g. page loaded at the very top, showing intro)
    if (!initialSectionFound) {
        const introRect = intro.getBoundingClientRect();
        if (introRect.top < window.innerHeight && introRect.bottom > 0) {
            transitionMap(null, true, true); // Force intro state
            if (locationListUl) {
                 document.querySelectorAll('#location-list li').forEach(li => li.classList.remove('active-location'));
            }
            currentLocationIndex = -1;
        }
    }
});


// Map load optimizations (your existing code)
map.on('load', () => {
    map.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 14
    });
    map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.2 });
    map.setRenderWorldCopies(false);
    map.dragRotate.disable();
    map.touchZoomRotate.disableRotation();
    map.setMaxZoom(14);

    // Preloading can be intensive, ensure it's beneficial
    // locations.forEach(loc => {
    //     map.prefetchZoomDelta = 4; // Consider impact on initial load time
    //     map.flyTo({ /* ... */ duration: 0, essential: false });
    // });
    // map.flyTo({ /* ... initial view ... */ duration: 0, essential: false });
});

// Handle window resize (your existing code)
let resizeTimeout;
window.addEventListener('resize', () => {
    if (resizeTimeout) {
        clearTimeout(resizeTimeout);
    }
    resizeTimeout = setTimeout(() => {
        map.resize();
    }, 250);
});