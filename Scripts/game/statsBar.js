
export default class StatsBar {
    _$tick = null;
    _$score = null; // null means an object is expected
    
    constructor() {
        this._$tick = $('#tick');
        this._$score = $('#score'); // grabs div id score and turns it into jQuery object
    }

    setTick(value) {
        this._$tick.text(value);
    }

    setScore(value) {
        this._$score.text(`Score: ${value}`);
    }
    // Need to get whatever calls the function setScore to pass the value of how many 'destroys' have happened. UPDATE - I now have a variable with the score in it, in instance 'game!!' Just need to check that the file which calls setScore can see it, and then pass the value to the function. UPDATE: DONE!!!! WOOOHOOOOO!!!
};