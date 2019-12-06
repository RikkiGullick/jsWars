
sw.statsBar = function statsBar() {
    this.init();
}

sw.statsBar.prototype = {
    _$tick: null,

    init: function() {
        this._$tick = $('#tick');
    },

    setTick: function(value) {
        this._$tick.text(value);
    }

};