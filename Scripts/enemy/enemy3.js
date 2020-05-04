
import Explosion from "../explosion/explosion.js";
import Game from "../game/game.js";
import Enemy from "./enemy-base.js";

export default class Enemy3 extends Enemy {

    life = 20;

    _initSpeed() {
        this._xSpeed = (-Math.random() * 2)  - 2; 
        this._ySpeed = 0; 
    }

    _initRotation() {
        this._rotSpeed = (Math.random() - 0.5) * 3; 
        this.rotation = this._ySpeed * -7;
    }
    
    _createElement () {
        this.$element = $('<div></div>').addClass('entity enemy3');
        } 
        
}
