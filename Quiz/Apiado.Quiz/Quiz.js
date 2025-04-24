window.onload = function () {
    const containers = document.getElementsByClassName('container');
    containers[0].style.display = "block";
    containers[0].style.opacity = 1;
  };
  
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
        Swal.fire({
          title: "Correct!",
          text: "Great job!",
          icon: "success",
          confirmButtonText: "Next"
        }).then(transitionToNext);
      } else {
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
      
      const radios = document.querySelectorAll('input[type="radio"]');
      radios.forEach(radio => radio.checked = false);
    
      const containers = document.getElementsByClassName('container');
      for (let i = 1; i < containers.length; i++) {
        containers[i].style.display = "none";
        containers[i].style.opacity = 0;
      }
    
      containers[1].style.display = "block";
      containers[1].style.opacity = 1;
    }