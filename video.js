const introVideo = document.getElementById('introVideo');

function redirect() {
    window.location.href = "../startPage/start.html";
}
// Intro Video play 
window.onload = function () {
    introVideo.play();
};

// Added click anywhere to skip the video and move to playgame page 
introVideo.addEventListener('click', function () {
    if (introVideo.paused) {
        introVideo.play();
    } else {
        introVideo.pause();
        redirect(); // Redirect when the video is clicked
    }
});

document.addEventListener("keydown", function (event) {
    // Check if the pressed key is the "Enter" key (key code 13)
    if (event.keyCode === 13) {
      // If "Enter" key is pressed, navigate to the next page
      introVideo.click()
    }
  });