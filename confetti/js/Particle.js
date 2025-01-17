import { randomNumberBetween } from "./utils.js";

export default class Particle {
  constructor(x, y, deg = 0) {
    this.angle = (Math.PI / 180) * randomNumberBetween(deg - 30, deg + 30);
    this.r = randomNumberBetween(30, 100);
    this.x = x;
    this.y = y;

    this.vx = this.r * Math.cos(this.angle);
    this.vy = this.r * Math.sin(this.angle);

    this.friction = 0.89;
    this.gravity = 0.5;

    this.width = 14;
    this.height = 14;

    this.opacity = 1;

    this.widthDelta = randomNumberBetween(0, 360);
    this.heightDelta = randomNumberBetween(0, 360);

    this.rotation = randomNumberBetween(0, 360);
    this.rotationDelta = randomNumberBetween(-1, 1);
  }

  update() {
    this.vy += this.gravity;

    this.vx *= this.friction;
    this.vy *= this.friction;

    this.x += this.vx;
    this.y += this.vy;

    this.opacity -= 0.005;

    this.widthDelta += 2;
    this.heightDelta += 2;

    this.rotation += this.rotationDelta;
  }

  draw(ctx) {
    ctx.translate(this.x + this.width * 1.2, this.y + this.height * 1.2);
    ctx.rotate((Math.PI / 180) * this.rotation);
    ctx.translate(-this.x - this.width, -this.y - this.height);

    ctx.fillStyle = `rgba(255, 0, 0, ${this.opacity})`;
    ctx.fillRect(
      this.x,
      this.y,
      this.width * Math.cos((Math.PI / 180) * this.widthDelta),
      this.height * Math.sin((Math.PI / 180) * this.heightDelta),
    );

    ctx.resetTransform();
  }
}
