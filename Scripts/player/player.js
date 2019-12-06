
sw.player = function player() {
    this.init();
}

sw.player.prototype = {
    $element: null,
    x: 0,
    y: 0,
    width: 80,
    height: 24,
    isNew: true,
    rotation: 0,
    destroyed: false,
    painTimeoutId: null,

    energy: 1,
    life: 40,
    type: 'player',

    init: function () {
        this._createElement();
        this._controller = new sw.mouseController(this);
        gameSystem.entityManager.add(this);
    },

    update: function updatePlayer (tick) {
        if(this.destroy) return;
        this._controller.update();
        if (tick % 8 === 0) this._fire();
    },

    removeLife: function removeLife(howMuch) {
        if (this.destroyed) return;
        this.life = this.life - howMuch;
        if (this.life < 0) this._explode();
        else this._showPain();
    },

    _showPain: function () {
        if (!this.$element) return;
        var $el = this.$element.addClass('ouch');
        clearTimeout(this.painTimeoutId);
        this.painTimeoutId = setTimeout(function () {
            $el.removeClass('ouch');
        }, 100);
    },

    _explode: function() {
        new sw.explosion(this.x + (this.width / 2), this.y + (this.height / 2), 0, 0, 'big', 60);
        this._destroy();
   },

    _destroy: function () {
        if (this.destroyed) return;
        this.destroyed = true;
        this.$element.remove();
        this.$element = null;
    },

    _fire: function () {
        new sw.bullet(this.x + 104, this.y + 13, 10, 0);
    },

    _createElement: function () {
        this.$element = $('<div><span /><span /></div>').addClass('entity player-ship');
    }
};