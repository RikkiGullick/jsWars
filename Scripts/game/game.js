
import Player from '../player/player.js';
import StatsBar from './statsBar.js';
import View from './view.js';
import EntityManager from '../entities/entityManager.js';

// What's creating the instance of GameSystem? Oh, read to the end Jen.... :D (PS Sorry, I know in real life you can't waffle your way all over the code like I am doing! I will delete all this stuff before submitting PR!)

class GameSystem {
    entityManager = null; // there were two semi-colons here. Presuming there shouldn't be and that I did a typo without realising.
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
        this.stats.setScore(); // runs the setScore function from statsBar. No longer needs an argument cos is getting value from within statsBar.
    }
}

let game = new GameSystem();
export default game;
