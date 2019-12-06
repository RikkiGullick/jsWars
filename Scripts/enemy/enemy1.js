
sw.enemy1 = function blobEnemy() {
    this.init();
}

sw.enemy1.prototype = {
    $element: null,
    x: 0,
    y: 0,
    width: 50,
    height: 50,
    isNew: true,
    rotation: 0,
    destroyed: false,
    _xSpeed: 0,
    _ySpeed: 0,

    energy: 10,
    life: 10,
    type: 'enemy',
    collideWith: 'player',

    init: function () {
        var bounds = gameSystem.entityManager.getBounds();
        this.x = bounds.width;
        this.y = bounds.height * Math.random();
        this._xSpeed = -Math.random() * 6;
        this._ySpeed = (Math.random() - 0.5) * 2;
        this._rotSpeed = (Math.random() - 0.5) * 3;
        this._createElement();
        gameSystem.entityManager.add(this);
    },

    update: function () {
        this.x += this._xSpeed;
        this.y += this._ySpeed;
        this.rotation += this._rotSpeed;
        if (gameSystem.entityManager.outOfBounds(this)) {
            this._destroy();
        }
    },

    processCollision: function (player) {
        player.removeLife(this.energy);
        this._explode();
    },

    removeLife: function removeLife(howMuch) {
        this.life = this.life - howMuch;
        if (this.life < 0) {
            this._explode();
        }
    },

    _explode: function () {
        if (this.destroyed) return;
        new sw.explosion(this.x + (this.width / 2), this.y + (this.height / 2), this._xSpeed, this._ySpeed);
        this._destroy();
    },

    _destroy: function() {
        if (this.destroyed) return;
        this.destroyed = true;
        this.$element.remove();
        this.$element = null;
    },

    _createElement: function () {
        this.$element = $('<div></div>').addClass('entity enemy1');
    }
};

