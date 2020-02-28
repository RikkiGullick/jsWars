
export default class StatsBar {
    _$tick = null;
    _$score = null; 
    score = 0; 
    
    constructor() {
        this._$tick = $('#tick');
        this._$score = $('#score'); 
        this.score = 0;
    }

    setTick(value) {
        this._$tick.text(value);
    }

    updateScore(value) {
        if(value > 0) {
            this.score = this.score + value;
        }
    }

    setScore() {
        this._$score.text(`Score: ${this.score}`);
    }

};