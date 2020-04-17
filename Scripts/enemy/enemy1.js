
import Explosion from "../explosion/explosion.js";
import Game from "../game/game.js";
import Enemy from "../enemy/enemy-base.js";



export default class Enemy1 extends Enemy {
    // $element = null; // this is the jQuery object containing our actual div.
    // x = 0;  // moved to base class
    // y = 0; // moved to base class
    // width = 50;  // size
    // height = 50;
    // isNew = true;  // what's this? Is it being used yet? Will go look later.
    // rotation = 0;
    // destroyed = false;
    // _xSpeed = 0;
    // _ySpeed = 0;

    // energy = 50; 
    // life = 10;
    // type = 'enemy';
    // collideWith = 'player';

    constructor () {
        super(); // Need to run the constructor in the base class otherwise it gets cross! 
        // var bounds = Game.entityManager.getBounds(); // Appears in both enemy1 & enemy2. Can't make it work when I move it to base class constructor. Thought it was cos it needs exporting but that didn't seem to work either. 
        // this.x = bounds.width; // Eventually realise I need to move these to base class too, cos 'var bounds = etc' only exists so these next two lines can run.
        // this.y = bounds.height * Math.random();
        // this._xSpeed = -Math.random() * 6;
        // this._ySpeed = (Math.random() - 0.5) * 2;
        // this._rotSpeed = (Math.random() - 0.5) * 3;
        // this._createElement();
        // Hmm, next I will look at these and see if I can move them to the base class. I feel like these need to run after everything in the constructor in the subclass is run, but I'm not quite sure if my brain is doing things in the same order as JavaScript does.
        // Game.entityManager.add(this); // when constructor function is first run, it pushes this instance of Enemy1 into the array 'entities' in instance of entityManager created by game instance of GameSystem. 
    }


    // These 'set' functions now occur in both child classes and are run in the superconstructor.
    _setSpeed() {
        console.log("_setSpeed is running!");
        this._xSpeed = -Math.random() * 6;
        this._ySpeed = (Math.random() - 0.5) * 2;
    }

    _setRotSpeed() {
        this._rotSpeed = (Math.random() - 0.5) * 3;
    }

    // Don't know if this is right? Can't _not_ have this function otherwise an error will throw when the superconstructor tries to call it when creating enemy1. But having a function which does nothing feels a bit wrong. 
    _setRotation() {
        return;
    }

    // Experiment below! So when update(); is called on an instance of enemy1, super.update(); runs what's in the base class function first, then the missing line is run. I wonder if this would go wrong if you were adding a line which then affected the rest of the function? Guessing you'd need to bring more into the subclass function in that situation. Anyway, this worked! Hooray!
    update () {  
        super.update();
        this.rotation += this._rotSpeed;
    }

    /* 
    processCollision (player) {
        player.removeLife(this.energy);
        this._explode();
    } 
    */

    removeLife (howMuch) {
        super.removeLife(howMuch);
        if (this.life < 0) {
            this._explode();
        }
    }

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
        this.$element = $('<div></div>').addClass('entity enemy1');
        console.log("_createElement is being run!");
        } 
}
