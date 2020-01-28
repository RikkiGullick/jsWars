
export default class CollisionManager {
    process (entities) {
        var index = 0,
            player = entities[0].type === 'player' ? entities[0] : null,
            enemies = entities.filter(function (entity) { return entity.type === 'enemy' && !entity.destroyed; }),
            collideWithEnemies = entities.filter(function (entity) { return entity.collideWith === 'enemy' && !entity.destroyed; }),
            collideWithPlayer = entities.filter(function (entity) { return entity.collideWith === 'player' && !entity.destroyed; });

        this._processEnemyCollisions(collideWithEnemies, enemies);
        if (player) {
            this._processPlayerCollisions(collideWithPlayer, player);
        }
    }

    _processEnemyCollisions (entities, enemies) {
        for (var i = 0; i < entities.length; i++) {
            var entity = entities[i];
            for (var j = 0; j < enemies.length; j++) {
                var enemy = enemies[j];
                if (this._isCollision(entity, enemy)) {
                    entity.processCollision(enemy);
                }
            }
        }
    }

    _processPlayerCollisions (entities, player) {
        for (var i = 0; i < entities.length; i++) {
            var entity = entities[i];
            if (this._isCollision(entity, player)) {
                entity.processCollision(player);
            }
        }
    }

    _isCollision (entity1, entity2) {
        if (entity1.destroyed || entity2.destroyed) return false;
        var b1 = this._entityBounds(entity1),
            b2 = this._entityBounds(entity2);

        if (b1.x < b2.x2 && b1.x2 > b2.x && b1.y < b2.y2 && b1.y2 > b2.y) {
            return true;
        }
        return false;
    }

    _entityBounds (entity) {
        var x = entity.x, y = entity.y;
        return {
            x: x,
            y: y,
            x2: x + entity.width,
            y2: y + entity.height
        };

    }
};