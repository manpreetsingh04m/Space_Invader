var Play_again_button=document.getElementById("Play_again_button")
Play_again_button.addEventListener("click",function(){
  window.location.href="../levelChoosing/levelChoosing.html"
})

var backgroundAudio=new Audio("../Assets/audience-cheering-clapping-short-fascinatedsound-1-00-06.mp3")
backgroundAudio.play();

document.addEventListener("keydown", function (event) {
  // Check if the pressed key is the "Enter" key (key code 13)
  if (event.keyCode === 13) {
    // If "Enter" key is pressed, simulate a click on the 'Play Again' button
    Play_again_button.click();
  }
});