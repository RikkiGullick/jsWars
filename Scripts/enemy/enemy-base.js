
import Explosion from "../explosion/explosion.js";
import Game from "../game/game.js";

export default class Enemy {

    x = 0;  // position
    y = 0;
    width = 50;  // size
    height = 50;
   
    constructor() {
        
        var bounds = Game.entityManager.getBounds(); 
        
        this.x = bounds.width;
        this.y = bounds.height * Math.random();

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

    // Technically, moving the removeLife method to the base class has INCREASED the code weight! Was this worth it? I guess if I add to the base method in future it might be.... 
    removeLife (howMuch) {
        this.life = this.life - howMuch;
    }

    _explode () {
        if (this.destroyed) return;
        new Explosion(this.x + (this.width / 2), this.y + (this.height / 2), this._xSpeed, this._ySpeed);
        this._destroy();
    }

}