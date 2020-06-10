
import Player from '../player/player.js';
import StatsBar from './statsBar.js';
import View from './view.js';
import EntityManager from '../entities/entityManager.js';

class GameSystem {
    entityManager = null; 
    _view = null;
    _player = null;
    _tick = 0;
    
    // 2. This runs when the instance 'game' is created.
    constructor() { 
        this.entityManager = new EntityManager(this._tick); // 3. This line creates a new instance of enetityManager. Go see EntityManager class!
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
    }

    // place a get function in here so other things can access the tick? Nope - should be able to pass the tick to the EntityManager constructor. But will it only pass the tick at the point the instance was created? Argh. Let's try a getter and see what happens.

    get returnTick() {
        //return this._tick;
        console.log(24);
        return 42;
    }


}

let game = new GameSystem(); // 1. creates an instance of Gamesystem. Runs the constructor! Go see above! 
export default game;
