﻿
import CollisionManager from "./collisionManager.js";
import Enemy1 from "../enemy/enemy1.js";
import Enemy2 from "../enemy/enemy2.js"; 
import Enemy3 from "../enemy/enemy3.js"; 
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

