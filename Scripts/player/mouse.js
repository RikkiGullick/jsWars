
export default class MouseController {
    _player = null;
    _mouseX = 0;
    _mouseY = 0;
    _INERTIA = 0.05;

    constructor (player) {
        this._player = player;
        this._$game = $('#game');
        this._bind();
    }

    update() {
        var xDiff = this._mouseX - this._player.x,
            yDiff = this._mouseY - this._player.y;
        this._player.x = this._player.x + (xDiff * this._INERTIA);
        this._player.y = this._player.y + (yDiff * this._INERTIA);
        this._player.rotation = yDiff / 16;
    }

    _bind() {
        var _this = this;
        $(document)
            .on('mousemove', function (evt) { _this._move(evt); });
    }

    _move(evt) {
        this._setMouseX(evt);
        this._setMouseY(evt);
    }

    _setMouseX(evt) {
        var x = evt.pageX - this._$game.offset().left,
            w = this._$game.width();
        this._mouseX = Math.max(Math.min(x, w), 0);
    }

    _setMouseY(evt) {
        var y = evt.pageY - this._$game.offset().top,
            h = this._$game.height();
        this._mouseY = Math.max(Math.min(y, h), 0);
    }
}