        mapboxgl.accessToken = 'pk.eyJ1Ijoid2luZGlndWVzcyIsImEiOiJjbWFtbGRycmIwa2xoMnJxMGJmNjYwYjZiIn0.a6XJTM1zPHONDFb8b15IIw';
        
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/dark-v11',
            center: [122.5654, 12.8797],
            zoom: 5,
            pitch: 0,
            bearing: 0
        });

        // Add story sections dynamically
        const locations = [
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
                pageUrl: "../Location Pages/manila/manila.html"
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
        
        locations.forEach(location => {
            const section = document.createElement('section');
            section.className = 'story-section';
            section.id = location.name.toLowerCase();
            section.innerHTML = `
                <img src="${location.image}" alt="${location.name}" style="width:100%;max-width:550px;height:340px;object-fit:cover;border-radius:3px;margin-bottom:1.2rem;box-shadow:0 0 30px rgba(229,57,53,0.15);">
                <h2>${location.name}</h2>
                <div style="color:var(--accent-red);font-size:1.1rem;font-weight:bold;margin-bottom:0.7rem;">${location.events}</div>
                <p>${location.description}</p>
                <a class="map-button" href="${location.pageUrl}" target="_blank" rel="noopener">View Location Page</a>
            `;
            storyContainer.appendChild(section);
        });

        // Optimize map performance
        map.on('load', () => {
            // Add terrain source
            map.addSource('mapbox-dem', {
                'type': 'raster-dem',
                'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
                'tileSize': 512,
                'maxzoom': 14
            });
            
            // Set terrain with reduced exaggeration
            map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.2 });

            // Optimize map rendering
            map.setRenderWorldCopies(false);
            
            // Disable unnecessary features for better performance
            map.dragRotate.disable();
            map.touchZoomRotate.disableRotation();
            
            // Set max zoom level to prevent performance issues
            map.setMaxZoom(14);

            // Preload map tiles for all locations on map load
            locations.forEach(loc => {
                map.prefetchZoomDelta = 4;
                map.flyTo({
                    center: loc.coordinates,
                    zoom: loc.zoom,
                    pitch: loc.pitch,
                    bearing: loc.bearing,
                    duration: 0,
                    essential: false
                });
            });
            // Return to initial view
            map.flyTo({
                center: [122.5654, 12.8797],
                zoom: 5,
                pitch: 0,
                bearing: 0,
                duration: 0,
                essential: false
            });
        });

        // Cache DOM elements
        const sections = document.querySelectorAll('.story-section');
        const intro = document.getElementById('intro');
        let currentLocationIndex = -1;
        let isAnimating = false;
        let lastScrollTime = 0;
        const SCROLL_THROTTLE = 30; // ms

        // Smooth map transition function
        function transitionMap(location, isIntro = false) {
            if (isAnimating) {
                if (isIntro) {
                    isAnimating = false;
                } else {
                    return;
                }
            }
            isAnimating = true;

            const zoomOutConfig = {
                center: [122.5654, 12.8797],
                zoom: 5,
                pitch: 0,
                bearing: 0,
                duration: 500, // Faster zoom out
                essential: true
            };

            const zoomInConfig = location ? {
                center: location.coordinates,
                zoom: location.zoom,
                pitch: location.pitch,
                bearing: location.bearing,
                duration: 800, // Faster zoom in
                essential: true
            } : null;

            if (isIntro) {
                zoomOutConfig.duration = 400;
            }

            map.flyTo(zoomOutConfig);

            if (zoomInConfig) {
                setTimeout(() => {
                    map.flyTo(zoomInConfig);
                    setTimeout(() => {
                        isAnimating = false;
                    }, 800);
                }, zoomOutConfig.duration);
            } else {
                setTimeout(() => {
                    isAnimating = false;
                }, zoomOutConfig.duration);
            }
        }

        // Improved debounce function (lower wait)
        function debounce(func, wait) {
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

        // Throttle function for scroll events (lower limit)
        function throttle(func, limit) {
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
                        // Reset currentLocationIndex so next section always triggers zoom
                        currentLocationIndex = -1;
                        transitionMap(null, true);
                        return;
                    }
                    const sectionIndex = Array.from(sections).indexOf(entry.target);
                    const location = locations[sectionIndex];
                    // Always trigger zoom and info reveal for any section
                    transitionMap(location);
                    entry.target.classList.remove('visible');
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, 800); // Match map zoom-in duration
                    currentLocationIndex = sectionIndex;
                } else {
                    if (entry.target.id !== 'intro') {
                        entry.target.classList.remove('visible');
                    }
                }
            });
        }, 20), {  // Lower debounce time for more responsive scrolling
            threshold: 0.6, // Require 60% visibility for more reliable section activation
            rootMargin: '-10% 0px -10% 0px'
        });

        // Observe both intro and story sections
        observer.observe(intro);
        sections.forEach(section => observer.observe(section));

        // Optimized click handlers for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    if (targetId === 'intro') {
                        currentLocationIndex = -1;
                        // Force zoom out for intro
                        transitionMap(null, true);
                    } else {
                        const sectionIndex = Array.from(sections).indexOf(targetSection);
                        currentLocationIndex = sectionIndex;
                    }
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Add scroll event listener to handle fast scrolling
        window.addEventListener('scroll', throttle(() => {
            const scrollPosition = window.scrollY;
            const introPosition = intro.offsetTop;
            const scrollIndicator = document.querySelector('.scroll-indicator');
            
            // If we're near the top of the page, force zoom out
            if (scrollPosition < introPosition + 100) {
                currentLocationIndex = -1;
                transitionMap(null, true);
                scrollIndicator.classList.remove('up');
                scrollIndicator.textContent = '↓';
            }

            // Check if we're at the bottom of the page
            const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
            if (isAtBottom) {
                scrollIndicator.classList.add('up');
                scrollIndicator.textContent = '↑';
            } else {
                scrollIndicator.classList.remove('up');
                scrollIndicator.textContent = '↓';
            }
        }, 50), { passive: true });

        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }
            resizeTimeout = setTimeout(() => {
                map.resize();
            }, 250);
        });

        // --- Fix: On page load, trigger zoom for first visible section ---
        window.addEventListener('DOMContentLoaded', () => {
            // Find the first story section that is visible in the viewport
            for (let i = 0; i < sections.length; i++) {
                const rect = sections[i].getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    // Remove .visible, then add after map animation
                    sections[i].classList.remove('visible');
                    const location = locations[i];
                    if (location) {
                        transitionMap(location);
                        setTimeout(() => {
                            sections[i].classList.add('visible');
                        }, 800); // Match map zoom-in duration
                    }
                    break;
                }
            }
        });