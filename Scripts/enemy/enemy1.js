
import Explosion from "../explosion/explosion.js";
import Game from "../game/game.js";
import Enemy from "../enemy/enemy-base.js";


export default class Enemy1 extends Enemy {

    _initSpeed() {
        this._xSpeed = -Math.random() * 6;
        this._ySpeed = (Math.random() - 0.5) * 2;
    }

    _initRotation() {
        this._rotSpeed = (Math.random() - 0.5) * 3;
    }

    update () {  
        super.update();
        this.rotation += this._rotSpeed;
    }

    _createElement () {
        this.$element = $('<div></div>').addClass('entity enemy1');
        } 
}
