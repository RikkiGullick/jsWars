
import Game from "../game/game.js";
import Bullet from './bullet.js';
import Explosion from '../explosion/explosion.js';
import MouseController from './mouse.js';

export default class Player {
    $element = null;
    x = 0;
    y = 0;
    width = 80;
    height = 24;
    isNew = true;
    rotation = 0;
    destroyed = false;
    painTimeoutId = null;

    energy = 1;
    type = 'player';

    constructor() {
        this._createElement();
        this._controller = new MouseController(this);
        Game.entityManager.add(this);
    }

    update(tick) {
        if(this.destroy) return;
        this._controller.update();
        if (tick % 8 === 0) this._fire();
    }

    removeLife(howMuch) {
        if (this.destroyed) return;
        Game.stats.updateLife(howMuch); // NEW UPDATE - This now just passes a value to the function in instance of statsBar, it doesn't update life itself.
        // Game.stats.updateLife(this.life);  // Two issues - firstly this only runs when collision happens - need to run displayLife at the start. This should be a different function that just updates the life. Secondly, life is going down to -10 which looks a bit weird! Want to fix this. // UPDATE - changed life to 50 and _explode will run if life less than OR EQUAL TO zero. UPDATE - moving life to statsBar. Removing this function as it's not needed. Just need to run displayLife in game now. UPDATE - hahahahahahahahhahaaa I now live forever cos I've forgotten to update the line below to look at Game.stats.life! :D  FINAL UPDATE - Yay, everything works. Now, are my function names confusing? Hmm, no I think this is okay, cos this function removes life. The one in statsBar displays life. Everything does what it says on the tin. All good.
        if (Game.stats.life <= 0) this._explode();
        else this._showPain();
    }

    _showPain() {
        if (!this.$element) return;
        var $el = this.$element.addClass('ouch');
        clearTimeout(this.painTimeoutId);
        this.painTimeoutId = setTimeout(function () {
            $el.removeClass('ouch');
        }, 100);
    }

    _explode() {
        new Explosion(this.x + (this.width / 2), this.y + (this.height / 2), 0, 0, 'big', 60);
        this._destroy();
   }

    _destroy() {
        if (this.destroyed) return;
        this.destroyed = true;
        this.$element.remove();
        this.$element = null;
    }

    _fire() {
        new Bullet(this.x + 104, this.y + 13, 10, 0);
    }

    _createElement() {
        this.$element = $('<div><span /><span /></div>').addClass('entity player-ship');
    }
};