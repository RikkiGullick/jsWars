
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
        this._$score.text(value);
    }
    // Need to get whatever calls the function setScore to pass the value of how many 'destroys' have happened.
};