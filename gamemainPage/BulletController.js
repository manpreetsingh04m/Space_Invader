// Define the BulletController class
import Bullet from "./Bullet.js";

export default class BulletController {
  bullets = [];
  timeTillNextBulletAllowed = 0;

  constructor(canvas, maxBulletAtOneTime, bulletColor, soundEnable) {
    this.canvas = canvas;
    this.maxBulletAtOneTime = maxBulletAtOneTime;
    this.bulletColor = bulletColor;
    this.soundEnable = soundEnable;

    this.shootSound = new Audio("../Assets/shoot.wav");
    this.shootSound.volume = 0.5;
  }

  
  // shoot(x, y, velocity, timeTillNextBulletAllowed = 0) {
  //   if (
  //     this.timeTillNextBulletAllowed <= 0 &&
  //     this.bullets.length < this.maxBulletAtOneTime
  //   ) {
  //     const bullet = new Bullet(this.canvas, x, y, velocity, this.bulletColor);
  //     this.bullets.push(bullet);
  //     if (this.soundEnable) {
  //       this.shootSound.currentTime = 0;
  //       this.shootSound.play();
  //     }
  //     this.timeTillNextBulletAllowed = timeTillNextBulletAllowed;
  //   }
  // }


  // Draw bullets on the canvas and remove out-of-bounds bullets
  draw(ctx) {
    this.bullets = this.bullets.filter(
      (bullet) => bullet.y + bullet.width > 0 && bullet.y <= this.canvas.height
    );

    this.bullets.forEach((bullet) => bullet.draw(ctx));
    if (this.timeTillNextBulletAllowed > 0) {
      this.timeTillNextBulletAllowed--;
    }
  }

  // Check for collision between bullets and a sprite
  collideWith(sprite) {
    const bulletThatHitSprite = this.bullets.findIndex((bullet) =>
      bullet.collideWith(sprite)
    );

    if (bulletThatHitSprite >= 0) {
      this.bullets.splice(bulletThatHitSprite, 1);
      return true;
    }
    return false;
  }

  // Create and shoot a new bullet
  shoot(x, y, velocity, timeTillNextBulletAllowed = 0) {
    if (
      this.timeTillNextBulletAllowed <= 0 &&
      this.bullets.length < this.maxBulletAtOneTime
    ) {
      const bullet = new Bullet(this.canvas, x, y, velocity, this.bulletColor);
      this.bullets.push(bullet);
      if (this.soundEnable) {
        this.shootSound.currentTime = 0;
        this.shootSound.play();
      }
      this.timeTillNextBulletAllowed = timeTillNextBulletAllowed;
    }
  }
}
