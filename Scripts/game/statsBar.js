
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

    setScore() {
        this._$score.text("Placeholder for the current score");
    }
    // So we have a new method in the class now. We need to go and find where setScore should be called. Something presumably should create a new instance of StatsBar, when a new game is started? I guess we will need to call it there? Hmm, let's go see. (Skips off in search....)
};