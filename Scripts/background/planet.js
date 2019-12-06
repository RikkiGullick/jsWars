
sw.planet = function planet() {
    this.init();
}

sw.planet.prototype = {
    $element: null,
    x: 0,
    y: 0,
    width: 20,
    height: 20,
    isNew: true,
    rotation: 0,
    destroyed: false,
    _xSpeed: 0,
    _ySpeed: 0,

    init: function () {
        var bounds = gameSystem.entityManager.getBounds();
        this.x = bounds.width;
        this.y = bounds.height * Math.random();
        this._xSpeed = -1;
        this._createElement();
        gameSystem.entityManager.add(this);
    },

    update: function () {
        this.x += this._xSpeed;
        if (gameSystem.entityManager.outOfBounds(this)) {
            this._destroy();
        }
    },

    _destroy: function () {
        if (this.destroyed) return;
        this.destroyed = true;
        this.$element.remove();
        this.$element = null;
    },

    _createElement: function () {
        this.$element = $('<div></div>').addClass('entity planet');
    }
};