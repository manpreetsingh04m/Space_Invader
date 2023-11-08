document.addEventListener("click",function(){
  window.location.href="../instructionPage/instructionPage.html"
})
var backgroundAudio=new Audio("../Assets/Space Invaders - Space Invaders.mp3")
backgroundAudio.play();
backgroundAudio.loop = true;

document.addEventListener("keydown", function (event) {
  // Check if the pressed key is the "Enter" key (key code 13)
  if (event.keyCode === 13) {
    // If "Enter" key is pressed, navigate to the next page
    window.location.href = "../instructionPage/instructionPage.html";
  }
});