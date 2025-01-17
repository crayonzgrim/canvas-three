import Particle from "./js/Particle.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio > 1 ? 2 : 1;
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
const interval = 1000 / 60;

const particles = [];

function init() {
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  canvas.style.width = canvasWidth + "px";
  canvas.style.height = canvasHeight + "px";

  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;
  ctx.scale(dpr, dpr);

  confetti({
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    count: 10,
  });
}

function confetti({ x, y, count, deg }) {
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(x, y, deg));
  }
}

function render() {
  let now, delta;
  let then = Date.now();

  const frame = () => {
    requestAnimationFrame(frame);
    now = Date.now();
    delta = now - then;
    if (delta < interval) return;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw(ctx);

      if (particles[i].opacity <= 0) {
        particles.splice(i, 1);
      }
    }

    then = now - (delta % interval);
  };

  requestAnimationFrame(frame);
}

window.addEventListener("click", (e) => {
  confetti({
    x: 0,
    y: canvasHeight / 2,
    count: 10,
    deg: -50,
  });
});
window.addEventListener("resize", () => {
  init();
});
window.addEventListener("load", () => {
  init();
  render();
});
