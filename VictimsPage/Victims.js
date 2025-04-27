document.addEventListener("DOMContentLoaded", function () {
    const slideInElements = document.querySelectorAll(".slide-in");

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