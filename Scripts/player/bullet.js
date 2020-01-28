
import Game from '../game/game.js';

export default class Bullet {
    $element = null;
    x = 0;
    y = 0;
    width = 12;
    height = 8;
    isNew = true;
    rotation = 0;
    destroyed = false;
    _xSpeed = 0;
    _ySpeed = 0;

    energy = 10;
    type = 'bullet';
    collideWith = 'enemy';

    constructor (startX, startY, xSpeed, ySpeed) {
        this.x = startX;
        this.y = startY;
        this._xSpeed = xSpeed;
        this._ySpeed = ySpeed;
        this._createElement();
        Game.entityManager.add(this);
    }

    update() {
        this.x += this._xSpeed;
        this.y += this._ySpeed;
        if (Game.entityManager.outOfBounds(this)) {
            this._destroy();
        }
    }

    processCollision(enemy) {
        enemy.removeLife(this.energy);
        this._destroy();
    }

    _destroy() {
        this.destroyed = true;
        if (this.$element) {
            this.$element.remove();
            this.$element = null;
        }
    }

    _createElement() {
        this.$element = $('<div></div>').addClass('entity bullet');
    }
};

