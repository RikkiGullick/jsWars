
export default class StatsBar {
    _$tick = null;
    
    constructor() {
        this._$tick = $('#tick');
    }

    setTick(value) {
        this._$tick.text(value);
    }

};