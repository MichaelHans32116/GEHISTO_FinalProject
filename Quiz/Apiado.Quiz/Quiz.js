let stevePos = 40; 
let killerPos = 0;

function updatePositions() {
  document.getElementById("steve").style.left = stevePos + "%";
  document.getElementById("killer").style.left = killerPos + "%";
}

window.onload = function () {
  const containers = document.getElementsByClassName('container');
  containers[0].style.display = "block";
  containers[0].style.opacity = 1;
  updatePositions();
};

function killSteve() {
  const steve = document.getElementById("steve");
  const killer = document.getElementById("killer");

  steve.classList.remove("explode");
  killer.classList.remove("shake");
  void steve.offsetWidth; 
  void killer.offsetWidth;

  steve.classList.add("explode");
  killer.classList.add("shake");

  killer.style.left = steve.style.left;
  steve.src = "../Pictures/Dsteve.png";

  Swal.fire({
    title: "Game Over!",
    text: "Steve has been caught!",
    icon: "error",
    confirmButtonText: "Restart"
  }).then(() => {
    restartQuiz();
  });
}

function goBack() {
  window.location.href = "Front.html";
}

function next(id) {
  const containers = document.getElementsByClassName('container');
  const correctAnswer = document.getElementById('correct' + id);

  const transitionToNext = () => {
    containers[id - 1].style.opacity = 0;
    setTimeout(() => {
      containers[id - 1].style.display = "none";
      containers[id].style.display = "block";
      containers[id].style.opacity = 1;
    }, 500);
  };

  if (correctAnswer.checked) {
    stevePos += 5;
    if (stevePos > 90) stevePos = 90; 
    updatePositions();

    
    const steve = document.getElementById("steve");
    steve.classList.remove("jump");
    void steve.offsetWidth; 
    steve.classList.add("jump");

    Swal.fire({
      title: "Correct!",
      text: "Great job!",
      icon: "success",
      confirmButtonText: "Next"
    }).then(transitionToNext);
  } else {
    const gameOver = loseHeart();
    killerPos += 5;
    updatePositions();

    if (killerPos >= stevePos - 5 || gameOver) {
      killSteve();
      return;
    }

    Swal.fire({
      title: "Oops!",
      text: "That’s not correct.",
      icon: "error",
      confirmButtonText: "Next"
    }).then(transitionToNext);
  }
}

function result() {
  let score = 0;
  for (let i = 1; i <= 10; i++) {
    if (document.getElementById('correct' + i)?.checked) {
      score++;
    }
  }

  if (score <= 3) {
    killSteve(); 
    return;
  }

  Swal.fire({
    title: "Quiz Complete!",
    text: "Your score is: " + score + "/10",
    icon: "info",
    showCancelButton: true,
    confirmButtonText: "Restart Quiz",
    cancelButtonText: "Close",
    confirmButtonColor: "#4CAF50",
    cancelButtonColor: "#d33"
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "Front.html";
    }
  });
}

function restartQuiz() {
  lives = 10;
  updateHearts();

  stevePos = 40;
  killerPos = 0;
  updatePositions();

  const radios = document.querySelectorAll('input[type="radio"]');
  radios.forEach(radio => radio.checked = false);

  const containers = document.getElementsByClassName('container');
  for (let i = 1; i < containers.length; i++) {
    containers[i].style.display = "none";
    containers[i].style.opacity = 0;
  }

  containers[0].style.display = "block";
  containers[0].style.opacity = 1;

  document.getElementById("steve").src = "../Pictures/FRsteve.png"; 
}
