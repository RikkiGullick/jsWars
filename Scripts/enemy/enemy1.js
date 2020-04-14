
import Explosion from "../explosion/explosion.js";
import Game from "../game/game.js";
// import Enemy from "../enemy/enemy-base.js";

class Enemy {

    x = 0;  // position
    y = 0;
    // bounds = ??? // Maybe I should try declaring bounds here, but then 'var' creates it in the constructor again! So that won't work. 

    constructor() {
        console.log("superconstructor is working!");
        console.log(this.x); // logs 0 cos constructor in child class hasn't run yet
        var bounds = Game.entityManager.getBounds(); // This line is in constructor for enemy1 and 2, and is referenced by other lines. So decided to move it to super class. Doesn't work. I need to fully understand why we have var bounds in the constructor anyway. It runs a function once when the class is set up. Why is it not just in the class, rather than in the constructor? Is it because it just needs to set bounds according to the result of that function at that specific time? So the function never appears in the instance, just its result? Is this where I'm going wrong? Somehow the 'var' isn't making it to the instance? God I'm confused!  OHHHH hang on, is var only in existence WHILST the constructor is run? Never to be seen again? So it's only stored so that the rest of the constructor can run???

        // console errors below: 
        /* enemy1.js:38 Uncaught ReferenceError: bounds is not defined
    at new Enemy1 (enemy1.js:38)
    at EntityManager._createNewStuff (entityManager.js:51)
    at EntityManager.update (entityManager.js:39)
    at GameSystem._run (game.js:39)
    at game.js:30 */ 

    // Enemy1 can't read bounds. It's never getting referenced. Why? 

        this.x = bounds.width;
        this.y = bounds.height * Math.random();

        // OMFG I only went and F**KING FIXED IT!!!!!!! See insane ramblings above. Told you it would be something bleedin' obvious!!!!! 

    }

}

export default class Enemy1 extends Enemy {
    $element = null; // this is the jQuery object containing our actual div.
    // x = 0;  // moved to base class
    // y = 0; // moved to base class
    width = 50;  // size
    height = 50;
    isNew = true;  // what's this? Is it being used yet? Will go look later.
    rotation = 0;
    destroyed = false;
    _xSpeed = 0;
    _ySpeed = 0;

    energy = 50; 
    life = 10;
    type = 'enemy';
    collideWith = 'player';

    constructor () {
        super(); // Need to run the constructor in the base class otherwise it gets cross! 
        // var bounds = Game.entityManager.getBounds(); // Appears in both enemy1 & enemy2. Can't make it work when I move it to base class constructor. Thought it was cos it needs exporting but that didn't seem to work either. 
        // this.x = bounds.width; // Eventually realise I need to move these to base class too, cos 'var bounds = etc' only exists so these next two lines can run.
        // this.y = bounds.height * Math.random();
        this._xSpeed = -Math.random() * 6;
        this._ySpeed = (Math.random() - 0.5) * 2;
        this._rotSpeed = (Math.random() - 0.5) * 3;
        this._createElement();
        // Game.entityManager.createElement(); // testing if I can move the createElement function so my new enemy can use it. To revert, comment this line and uncomment line above. What do I do to the below in order to make 'this' be the thing that's created by the 'createELement' function in entityManager?
        // UPDATE - it looks like it's working but my enemy1s are invisible!!! Is this because they are a null object? Is my div never making it back over here? Or is the div being created but it's not adding the class? Perhaps if I add some text into the div they'll at least be visible? No. Okay, it's running the function but I think the div is not making it back over here to be 'this', hence all my console errors. Hmm. Presumably it keeps trying to run all the functions in my enemy1 instances but they are all null obejects so it gets cross.
        Game.entityManager.add(this); // when constructor function is first run, it pushes this instance of Enemy1 into the array 'entities' in instance of entityManager created by game instance of GameSystem. 
    }

    update () {  // guessing this runs whenever 'run' is run in the loop! There are a couple of 'update' functions, need to get it straight in my head which one is which. There's a different one in entityManager.
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
    // to revert, uncomment function below, and comment the one in entityManager.
    _createElement () {
        this.$element = $('<div></div>').addClass('entity enemy1');
        } 
}
