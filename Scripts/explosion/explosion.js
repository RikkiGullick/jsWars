
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
        console.log(StatsBar.score); // This is logging 1 for each explosion. Sort of good. But also drat. Need to approach this differently cos need more 'globally available' way of storing how many destroy/explosions have happened. So why only ever 1? theory is that perhaps a new instance of Explosion is created with each entity, and therefore the variable scoreExplosion gets reset to 0 so it only ever gets plus 1 each time _destroy runs - and it can clearly only run once for each entity! Or something. I'll look into this another time after more coffee.
        if (this.destroyed) return;
        this.destroyed = true;
        this.$element.remove();
        this.$element = null;
    }

    _createElement (cssClass) {
        this.$element = $('<div></div>').addClass('entity explosion' + (cssClass ? ' ' + cssClass : ''));
    }
};

