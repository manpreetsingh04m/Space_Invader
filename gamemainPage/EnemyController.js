import Enemy from "./Enemy.js";

import MovingDirection from "./MovingDirection.js";
// Assigning score =0 
let score =0;

let defaultx=3
let defaulty=3
// Making a export class 
export default class EnemyController{
// Enemy Mapping on the draw screen in form of 2d array
  enemyMap = [
    [2 ,1, 2, 1, 3, 3, 2, 1, 2, 1,2],
    [1, 2, 1, 2, 3, 3, 1, 2, 1, 2,2],
    [2, 1, 2, 1, 3, 3, 2, 1, 2, 1,2],
    [1, 2, 1, 2, 3, 3, 1, 2, 1, 2,2],
    [2, 1, 2, 1, 3, 3, 2, 1, 2, 1,2],
    [1, 2, 1, 2, 3, 3, 1, 2, 1, 2,2],
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
 


  constructor(canvas,enemyBulletController,playerBulletController,x,y){
    this.canvas=canvas;
  this.x=x;
  this.y=y;
    this.enemyBulletController=enemyBulletController

    this.enemySound=new Audio("../Assets/enemy-death.wav")
    this.enemySound.volume=0.5;

    this.createEnemies();
    this.playerBulletController= playerBulletController;
  }
  draw(ctx) {
    this.decrementMoveDownTimer()
    this.updateVelocityAndDirection()
    this.collisionDetection()
    this.drawEnemies(ctx)
    this.resetMoveDownTimer()
    this.fireBullet()
    // console.log(this.moveDownTimer);
  }

  collisionDetection(){
    this.enemyRow.forEach((enemyRow)=>{
      enemyRow.forEach((enemy,enemyIndex)=>{
        if(this.playerBulletController.collideWith(enemy)){
          this.enemySound.currentTime=0;
          this.enemySound.play();
          enemyRow.splice(enemyIndex,1);
          sessionStorage.removeItem("score");
          score++;
        console.log("score: ", score);
        sessionStorage.setItem("score", score);
        }
      });
    });
    if(score==60){
      window.open("../winPage/winPage.html",)
    }
  }

  fireBullet(){
    this.fireBulletTimer--;
    if(this.fireBulletTimer <=0){
      this.fireBulletTimer = this.fireBulletTimerDefault;
      const allEnemies = this.enemyRow.flat();
      const enemyIndex = Math.floor(Math.random()*allEnemies.length);
      const enemy = allEnemies[enemyIndex];
      this.enemyBulletController.shoot(enemy.x + enemy.width/2,enemy.y,-3)
    }
  }
  resetMoveDownTimer(){
    if(this.moveDownTimer <=0){
      this.moveDownTimer = this.moveDownTimerDefault;
    }
  }


  decrementMoveDownTimer(){
    if(this.currentDirection === MovingDirection.downLeft || this.currentDirection === MovingDirection.downRight){
      this.moveDownTimer--;
    }
  }

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

moveDown(newDirection){
  this.xVelocity=0;
  this.yVelocity=this.defaultYVelocity;
  if(this.moveDownTimer <= 0){
    this.currentDirection=newDirection;
    return true;
  }
  return false
}






  drawEnemies(ctx){
    this.enemyRow.flat().forEach((enemy)=>{
      enemy.move(this.xVelocity,this.yVelocity)
      enemy.draw(ctx);
    })
  }





  createEnemies(){
  
    this.enemyMap.forEach((row, rowIndex) =>{
      this.enemyRow[rowIndex] = [];
      row.forEach((enemyNumber, enemyIndex)=>{
        if(enemyNumber > 0){
          this.enemyRow[rowIndex].push(
            new Enemy(enemyIndex * 90, rowIndex * 55, enemyNumber)
          )
        }
      })
    });
  }

  
collideWith(sprite) {
return this.enemyRow.flat().some((enemy)=>enemy.collideWith(sprite))
}
}
