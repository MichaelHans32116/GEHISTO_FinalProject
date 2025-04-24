document.getElementsByClassName('container')[0].style.display = "block";

function next(id) {
    var correctAnswer = document.getElementById('correct' + id);

    if (correctAnswer.checked) {
        
        Swal.fire({
            title: "Correct!",
            text: "Great job!",
            icon: "success",
            confirmButtonText: "Next"
        }).then(() => {
            
            document.getElementsByClassName('container')[id - 1].style.display = "none";
            document.getElementsByClassName('container')[id].style.display = "block";
        });
    } else {
        
        Swal.fire({
            title: "Oops!",
            text: "That’s not correct.",
            icon: "error",
            confirmButtonText: "Try next"
        }).then(() => {
            document.getElementsByClassName('container')[id - 1].style.display = "none";
            document.getElementsByClassName('container')[id].style.display = "block";
        });
    }
}

function result() {
    var score = 0;
    for (let i = 1; i <= 10; i++) {
        if (document.getElementById('correct' + i).checked) {
            score++;
        }
    }

    Swal.fire({
        title: "Quiz Complete!",
        text: "Your score is: " + score + "/10",
        icon: "info",
        confirmButtonText: "Okay"
    });
}

function result() {
    var score = 0;
    if(document.getElementById('correct1').checked) {
        score++;
    }
    if(document.getElementById('correct2').checked) {
        score++;
    }
    if(document.getElementById('correct3').checked) {
        score++;
    }
    if(document.getElementById('correct4').checked) {
        score++;
    }
    if(document.getElementById('correct5').checked) {
        score++;
    }
    if(document.getElementById('correct6').checked) {
        score++;
    }
    if(document.getElementById('correct7').checked) {
        score++;
    }
    if(document.getElementById('correct8').checked) {
        score++;
    }
    if(document.getElementById('correct9').checked) {
        score++;
    }
    if(document.getElementById('correct10').checked) {
        score++;
    }
    alert("your score is: "+ score);
}