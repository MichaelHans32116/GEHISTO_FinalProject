document.addEventListener("DOMContentLoaded", function () {
    const slideInElements = document.querySelectorAll(".slide-in");

    const bgm = new Audio("./audioVictims/mainVictimsSfx.mp3");
    bgm.loop = true; // Make the music loop
    bgm.volume = 0.3; // Set volume to 10% for subtle background effect

        bgm.play().catch(error => {
            console.log("Audio playback failed:", error);
        }); 

    const handleScroll = () => {
        slideInElements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.classList.add("visible"); // Add visible class when in view
            } else {
                el.classList.remove("visible"); // Remove visible class when out of view
            }
        });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger on page load to check initial position
});