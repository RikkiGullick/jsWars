
import CollisionManager from "./collisionManager.js";
import Enemy1 from "../enemy/enemy1.js";
import Enemy2 from "../enemy/enemy2.js"; 
import Enemy3 from "../enemy/enemy3.js"; 
import Planet from "../background/planet.js";
// import game from "../game/game.js"; 


class Wave {

    currentWaveNumber = 0;
    // tick = 0;

    constructor(tick) {
        // this.tick = tick;
        // Don't yet know what I should put in here!
        // pushWaveToWavesContainer();
    }

    /* pushWaveToWavesContainer() {
        wavesContainer.push("I'm a wave, honest");
        console.log(wavesContainer);
    } */

}

class Level { // 6. So whilst instance of game starts being made, entityManager starts being made, and now an instance of this class Level starts being made! (At this point, none of the above are actually finished! This is why we can't import the instance of game and refer to it here - it's not been fully created yet!)
    
    currentLevelNumber = 0; 
    
    wavesContainer = null; 
    
    constructor(levelNumber, tick) {
        this.currentLevelNumber = levelNumber; 
        this.logLevelCreation(); 

        this.wavesContainer = [];
        this.wavesContainer.push(new Wave(tick));
        this.logWaveCreation();
    }

    logLevelCreation() {
        console.log(`Level ${this.currentLevelNumber} has just been created.`); 
    }

    logWaveCreation() {
        console.log(this.wavesContainer[0]);
        // console.log(`Tick is currently ${game.returnTick}`);   // We can't use this yet cos 'game' doesn't exist!
    }

}

// We want the tick from the game to be available to the wave. So we need to create the instance of level NOT in the constructor of entityManager. If we create our level instance AFTER game and entityManager instances have finished being created, all will be well, I htink?! Now, I just have to remember how / where to create the new level instance. I remember level and wave classes going into a separate file. We then imported the game instance into that file - presumably that file doesn't get 'opened' until after the game instance is created, as we won't call the stuff from it until after these are made? Where/when did we create the new instance of level? Hmm, I shall think on it and it will come back to me....  

export default class EntityManager { // 4. Whilst the game instance is being created (the constructor function is running from GameSystem class) an instance of EntityManager is created. And whilst it's being created, the constructor runs and then an instance of Level is created! Go see 5 below! 
    _entities = null;
    _$game = null;
    _bounds = null;
    _collisionManager = null;
    _level = null; // dictates that level will be an object

    constructor (tick) {
        this._collisionManager = new CollisionManager();
        this._entities = [];
        this._$game = $('#game');
        this._bounds = {
            width: this._$game.width(),
            height: this._$game.height()
        }
        this._level = new Level(1, tick); // 5. Whilst the instance of game is being created, and the instance of entityManager is being created, now, an instance of Level is being created! Go see 6 above!
    }

    add (entity) {
        this._entities.push(entity);
    }

    getEntities () {
        return this._entities;
    }

    update (tick) { 
        var _this = this;
        this._entities.forEach(function (entity, index) {
            entity.update(tick);
        });
        this._collisionManager.process(this._entities);
        this._entities = this._entities.filter(function (entity) { return !entity.destroyed; });
        this._createNewStuff(tick); 
    }

    _createNewStuff (tick) {    
        var createFactor = 0.04;
        if (tick > 400) createFactor += 0.02;   
        if (tick > 800) createFactor += 0.02;  

        if ( Math.random() < createFactor && tick < 1200 ) { 
            new Enemy1();
        } 

        if ( Math.random() < createFactor && (tick > 1200) && (tick < 2400) ) { 
            new Enemy2(); 
        }

        if ( Math.random() < (createFactor / 4) && tick > 2400 && tick < 3600 ) { 
            new Enemy3();
        } 

        if (tick % 500 === 0 && Math.random() < 0.3) {
            new Planet();
        }
    }

    outOfBounds (entity) {
        return entity.x < (0 - entity.width) || entity.y < (0 - entity.height) || entity.x > this._bounds.width || entity.y > this._bounds.height;
    }

    getBounds () {
        return this._bounds;
    }

};

