document.addEventListener("DOMContentLoaded", () => {
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");
    const content = document.getElementById("content");
    const minigame = document.getElementById("minigame");
    const progressIconInside = document.getElementById("progress-icon-inside");
    const changeContentButton = document.getElementById("change-content-button");
    const contentText = document.getElementById("content-text");
    const restoreContentButton = document.getElementById("restore-content-button");

    const bgm = new Audio("../audioVictims/marchSfx.mp3");
    bgm.loop = true; // Make the music loop
    bgm.volume = 0.2; // Set volume to 10% for subtle background effect

    const bgm2 = new Audio("../audioVictims/bataanDeathMarchSfx.mp3");
    bgm2.loop = true; // Make the music loop
    bgm2.volume = 0.5; // Set volume to 10% for subtle background effect

    const originalContent = `The Fall of Bataan was one of the pivotal moments in the early stages of the Pacific War during World War II. In December 1941, shortly after the attack on Pearl Harbor, Japan launched an invasion of the Philippines, which was then a U.S. territory. The American and Filipino forces, under the command of General Douglas MacArthur, were quickly overwhelmed by the rapid advance of Japanese troops. As the Japanese continued their advance, the defense efforts were concentrated in the Bataan Peninsula, a strategic location on the western edge of Luzon, the largest island in the Philippines. The combined U.S. and Filipino forces set up a defensive perimeter, hoping to hold out long enough for reinforcements to arrive. However, resources were scarce, food was running low, and the soldiers were weakened by disease and malnutrition. By the spring of 1942, the situation had become dire. The Japanese forces, under General Masaharu Homma, had tightened their siege and launched repeated attacks. The defenders, led by Major General Edward King, were exhausted, and with no reinforcements or supplies forthcoming, King was left with little choice but to surrender on April 9, 1942.`;
    const newContent = "The surrender of Bataan marked one of the largest capitulations in U.S. military history, with approximately 75,000 soldiers, a mix of American and Filipino troops surrendering to the Japanese. This was not the end of their suffering, however. The prisoners of war were subjected to the infamous Bataan Death March, a grueling and brutal forced march to prison camps where many died from starvation, disease, and mistreatment. The fall of Bataan was a significant blow to the Allied forces in terms of morale and resources. It also underscored the difficulties of defending the Philippines with limited supplies and personnel, and it signaled the intensity and ruthlessness of the war in the Pacific. Despite the defeat, the U.S. and Filipino forces remained determined to eventually liberate the Philippines, which was achieved in 1944 with the Battle of Leyte Gulf and the eventual recapture of Manila. The fall of Bataan left a lasting legacy, particularly in the Philippines, where it is remembered as a symbol of courage and sacrifice. The suffering of the soldiers, both American and Filipino, became a rallying point for resistance against the Japanese occupation, and it cemented the determination of the Allies to press on toward victory in the Pacific.";

    let progress = 0;
    const decrementRate = 1; // Percentage to lose every second
    const decrementInterval = 50; // Time interval in milliseconds (1 second)

      // Start playing background music with user interaction
        bgm.play().catch(error => {
            console.log("Audio playback failed:", error);
        });
        bgm2.play().catch(error => {
            console.log("Audio playback failed:", error);
        });

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

            // When progress reaches 100%, reveal the content with animation
            if (progress >= 100) {
                clearInterval(decrementIntervalId); // Stop decrementing progress
                minigame.style.display = "none"; // Hide the minigame
                content.style.display = "block"; // Show the hidden content
                content.classList.add("show"); // Add the 'show' class to trigger the animation
            }
        }
    });

    // Add event listener to the button to change content
    changeContentButton.addEventListener("click", () => {
        contentText.textContent = newContent;
    });

    restoreContentButton.addEventListener("click", () => {
        contentText.textContent = originalContent;
    });

    // Start decrementing progress over time
    const decrementIntervalId = setInterval(decrementProgress, decrementInterval);
});