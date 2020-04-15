
import Explosion from "../explosion/explosion.js";
import Game from "../game/game.js";
import Enemy from "./enemy-base.js";

export default class Enemy2 extends Enemy {
    $element = null; // this is the jQuery object containing our actual div.
    // x = 0;  // position
    // y = 0;
    // width = 50;  // size
    // height = 50;
    isNew = true;  // what's this? Is it being used yet? Will go look later.
    rotation = 0; // This sets the angle of the ship.
    destroyed = false;
    _xSpeed = 0;
    _ySpeed = 0; // Need to look at the y speed that is generated in the constructor, and turn this into a sensible angle. Let's see if I can do something random to start with and just make it work. 

    energy = 50; 
    life = 10;
    type = 'enemy';
    collideWith = 'player';

    constructor () {
        super();
        // var bounds = Game.entityManager.getBounds();
        // this.x = bounds.width;
        // this.y = bounds.height * Math.random();
        // this._xSpeed = -Math.random() * 6; // Original: number between 0 and -1, times 6. End up with a number between 0 and -6. Enemy can only go left. 
        this._xSpeed = (-Math.random() * 2)  - 5; // number between 0 and -1 times 2, - 5. End up with a number between -5 and -7. Enemy can only go left, but quicker and less variation! 
        this._ySpeed = (Math.random() - 0.5) * 2; // number between -0.5 and 0.5, times 2. ENd up with a number between -1 and 1. Enemy can go up or down.
        this._rotSpeed = (Math.random() - 0.5) * 3; // Should we keep _rotSpeed in the constructor in case we decide we want to rotate them at some other point, like when we blow them up?
        this.rotation = this._ySpeed * -7; // This is very unscientific/unmathematic, but does sort of work for now.... :D 
        this._createElement();
        Game.entityManager.add(this); // when constructor function is first run, it pushes this instance of Enemy1 into the array 'entities' in instance of entityManager created by game instance of GameSystem. 
    }

    // The below function is verrrry slightly different in both enemies. Should I put it in the base class and then override it in in enemy1 to add back in the line that's missing in enemy2? I'm going to try,  by placing the function in the base class, then overriding it in enemy1 by typing it in, with just the missing line, with super.update(); in the first line.
    /* update () {  
        this.x += this._xSpeed;
        this.y += this._ySpeed;
        // this.rotation += this._rotSpeed; // Is stopping rotation as simple as NOT updating rotation speed??? Rotation is now always 0. Feels like I've cheated though.
        if (Game.entityManager.outOfBounds(this)) {
            this._destroy();
        }
    } */

    /* 
    processCollision (player) {
        player.removeLife(this.energy);
        this._explode();
    } 
    */ 

    // Aha! I've found the culprit. Enemy2 blows up when life is LESS THAN zero - which explains my confusion over bullet energy 10 vs enemy2 life 10!
    removeLife (howMuch) {
        super.removeLife(howMuch);
        if (this.life <= 0) {
            this._explode();
        }
    }

    // This is a private method. It should only be run by other functions / methods within this class. Is it okay to move it to the base class? Does private apply across base and child/sub classes? 
    /*
    _explode () {
        if (this.destroyed) return;
        new Explosion(this.x + (this.width / 2), this.y + (this.height / 2), this._xSpeed, this._ySpeed);
        this._destroy();
    }
    */

    /* 
    _destroy () {
        if (this.destroyed) return;
        this.destroyed = true;
        this.$element.remove();
        this.$element = null;
    }
    */
    
    // I figured these were too short and different to bother moving to the base class?
    _createElement () {
        this.$element = $('<div></div>').addClass('entity enemy2');
        } 
}
