const INITIAL_VELOCITY = 0.025 // Vitesse initiale de la balle
const VELOCITY_INCREASE = 0.00001 // Augmentation de la vitesse de la balle

export default class Ball {
  constructor(ballElement) {
    this.ballElement = ballElement;
    this.reset();
  }

  // Obtient la position x actuelle de la balle
  get x() {
    return parseFloat(
      getComputedStyle(this.ballElement).getPropertyValue("--x")
    );
  }

  // Définit une nouvelle position x pour la balle
  set x(value) {
    this.ballElement.style.setProperty("--x", value);
  }

  // Obtient la position y actuelle de la balle
  get y() {
    return parseFloat(
      getComputedStyle(this.ballElement).getPropertyValue("--y")
    );
  }

  // Définit une nouvelle position y pour la balle
  set y(value) {
    this.ballElement.style.setProperty("--y", value);
  }

  // Obtient les coordonnées de la balle
  rect() {
    return this.ballElement.getBoundingClientRect();
  }

  // Réinitialise la position et la direction de la balle
  reset() {
    this.x = 50
    this.y = 50
    this.direction = { x: 0 }
    while (
        Math.abs(this.direction.x) <= 0.2 || 
        Math.abs(this.direction.x) >= 0.9
    ) {
      const heading = randomNumberBetween(0, 2 * Math.PI);
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) }
    }
    this.velocity = INITIAL_VELOCITY
  }

  // Met à jour la position de la balle
  update(delta, paddleRects) {
    this.x += this.direction.x * this.velocity * delta
    this.y += this.direction.y * this.velocity * delta
    this.velocity += VELOCITY_INCREASE * delta
    const rect = this.rect();

    // Inverse la direction si la balle touche le haut ou le bas de l'écran
    if(rect.bottom > window.innerHeight || rect.top <= 0) {
      this.direction.y *= -1
    }

    // Inverse la direction si la balle touche une raquette
    if(paddleRects.some(r => isCollision(r , rect))) {
        this.direction.x *= -1
      }
  }
}

// Génère un nombre aléatoire entre min et max
function randomNumberBetween(min, max) {
  return Math.random() * (max - min) + min;
}

// Vérifie s'il y a une collision entre deux rectangles
function isCollision (rect1, rect2){
  return (
    rect1.left <= rect2.right &&
    rect1.right >= rect2.left &&
    rect1.top <= rect2.bottom &&
    rect1.bottom >= rect2.top
  )
}
