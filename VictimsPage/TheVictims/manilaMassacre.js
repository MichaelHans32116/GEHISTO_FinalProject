document.addEventListener("DOMContentLoaded", () => {
    const minigame = document.getElementById("minigame");
    const content = document.getElementById("content");
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");
    const enemyArea = document.getElementById("enemy-area");

    // Create audio element for background music
    const bgm = new Audio("../audioVictims/funeral-electro-bgm.mp3");
    bgm.loop = true; // Make the music loop
    bgm.volume = 0.1; // Set volume to 10% for subtle background effect

    // Add audio event listeners for debugging
    bgm.addEventListener('canplaythrough', () => {
        console.log('Audio is ready to play');
    });

    bgm.addEventListener('error', (e) => {
        console.error('Audio error:', e);
    });

    bgm.addEventListener('playing', () => {
        console.log('Audio is playing');
    });

    let progress = 0;
    const decrementRate = 4;
    const decrementInterval = 1000;

    let gameInterval;
    let spawnInterval;

    const updateProgress = () => {
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${progress}%`;
    };

    const decrementProgress = () => {
        if (progress > 0) {
            progress -= decrementRate;
            if (progress < 0) progress = 0;
            updateProgress();
        }
    };

    const spawnFire = () => {
        const fire = document.createElement("img");
        fire.src = "../Images/fire.png";
        fire.classList.add("fire");

        // Random position
        fire.style.top = `${Math.random() * 240}px`;
        fire.style.left = `${Math.random() * (window.innerWidth - 60)}px`;

        fire.onclick = () => {
            progress += 13;
            if (progress > 100) progress = 100;
            updateProgress();
            fire.remove();

            if (progress === 100) {
                clearInterval(gameInterval);
                clearInterval(spawnInterval);
                minigame.style.display = "none";
                content.style.display = "block";
                bgm.pause(); // Stop the music when game is complete
            }
        };

        enemyArea.appendChild(fire);
        setTimeout(() => fire.remove(), 2000);
    };

    // Create initial centered fire
    const initialFire = document.createElement("img");
    initialFire.src = "../Images/fire.png";
    initialFire.classList.add("fire");
    initialFire.style.position = "absolute";
    initialFire.style.top = "50%";
    initialFire.style.left = "50%";
    initialFire.style.transform = "translate(-50%, -50%)";
    initialFire.style.cursor = "pointer"; // Add pointer cursor to indicate clickable

    // Start game when initial fire is clicked
    initialFire.onclick = () => {
        initialFire.remove(); // Remove the centered fire
        gameInterval = setInterval(decrementProgress, decrementInterval);
        spawnInterval = setInterval(spawnFire, 1000); // every second
    };

    enemyArea.appendChild(initialFire);

    // Start the mini-game immediately
    minigame.style.display = "flex";
    
    // Start playing background music with user interaction
    document.addEventListener('click', () => {
        bgm.play().catch(error => {
            console.log("Audio playback failed:", error);
        });
    }, { once: true }); // Only trigger once on first click
});
