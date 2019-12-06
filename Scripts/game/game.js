/// <reference path="../view/view.js" />

(function () {

    window.gameSystem = {
        entityManager: null,
        _view: null,
        _player: null,
        _tick: 0,

        init: function() {
            this.entityManager = new sw.entityManager();
            this.stats = new sw.statsBar();
            this._view = new sw.view();
        },

        start: function startGame() {
            this._player = new sw.player();
            this._startLoop();
        },

        _startLoop: function startLoop() {
            var _this = this;
            this._intervalId = setInterval(function () {
                _this._run();
            }, 1000 / 60);
        },

        _stopGame: function stopGameLoop() {
            clearInterval(this._intervalId);
        },

        _run: function gameRunLoop() {
            this.entityManager.update(this._tick);
            this._view.draw();
            this._tick++;

            this.stats.setTick(this._tick);
        }
    };

})();
