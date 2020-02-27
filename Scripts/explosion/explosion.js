
import Game from "../game/game.js";
import StatsBar from '../game/statsBar.js';

export default class Explosion {
    $element = null;
    x = 0;
    y = 0;
    isNew = true;
    rotation = 0;
    scale = 1;
    destroyed = false;
    _age = 0;
    

    constructor (x, y, xSpeed, ySpeed, cssClass, maxAge) {
        this.x = x;
        this.y = y;
        this._xSpeed = xSpeed || 0;
        this._ySpeed = ySpeed || 0;
        this._createElement(cssClass);
        this._maxAge = maxAge || 10;
        Game.entityManager.add(this);
    }

    update () {
        this.x += this._xSpeed;
        this.y += this._ySpeed;
        this._age++;
        if (this._age > this._maxAge) {
            this._destroy();
        }
        else {
            this.scale += 0.1;
            this.$element.css({ opacity: 1 - (this._age / this._maxAge) })
        }
    }

    _destroy () {
        StatsBar.score += 100; // Add 100 to scoreExplosion in instance game of gameSystem. Do I need a capital?
        console.log(StatsBar.score); // NaN! Why is this undefined? Why can't it see the property in statsBar? Or can it, and I'm getting something else wrong?
        if (this.destroyed) return;
        this.destroyed = true;
        this.$element.remove();
        this.$element = null;
    }

    _createElement (cssClass) {
        this.$element = $('<div></div>').addClass('entity explosion' + (cssClass ? ' ' + cssClass : ''));
    }
};

