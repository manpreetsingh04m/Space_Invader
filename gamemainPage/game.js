// Import necessary modules and classes
import EnemyController from "./EnemyController.js";
import Player from "./player.js";
import BulletController from "./BulletController.js";
var selectedLevel = localStorage.getItem("level");
let a
let b
switch(selectedLevel){
  case "easy":{
    a=15
    b=5
    break;
  }
  case "medium":{
    a=10
    b=7
    break;
  }
  case "hard":{
    a=100
    b=10
  }
}

// Get the canvas and 2D rendering context
const canvas = document.getElementById("game_Background");
const ctx = canvas.getContext('2d');

// Get references to the heart images
const heart1 = document.getElementById("img1");
const heart2 = document.getElementById("img2");
const heart3 = document.getElementById("img3");

// Set canvas dimensions and create a background image

let deviceWidth = window.visualViewport.width;
let deviceHeight = window.visualViewport.height;
canvas.width = deviceWidth-20;
canvas.height = deviceHeight-20;
const background = new Image();
background.src = "../Assets/Game page image.png";
// console.log(window.width());
// Create instances of the BulletController, Player, and EnemyController
const playerBulletController = new BulletController(canvas, a, "#F6AA63", true);
const enemyBulletController = new BulletController(canvas, b, "white", false);
const enemyController = new EnemyController(canvas, enemyBulletController, playerBulletController);
const player = new Player(canvas, 5, playerBulletController);

// Initialize game variables
let isGameOver = false;
let live = 0;
let GameOver;
let backgroundAudio = new Audio("../Assets/spaceinvaders1.mpeg");

// Play background audio and set it to loop
backgroundAudio.play();
backgroundAudio.loop = true;

// Main game loop
function game() {
  checkGameOver();
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  if (!isGameOver && !GameOver) {
    enemyController.draw(ctx);
    player.draw(ctx);
    playerBulletController.draw(ctx);
    enemyBulletController.draw(ctx);
  }
}

// Check for game over conditions
function checkGameOver() {
  if (enemyBulletController.collideWith(player)) {
    live++;
    console.log("Live: " + live);
  }

  if (live === 1) {
    heart3.style.visibility = "hidden";
  }

  if (live === 2) {
    heart2.style.visibility = "hidden";
  }

  if (live === 3) {
    heart1.style.visibility = "hidden";
    isGameOver = true;
    window.open("../gameoverPage/gameoverpage.html", "_self");
  }

  if (enemyController.collideWith(player)) {
    GameOver = true;
    window.open("../gameoverPage/gameoverpage.html", "_self");
  }
}

// Start the game loop with a target frame rate of 60 FPS
setInterval(game, 1000 / 60);
