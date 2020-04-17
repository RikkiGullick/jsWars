
import Explosion from "../explosion/explosion.js";
import Game from "../game/game.js";

export default class Enemy {
    $element = null; 
    x = 0;  // position
    y = 0;
    width = 50;  // size
    height = 50;
    isNew = true;  // what's this? Is it being used yet? Will go look later.
    rotation = 0;
    destroyed = false;
    _xSpeed = 0;
    _ySpeed = 0;
    energy = 50; 
    life = 10;
    type = 'enemy';
    collideWith = 'player';
   
    constructor() {
        
        var bounds = Game.entityManager.getBounds(); 
        this.x = bounds.width;
        this.y = bounds.height * Math.random();
        // I suspect these lines are now running too early - they look like they need to be the last thing in the constructor cos these lines create the actual element and send it to the entityManager?
        this._setSpeed();
        this._setRotSpeed();
        this._setRotation();
        this._createElement();
        Game.entityManager.add(this);

    }

    processCollision (player) {
        player.removeLife(this.energy);
        this._explode();
    }

    update () {  
        this.x += this._xSpeed;
        this.y += this._ySpeed;
        if (Game.entityManager.outOfBounds(this)) {
            this._destroy();
        }
    }

    _destroy () {
        if (this.destroyed) return;
        this.destroyed = true;
        this.$element.remove();
        this.$element = null;
    }

    // Technically, moving the removeLife method to the base class has INCREASED the code weight! Was this worth it? 
    removeLife (howMuch) {
        this.life = this.life - howMuch;
    }

    _explode () {
        if (this.destroyed) return;
        new Explosion(this.x + (this.width / 2), this.y + (this.height / 2), this._xSpeed, this._ySpeed);
        this._destroy();
    }

}