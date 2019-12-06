
sw.explosion = function explosion(x, y, xSpeed, ySpeed, cssClass, maxAge) {
    this.init(x, y, xSpeed, ySpeed, cssClass, maxAge);
}

sw.explosion.prototype = {
    $element: null,
    x: 0,
    y: 0,
    isNew: true,
    rotation: 0,
    scale: 1,
    destroyed: false,
    _age: 0,

    init: function (x, y, xSpeed, ySpeed, cssClass, maxAge) {
        this.x = x;
        this.y = y;
        this._xSpeed = xSpeed || 0;
        this._ySpeed = ySpeed || 0;
        this._createElement(cssClass);
        this._maxAge = maxAge || 10;
        gameSystem.entityManager.add(this);
    },

    update: function () {
        this.x += this._xSpeed;
        this.y += this._ySpeed;
        this._age++;
        if (this._age > this._maxAge) {
            this._destroy();
        }
        else {
            this.scale += 0.1;
            this.$element.css({ opacity: 1 - (this._age / this._maxAge) })
        }
    },

    _destroy: function () {
        if (this.destroyed) return;
        this.destroyed = true;
        this.$element.remove();
        this.$element = null;
    },

    _createElement: function (cssClass) {
        this.$element = $('<div></div>').addClass('entity explosion' + (cssClass ? ' ' + cssClass : ''));
    }
};

