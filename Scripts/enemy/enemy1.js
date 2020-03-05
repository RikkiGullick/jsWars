
import Explosion from "../explosion/explosion.js";
import Game from "../game/game.js";

export default class Enemy1 {
    $element = null;
    x = 0;
    y = 0;
    width = 50;
    height = 50;
    isNew = true;
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
        Game.entityManager.add(this);
    }

    update () {
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
        this.$element = $('<div></div>').addClass('entity enemy1');
    }
}
