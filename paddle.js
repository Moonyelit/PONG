const SPEED = 0.02 // Vitesse de déplacement de la raquette

export default class Paddle{

    constructor(paddleElement){
        this.paddleElement = paddleElement;
        // this.reset(); // Réinitialise la position de la raquette
    }

    // Obtient la position actuelle de la raquette
    get position(){
        return parseFloat(getComputedStyle(this.paddleElement).getPropertyValue("--position"));
    }

    // Définit une nouvelle position pour la raquette
    set position(value){
        this.paddleElement.style.setProperty("--position", value);
    }

    // Obtient les coordonnées de la raquette
    rect(){
        return this.paddleElement.getBoundingClientRect();
    }

    // Réinitialise la position de la raquette au centre
    reset(){
        this.position = 50
    }

    // Met à jour la position de la raquette en fonction de la position de la balle
    update(delta, ballHeight){
        this.position += SPEED * delta * (ballHeight - this.position);
    }
}