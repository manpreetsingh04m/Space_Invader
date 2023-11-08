import Enemy from "./Enemy.js";

import MovingDirection from "./MovingDirection.js";
// Assigning score =0 
let score =0;

let defaultx
let defaulty


var selectedLevel = localStorage.getItem("level");

// Switch case used for level 

switch(selectedLevel){
  case "easy":{
    defaultx=1
    defaulty=1

    break;
  }
  case "medium":{
    defaultx=3
    defaulty=2
   
    break;
  }
  case "hard":{
    defaultx=6
    defaulty=3
  }
}

// Making a export class 
export default class EnemyController{
// Enemy Mapping on the draw screen in form of 2d array
enemyMap = [
  [2 ,1, 2, 1, 3, 3, 2, 1, 2, 1],
  [1, 2, 1, 2, 3, 3, 1, 2, 1, 2],
  [2, 1, 2, 1, 3, 3, 2, 1, 2, 1],
  [1, 2, 1, 2, 3, 3, 1, 2, 1, 2],
  [2, 1, 2, 1, 3, 3, 2, 1, 2, 1],
  [1, 2, 1, 2, 3, 3, 1, 2, 1, 2],
];
// It represent one row of the enemies 
  enemyRow = [];
// Representing the current Direction of the enemy array 
  currentDirection = MovingDirection.right;
  // X velocity and y velocity to represent horizontal and vertical velocity 
  xVelocity=0;
  yVelocity=0;


  // Default value for the velocity to store 
  defaultXVelocity=defaultx;
  defaultYVelocity=defaulty;

// Control the timing to make enemy movement down 
  moveDownTimerDefault=30;
  moveDownTimer = this.moveDownTimerDefault;

  // Fire Bullet by the enemy timer 

  fireBulletTimerDefault = 100;
  fireBulletTimer = this.fireBulletTimerDefault;
  
  // Constructor to initialize the EnemyController passing canvas,enemyBulletController,playerBulletController,x,y 
  constructor(canvas,enemyBulletController,playerBulletController,x,y){
    this.canvas=canvas;
  this.x=x;
  this.y=y;
    this.enemyBulletController=enemyBulletController

    // Initialize an audio element for enemy destruction sounds
    this.enemySound=new Audio("../Assets/enemy-death.wav")
    this.enemySound.volume=0.5;

    // Creating the initial enemy configuration 
    this.createEnemies();

     // Reference added to the player's bullet controller
    this.playerBulletController= playerBulletController;
  }

   // Main function for drawing and controlling enemies
  draw(ctx) {
    // Decrement the move down timer
    this.decrementMoveDownTimer()

    // Update enemy velocity and direction
    this.updateVelocityAndDirection()

// Checking the  collision detection between player bullets and enemies
    this.collisionDetection()

// Drawing the enemies on the canvas
    this.drawEnemies(ctx)
    
        // Reset the move down timer
    this.resetMoveDownTimer()

     // Make enemies fire bullets
    this.fireBullet()


    // console.log(this.moveDownTimer);
  }

  // Handle collision detection between player bullets and enemies
  collisionDetection(){
    this.enemyRow.forEach((enemyRow)=>{
      enemyRow.forEach((enemy,enemyIndex)=>{
        if(this.playerBulletController.collideWith(enemy)){

           // Plays an enemy destruction sound
          this.enemySound.currentTime=0;
          this.enemySound.play();


           // Remove the enemy from the row and update the score
          enemyRow.splice(enemyIndex,1);

             // Remove the previous score from session storage and updating it
          sessionStorage.removeItem("score");
          score++;
        console.log("score: ", score);
        sessionStorage.setItem("score", score);
        }
      });
    });

     // If the player reaches a certain score, then it open the win page
    if(score==60){
      window.open("../winPage/winPage.html","_self")
    }
  }

  // Handle enemy bullet firing
  fireBullet(){
    this.fireBulletTimer--;

     // Check if it's time to fire a bullet
    if(this.fireBulletTimer <=0){
      this.fireBulletTimer = this.fireBulletTimerDefault;

      // Select a random enemy to shoot from all available enemies
      const allEnemies = this.enemyRow.flat();
      const enemyIndex = Math.floor(Math.random()*allEnemies.length);
      const enemy = allEnemies[enemyIndex];

      // Make the enemy controller shoot a bullet
      this.enemyBulletController.shoot(enemy.x + enemy.width/2,enemy.y,-3)
    }
  }

  // Reset the move down timer if needed
  resetMoveDownTimer(){
    if(this.moveDownTimer <=0){
      this.moveDownTimer = this.moveDownTimerDefault;
    }
  }

// Decrement the move down timer if they all are moving down
  decrementMoveDownTimer(){
    if(this.currentDirection === MovingDirection.downLeft || this.currentDirection === MovingDirection.downRight){
      this.moveDownTimer--;
    }
  }

  // Update the enemy movement direction and velocities
  updateVelocityAndDirection() {
    for (const enemyRow of this.enemyRow) {
      if (enemyRow.length === 0) {
        continue; // Skip empty rows
      }


      if (this.currentDirection == MovingDirection.right) {
        this.xVelocity = this.defaultXVelocity;
        this.yVelocity = 0;
        const rightMostEnemy = enemyRow[enemyRow.length - 1];
        if (rightMostEnemy && rightMostEnemy.x + rightMostEnemy.width >= this.canvas.width) {
          this.currentDirection = MovingDirection.downLeft;
          break;
        }
      } else if (this.currentDirection === MovingDirection.downLeft) {
        if (this.moveDown(MovingDirection.left)) {
          break;
        }
      } else if (this.currentDirection === MovingDirection.left) {
        this.xVelocity = -this.defaultXVelocity;
        this.yVelocity = 0;
        const leftmostEnemy = enemyRow[0];
        if (leftmostEnemy && leftmostEnemy.x <= 0) {
          this.currentDirection = MovingDirection.downRight;
          break;
        }
      } else if (this.currentDirection === MovingDirection.downRight) {
        if (this.moveDown(MovingDirection.right)) {
          break;
        }
      }
    }
  }

    // Move the enemies down when needed
moveDown(newDirection){
  this.xVelocity=0;
  this.yVelocity=this.defaultYVelocity;
  if(this.moveDownTimer <= 0){
    this.currentDirection=newDirection;
    return true;
  }
  return false
}




// Draw the enemy sprites on the canvas

  drawEnemies(ctx){
    this.enemyRow.flat().forEach((enemy)=>{
      enemy.move(this.xVelocity,this.yVelocity)
      enemy.draw(ctx);
    })
  }



// Create initial enemy configurations based on the enemyMap

  createEnemies(){
  
    this.enemyMap.forEach((row, rowIndex) =>{
      this.enemyRow[rowIndex] = [];
      row.forEach((enemyNumber, enemyIndex)=>{
        if(enemyNumber > 0){
          this.enemyRow[rowIndex].push(
            new Enemy(enemyIndex * window.visualViewport.width/16.5, rowIndex * window.visualViewport.width/27, enemyNumber)
          )
        }
      })
    });
  }

  // Check if any of the enemies collide with a sprite
  
collideWith(sprite) {
return this.enemyRow.flat().some((enemy)=>enemy.collideWith(sprite))
}
}
