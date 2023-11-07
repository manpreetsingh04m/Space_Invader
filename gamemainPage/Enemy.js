// Define the Enemy class
export default class Enemy {
  constructor(x, y, imageNumber) {
    this.x = x;
    this.y = y;
    this.width = 70;
    this.height = 60;
    this.image = new Image();
    this.image.src = `../Assets/enemy${imageNumber}.gif`;
  }

  // Draw the enemy on the canvas
  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  // Move the enemy by updating its coordinates
  move(xVelocity, yVelocity) {
    this.x += xVelocity;
    this.y += yVelocity;
  }

  // Check for collision with another sprite
  collideWith(sprite) {
    if (
      this.x + this.width > sprite.x &&
      this.x < sprite.x + sprite.width &&
      this.y + this.height > sprite.y &&
      this.y < sprite.y + sprite.height
    ) {
      return true;
    } else {
      return false;
    }
  }
}
