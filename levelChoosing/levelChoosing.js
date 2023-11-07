var easy = document.getElementById("easy_img")
var  medium= document.getElementById("medium_img")
var hard = document.getElementById("hard_img")

easy.addEventListener("click",()=>{
  let level ="easy"
  localStorage.setItem("level",level)
  window.location.href="../gamemainPage/game.html"
})
medium.addEventListener("click",()=>{
  let level ="medium"
  localStorage.setItem("level",level)
  window.location.href="../gamemainPage/game.html"
})
hard.addEventListener("click",()=>{
  let level ="hard"
  localStorage.setItem("level",level)
  window.location.href="../gamemainPage/game.html"
})


