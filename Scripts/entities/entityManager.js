
sw.entityManager = function entityManager() {
    this.init();
}

sw.entityManager.prototype = {
    _entities: null,
    _$game: null,
    _bounds: null,
    _collisionManager: null,

    init: function () {
        this._collisionManager = new sw.collisionManager();
        this._entities = [];
        this._$game = $('#game');
        this._bounds = {
            width: this._$game.width(),
            height: this._$game.height()
        }
    },

    add: function (entity) {
        this._entities.push(entity);
    },

    getEntities: function() {
        return this._entities;
    },

    update: function(tick) {
        var _this = this;
        this._entities.forEach(function (entity, index) {
            entity.update(tick);
        });
        this._collisionManager.process(this._entities);
        this._entities = this._entities.filter(function (entity) { return !entity.destroyed; });
        this._createNewStuff(tick);
    },

    _createNewStuff: function (tick) {
        var createFactor = 0.04;
        if (tick > 400) createFactor += 0.02;
        if (tick > 800) createFactor += 0.02;

        if (Math.random() < createFactor) {
            new sw.enemy1();
        }

        if (tick % 500 === 0 && Math.random() < 0.3) {
            new sw.planet();
        }
    },

    outOfBounds: function outOfBounds(entity) {
        return entity.x < 0 || entity.y < 0 || entity.x > this._bounds.width || entity.y > this._bounds.height;
    },

    getBounds: function () {
        return this._bounds;
    }
};

