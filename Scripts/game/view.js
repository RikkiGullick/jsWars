
sw.view = function view(entityList) {
    this.init(entityList);
}

sw.view.prototype = {
    _$view: null,
    _bounds: { width: 0, height: 0 },

    init: function () {
        this._$view = $('#game');
    },

    draw: function drawEntities() {
        var _this = this;
        window.gameSystem.entityManager.getEntities().forEach(function (entity) {
            _this._updateEntity(entity);
        });
    },

    _updateEntity: function updateEntity(entity) {
        if (entity.isNew && entity.$element) {
            entity.$element.appendTo(this._$view);
            entity.isNew = false;
        }
        if (entity.$element) {
            var scale = entity.scale || 1;
            entity.$element.css({
                transform: 'translateX(' + entity.x + 'px) translateY(' + entity.y + 'px) rotateZ(' + entity.rotation + 'deg) scale(' + scale + ')'
            });
        }
    }

};