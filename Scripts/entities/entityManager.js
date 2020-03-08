
import CollisionManager from "./collisionManager.js";
import Enemy1 from "../enemy/enemy1.js";
import Enemy2 from "../enemy/enemy2.js"; // import my new enemy
import Planet from "../background/planet.js";

export default class EntityManager {
    _entities = null;
    _$game = null;
    _bounds = null;
    _collisionManager = null;

    constructor () {
        this._collisionManager = new CollisionManager();
        this._entities = [];
        this._$game = $('#game');
        this._bounds = {
            width: this._$game.width(),
            height: this._$game.height()
        }
    }

    add (entity) {
        this._entities.push(entity);
    }

    getEntities () {
        return this._entities;
    }

    update (tick) {  // runs when called by 'run' in the loop in game instance. 
        var _this = this;
        this._entities.forEach(function (entity, index) {
            entity.update(tick);
        });
        this._collisionManager.process(this._entities);
        this._entities = this._entities.filter(function (entity) { return !entity.destroyed; });
        this._createNewStuff(tick); // with each 'tick' this runs the function below which controls what entities to create and when.
    }

    _createNewStuff (tick) {    // Looks like I can manipulate this function to add my new enemy at certain points of the tick.
        var createFactor = 0.04;
        if (tick > 400) createFactor += 0.02;   
        if (tick > 800) createFactor += 0.02; // Adding to createFactor makes new enemy1 more likely.  

        // I will need to make a new function like the one below in order for my new enemy to appear. Will set it similarly to start with, then look at timings later. I may switch off enemy1 temporarily whilst I work on enemy2.

        if (Math.random() < createFactor) { // createFactor keeps increasing so creation of enemy1 is increased?? Maybe I could switch it to 'greater than' so they are gradually reduced? Or add another clause (what's the word for this? Expression?) to this if statement so they only get created when tick is between two certain figures.
            new Enemy1(); // Hmm. This is interesting. It's not storing this as a variable - it just 'runs' the constructor??? Probably cos the constructor function stores it to an array?
        }

        if (tick % 500 === 0 && Math.random() < 0.3) { // each time the tick reaches a multiple of 500, there's a 30% chance a planet will be created.
            new Planet();
        }
    }

    outOfBounds (entity) {
        return entity.x < (0 - entity.width) || entity.y < (0 - entity.height) || entity.x > this._bounds.width || entity.y > this._bounds.height;
    }

    getBounds () {
        return this._bounds;
    }

    // experimenting with moving this here from enemy1, but how do I then pass the $element back to enemy1? Can I type the name of the class like I've done below, or do I need the name of the instance? Hmm... The instance is being sent straight to an array. So how do I refer to the instance??? And even if typing Enemy1 works, what if Enemy2 wants to use this function? I should be able to work this out... But I can't. Grr.
    createElement () {
        console.log("Testing whether createElement is running in entityManager")
        Enemy1.$element = $('<div><p style="color: #CC99FF">BADDY!</p></div>').addClass('entity enemy1'); // this is the problem line I think. 
    }

};

