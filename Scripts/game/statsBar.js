﻿
export default class StatsBar {
    _$tick = null;
    _$score = null; 
    _$life = null;
    _$lifeBar = null;
    score = 0; 
    life = 250; 
    
    constructor() {
        this._$tick = $('#tick');
        this._$score = $('#score'); 
        this._$life = $('#life');
        this._$lifeBar = $('#lifeBar');
        this.score = 0;
        this.life = 250; // updated from 50 to 250 for testing purposes
    }

    setTick(value) {
        this._$tick.text(value);
    }

    updateScore(value) {
        if(value > 0) {
            this.score += value;
        }
    }

    updateLife(value) {
        this.life -= value; 
        this._$lifeBar.css({"width": `${(this.life / 2.5) + 5}%`, "background-color": `rgb(200, ${this.life}, 0)`}); 
    }

    displayScore() {
        this._$score.text(`Score: ${this.score}`);
    }

    displayLife() {
        this._$life.text(`Life: ${this.life}`); 
        this._$life.css("color", `rgb(147, ${this.life}, 0)`); 
    }
    
};