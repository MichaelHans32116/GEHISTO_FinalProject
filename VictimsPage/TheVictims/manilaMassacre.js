document.addEventListener("DOMContentLoaded", () => {
    const minigame = document.getElementById("minigame");
    const content = document.getElementById("content");
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");
    const enemyArea = document.getElementById("enemy-area");

    let progress = 0;
    const decrementRate = 1;
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
            progress += 5;
            if (progress > 100) progress = 100;
            updateProgress();
            fire.remove();

            if (progress === 100) {
                clearInterval(gameInterval);
                clearInterval(spawnInterval);
                minigame.style.display = "none";
                content.style.display = "block";
            }
        };

        enemyArea.appendChild(fire);
        setTimeout(() => fire.remove(), 2000);
    };

    // Start the mini-game immediately
    minigame.style.display = "flex";
    gameInterval = setInterval(decrementProgress, decrementInterval);
    spawnInterval = setInterval(spawnFire, 1000);
});
