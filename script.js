const canvas = document.getElementById("draw");
const ctx = canvas.getContext("2d");

ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = "30";

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;

function draw(e) {
  if (!isDrawing) return;

  ctx.strokeStyle = `hsla(${hue}, 100%, 32%, 0.89)`;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();

  hue++;
  hue >= 360 ? (hue = 0) : false;

  [lastX, lastY] = [e.offsetX, e.offsetY];
}

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", e => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

function changeLine(e) {
  e.target.dataset.key === "one"
    ? (ctx.lineWidth = "10")
    : e.target.dataset.key === "two"
    ? (ctx.lineWidth = "30")
    : e.target.dataset.key === "three"
    ? (ctx.lineWidth = "50")
    : false;
}

const buttons = document.querySelectorAll(".btn");
buttons.forEach(button => button.addEventListener("click", changeLine));

const reset = document.querySelector(".reset");

function resetCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

reset.addEventListener("click", resetCanvas);
