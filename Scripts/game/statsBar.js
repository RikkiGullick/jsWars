
export default class StatsBar {
    _$tick = null;
    _$score = null; 
    _$life = null;
    score = 0; 
    
    constructor() {
        this._$tick = $('#tick');
        this._$score = $('#score'); 
        this._$life = $('#life');
        this.score = 0;
    }

    setTick(value) {
        this._$tick.text(value);
    }

    updateScore(value) {
        if(value > 0) {
            this.score += value;
        }
    }

    displayScore() {
        this._$score.text(`Score: ${this.score}`);
    }

    displayLife(lifeRemaining) {
        this._$life.text(`Life: ${lifeRemaining}`); 
    }
    // Need to think about this function and what I am passing to it when. 
};