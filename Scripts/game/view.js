
import Game from './game.js';

export default class View {
    _$view = null;
    _bounds = { width: 0, height: 0 };

    constructor() {
        this._$view = $('#game');
    }

    draw() {
        var _this = this;
        Game.entityManager.getEntities().forEach(function (entity) {
            _this._updateEntity(entity);
        });
    }

    _updateEntity(entity) {
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