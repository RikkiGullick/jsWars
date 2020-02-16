
import Player from '../player/player.js';
import StatsBar from './statsBar.js';
import View from './view.js';
import EntityManager from '../entities/entityManager.js';

// What's creating the instance of GameSystem? Oh, read to the end Jen.... :D (PS Sorry, I know in real life you can't waffle your way all over the code like I am doing! I will delete all this stuff before submitting PR!)

class GameSystem {
    entityManager = null;;
    _view = null;
    _player = null;
    _tick = 0;
    
    constructor() {
        this.entityManager = new EntityManager();
        this.stats = new StatsBar();  // Aha - found it! So this creates an object called 'stats', created from class 'StatsBar', inside object instance of GameSystem class. This class now has my new method in it which makes a jQuery object from the score div and when the setScore method is run, adds placeholder text to the div.
        this._view = new View();
    }

    start() {
        this._player = new Player();
        this._startLoop();
    }

    _startLoop() {
        var _this = this;
        this._intervalId = setInterval(function () {
            _this._run();
        }, 1000 / 60);
    }

    _stopGame() {
        clearInterval(this._intervalId);
    }

    _run() {
        this.entityManager.update(this._tick);
        this._view.draw();
        this._tick++;

        this.stats.setTick(this._tick);
        this.stats.setScore("Test"); // so when method '_run' is called, the object instance 'stats' runs method setScore, passing this placeholder argument to it. How do I get a useful argument into it? I think I need to make a variable somewhere in entityManager instance, or collisionManager, and raise it by one each time the collision thing returns true. My challenge is how to get that info from one place to another. I shall think about this another time cos faffed about for a while getting nowhere. (Update - I added a variable in explosion to try and count explosions, but failed - didn't check when explosion runs and its obviously creating a new instance each time explosion happens so my variable is always resetting to zero with each instance. Drat. Oh well. Next time!)
    }
}

let game = new GameSystem();
export default game;
