
// import Explosion from '../explosion/explosion.js';

// Can't remember why I was trying to import Explosion!  I didn't need to.

export default class StatsBar {
    _$tick = null;
    _$score = null; // null means an object is expected
    score = 0; // moveed this here so that all the other bits can access it. Hoping I can update value of scoreExplosion in instance 'game', from explosion.js or somewhere. Forgotten everything! I need to put it in the constructor?
    
    constructor() {
        this._$tick = $('#tick');
        this._$score = $('#score'); // grabs div id score and turns it into jQuery object
        this.score = 0;
    }

    setTick(value) {
        this._$tick.text(value);
    }

    setScore() {
        this._$score.text(`Score: ${this.score}`);
    }
    // Need to get whatever calls the function setScore to pass the value of how many 'destroys' have happened. UPDATE - I now have a variable with the score in it, in instance 'game!!' Just need to check that the file which calls setScore can see it, and then pass the value to the function. UPDATE: DONE!!!! WOOOHOOOOO!!!
};