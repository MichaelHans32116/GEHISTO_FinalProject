let lives = 7;

window.addEventListener("load", () => {
  updateHearts();
});

function updateHearts() {
  const heartDisplay = document.getElementById("hearts");
  if (!heartDisplay) return;
  heartDisplay.innerHTML = "";

  for (let i = 0; i < 7; i++) {
    const img = document.createElement("img");
    img.width = 24;
    img.style.marginRight = "5px";
    img.style.verticalAlign = "middle";

    if (i < lives) {
      img.src = "../Pictures/MC.png"; 
    } else {
      img.src = "../Pictures/EMC.png"; 
    }
    heartDisplay.appendChild(img);
  }
}

 
function loseHeart() {
    lives--;
    updateHearts();
  
    // Play sound
    const hurtSound = new Audio("../Sounds/MCsound.mp3");
    hurtSound.play();
  
    setTimeout(() => {
        hurtSound.pause();
        hurtSound.currentTime = 0; // Reset the audio to the beginning
      }, 800); // 3000ms = 3 seconds

    document.body.classList.add("shake");
    setTimeout(() => {
      document.body.classList.remove("shake");
    }, 500);
  
    if (lives === 0) {
      Swal.fire({
        title: "Game Over!",
        text: "You've lost all your hearts.",
        icon: "error",
        confirmButtonText: "Restart"
      }).then(() => {
        restartQuiz();
      });
      return true;
    }
  
    return false;
  }