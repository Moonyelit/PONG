import Ball from "./ball.js";
import Paddle from "./paddle.js";

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));
const playerscoreElement = document.getElementById("player-score");
const computerscoreElement = document.getElementById("computer-score");

let lastTime;

// Fonction de mise à jour du jeu
function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime;
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
    computerPaddle.update(delta, ball.y)
    const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))

    document.documentElement.style.setProperty("--hue", (hue + delta *.01) )

    if (isLose()) handleLose()
  }

  lastTime = time; 
  window.requestAnimationFrame(update);
}

// Vérifie si la balle a été perdue
function isLose(){
    const rect = ball.rect()
  return (rect.right >= window.innerWidth || rect.left <= 0)
}

// Gère la perte de la balle
function handleLose(){
    const rect = ball.rect()
    if(rect.right >= window.innerWidth){
        playerscoreElement.textContent = parseInt(playerscoreElement.textContent) + 1
    } else {
        computerscoreElement.textContent = parseInt(computerscoreElement.textContent) + 1
    }   

    ball.reset()
    computerPaddle.reset()
}

// Met à jour la position de la raquette du joueur en fonction de la position de la souris
document.addEventListener("mousemove", (event) => {
    playerPaddle.position = event.clientY / window.innerHeight * 100;
})

window.requestAnimationFrame(update);
