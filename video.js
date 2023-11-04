const introVideo = document.getElementById('introVideo');

function redirect() {
    window.location.href = "../startPage/start.html";
}

introVideo.addEventListener('click', function () {
    if (introVideo.paused) {
        introVideo.play();
    } else {
        introVideo.pause();
        redirect(); // Redirect when the video is clicked
    }
});
window.onload = function () {
    introVideo.play();
};