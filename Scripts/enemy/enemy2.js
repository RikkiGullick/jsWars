
import Explosion from "../explosion/explosion.js";
import Game from "../game/game.js";

export default class Enemy2 {
    $element = null; // this is the jQuery object containing our actual div.
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

    constructor () {
        var bounds = Game.entityManager.getBounds();
        this.x = bounds.width;
        this.y = bounds.height * Math.random();
        this._xSpeed = -Math.random() * 6;
        this._ySpeed = (Math.random() - 0.5) * 2;
        this._rotSpeed = (Math.random() - 0.5) * 3;
        this._createElement();
        Game.entityManager.add(this); // when constructor function is first run, it pushes this instance of Enemy1 into the array 'entities' in instance of entityManager created by game instance of GameSystem. 
    }

    update () {  // guessing this runs whenever 'run' is run in the loop! There are a couple of 'update' functions, need to get it straight in my head which one is which. There's a different one in entityManager.
        this.x += this._xSpeed;
        this.y += this._ySpeed;
        this.rotation += this._rotSpeed;
        if (Game.entityManager.outOfBounds(this)) {
            this._destroy();
        }
    }

    processCollision (player) {
        player.removeLife(this.energy);
        this._explode();
    }

    removeLife (howMuch) {
        this.life = this.life - howMuch;
        if (this.life < 0) {
            this._explode();
        }
    }

    _explode () {
        if (this.destroyed) return;
        new Explosion(this.x + (this.width / 2), this.y + (this.height / 2), this._xSpeed, this._ySpeed);
        this._destroy();
    }

    _destroy () {
        if (this.destroyed) return;
        this.destroyed = true;
        this.$element.remove();
        this.$element = null;
    }
    
    _createElement () {
        this.$element = $('<div></div>').addClass('entity enemy2');
        } 
}
