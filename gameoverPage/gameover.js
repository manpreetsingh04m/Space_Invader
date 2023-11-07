var play_again = document.getElementById("play_again");
play_again.addEventListener("click", function () {
    // Removing the previous score from session storage
    sessionStorage.removeItem('score');
    // Redirect to the game page main
    window.location.href = "../gamemainPage/game.html";
});

var score_number = document.getElementById("score_number");
// Getting the score from session storage
var score = sessionStorage.getItem('score');
// Checking if the score is stored
if (score !== null) {
    score_number.innerHTML = score;
} else {
    score_number.innerHTML = "0";
}

// Background Audio Added 

var backgroundAudio = new Audio("../Assets/mixkit-arcade-space-shooter-dead-notification-272.wav")
backgroundAudio.play();