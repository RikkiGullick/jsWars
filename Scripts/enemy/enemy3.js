
import Explosion from "../explosion/explosion.js";
import Game from "../game/game.js";
import Enemy from "./enemy-base.js";

export default class Enemy3 extends Enemy {

    life = 9;

    _initSpeed() {
        this._xSpeed = (-Math.random() * 2)  - 5; 
        this._ySpeed = (Math.random() - 0.5) * 2; 
    }

    _initRotation() {
        this._rotSpeed = (Math.random() - 0.5) * 3; 
        this.rotation = this._ySpeed * -7;
    }
    
    _createElement () {
        this.$element = $('<div></div>').addClass('entity enemy3');
        } 
}
