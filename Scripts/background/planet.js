
import Game from "../game/game.js";

export default class Planet {
    $element = null;
    x = 0;
    y = 0;
    width = 20;
    height = 20;
    isNew = true;
    rotation = 0;
    destroyed = false;
    _xSpeed = 0;
    _ySpeed = 0;

    init () {
        var bounds = Game.entityManager.getBounds();
        this.x = bounds.width;
        this.y = bounds.height * Math.random();
        this._xSpeed = -1;
        this._createElement();
        gameSystem.entityManager.add(this);
    }

    update () {
        this.x += this._xSpeed;
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

    _createElement () {
        this.$element = $('<div></div>').addClass('entity planet');
    }
};