
sw.bullet = function bullet(startX, startY, xSpeed, ySpeed) {
    this.init(startX, startY, xSpeed, ySpeed);
}

sw.bullet.prototype = {
    $element: null,
    x: 0,
    y: 0,
    width: 12,
    height: 8,
    isNew: true,
    rotation: 0,
    destroyed: false,
    _xSpeed: 0,
    _ySpeed: 0,

    energy: 10,
    type: 'bullet',
    collideWith: 'enemy',

    init: function (startX, startY, xSpeed, ySpeed) {
        this.x = startX;
        this.y = startY;
        this._xSpeed = xSpeed;
        this._ySpeed = ySpeed;
        this._createElement();
        gameSystem.entityManager.add(this);
    },

    update: function () {
        this.x += this._xSpeed;
        this.y += this._ySpeed;
        if (gameSystem.entityManager.outOfBounds(this)) {
            this._destroy();
        }
    },

    processCollision: function processCollision(enemy) {
        enemy.removeLife(this.energy);
        this._destroy();
    },

    _destroy: function kill() {
        this.destroyed = true;
        if (this.$element) {
            this.$element.remove();
            this.$element = null;
        }
    },

    _createElement: function () {
        this.$element = $('<div></div>').addClass('entity bullet');
    }
};

