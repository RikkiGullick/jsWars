
import Player from '../player/player.js';
import StatsBar from './statsBar.js';
import View from './view.js';
import EntityManager from '../entities/entityManager.js';

class GameSystem {
    entityManager = null; 
    _view = null;
    _player = null;
    _tick = 0;
    
    
    constructor() {
        this.entityManager = new EntityManager();
        this.stats = new StatsBar(); 
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
        this.stats.setScore(); 
    }
}

let game = new GameSystem();
export default game;
