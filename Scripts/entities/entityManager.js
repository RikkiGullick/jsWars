
import CollisionManager from "./collisionManager.js";
import Enemy1 from "../enemy/enemy1.js";
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

        if (Math.random() < createFactor) {
            new Enemy1();
        }

        if (tick % 500 === 0 && Math.random() < 0.3) {
            new Planet();
        }
    }

    outOfBounds (entity) {
        console.log(entity.width);
        return entity.x < -50 || entity.y < -50 || entity.x > (this._bounds.width) || entity.y > (this._bounds.height);
        // I have a theory. I believe it's measuring from the top left of the enemy div, so therefore to return true at the bottom the enemy has to have pretty much gone off the screen, but to return true at the top or left, the enemy only has to touch the edge of the screen. I need to get the width / height of the enemy div, and make the second two bits say 'if enemy position-left is greater than (bounds.width + enemy width), or if enemy position-top is greater than (bounds.height + enemy height). Or something like that.
        // UPDATE Did not work! Well obviously. I am all back to front. I need to sort top and left, not right and bottom. Trying minus numbers in the first two bits. Yay, fixed!
    }

    getBounds () {
        return this._bounds;
    }
};

