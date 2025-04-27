document.addEventListener("DOMContentLoaded", () => {
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");
    const content = document.getElementById("content");
    const minigame = document.getElementById("minigame");
    const progressIconInside = document.getElementById("progress-icon-inside");

    let progress = 0;
    const decrementRate = 1; // Percentage to lose every second
    const decrementInterval = 50; // Time interval in milliseconds (1 second)

    // Function to decrement progress over time
    const decrementProgress = () => {
        if (progress > 0) {
            progress -= decrementRate;
            if (progress < 0) progress = 0; // Ensure progress doesn't go below 0
            updateProgressBar();
        }
    };

    // Function to update the progress bar and text
    const updateProgressBar = () => {
        progressBar.style.width = progress + "%";
        progressText.textContent = progress + "%";

        const progressBarWidth = progressBar.offsetWidth; // Get the current width of the progress bar
        progressIconInside.style.left = progressBarWidth + "px";
    };

    // Listen for keydown events
    document.addEventListener("keydown", (event) => {
        if (event.code === "Space") {
            event.preventDefault(); // Prevent scrolling when space is pressed
            if (progress < 100) {
                progress += 5; // Increment progress by 5% per space press
                if (progress > 100) progress = 100; // Ensure progress doesn't exceed 100
                updateProgressBar();
            }

            // When progress reaches 100%, reveal the content
            if (progress >= 100) {
                clearInterval(decrementIntervalId); // Stop decrementing progress
                minigame.style.display = "none"; // Hide the minigame
                content.style.display = "block"; // Show the hidden content
            }
        }
    });

    // Start decrementing progress over time
    const decrementIntervalId = setInterval(decrementProgress, decrementInterval);
});