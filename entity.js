Game.Entity = function(properties) {
    properties = properties || {};
    // Call the glyph's construtor with our set of properties
    Game.DynamicGlyph.call(this, properties);

    this._speed = properties['speed'] || 1000;
    this._x = properties['x'] || 0;
    this._y = properties['y'] || 0;
    this._z = properties['z'] || 0;
    this._map = null;
    this._alive = true;


   
}
// Make entities inherit all the functionality from glyphs
Game.Entity.extend(Game.DynamicGlyph);

Game.Entity.prototype.setSpeed = function(speed) {
    this._speed = speed;
};
// ...
Game.Entity.prototype.getSpeed = function() {
    return this._speed;
};

Game.Entity.prototype.tryMove = function(x, y, z, map){
        map = this.getMap();
        let tile = map.getTile(x, y, this.getZ());
        let target = map.getEntityAt(x, y, this.getZ());
      
        if (z < this.getZ()){
            if (tile != Game.Tile.stairsUpTile){
                Game.sendMessage(this, "Climbing upward from here would be impossible");
            } else {
                Game.sendMessage(this, "You climb to level %d", [z+1]);
                this.setPosition(x, y, z);
            }
        } else if (z > this.getZ()){
            if (tile === Game.Tile.holeToCavernTile &&
                this.hasMixin(Game.Mixins.PlayerActor)) {
            // Switch the entity to a boss cavern!
                this.switchMap(new Game.Map.BossCavern());
            } else if (tile != Game.Tile.stairsDownTile){
                Game.sendMessage(this, "There are no means to descend from here")
            } else {
                this.setPosition(x, y, z);
                Game.sendMessage(this, "You descend further, reaching level %d", [z+1])
            }
        } else if (target){
            if (this.hasMixin('Attacker') && 
                (this.hasMixin(Game.Mixins.PlayerActor) ||
                target.hasMixin(Game.Mixins.PlayerActor))) {
                this.attack(target);
                return true;
            } else {
                return false;
            }
        } else if (tile.isWalkable()){

            this.setPosition(x, y, z);
            let items = this.getMap().getItemsAt(x, y, z);
            if (items){
                if (items.length === 1){
                    Game.sendMessage(this, 'You see %s', [items[0].describeA()])
                } else {
                    Game.sendMessage(this, "There is much loot to be had")
                }
            }
            return true;
        } else if (tile.isDiggable()){
            if (this.hasMixin(Game.Mixins.PlayerActor)){
                map.dig(x,y,z);
                return true;
            }
            return false;

        }
        return false;
    
}

Game.Entity.prototype.isAlive = function() {
    return this._alive;
};
Game.Entity.prototype.kill = function(message) {
    // Only kill once!
    if (!this._alive) {
        return;
    }
    this._alive = false;
    if (message) {
        Game.sendMessage(this, message);
    } else {
        Game.sendMessage(this, "You have died!");
    }

    // Check if the player died, and if so call their act method to prompt the user.
    if (this.hasMixin(Game.Mixins.PlayerActor)) {
        this.act();
    } else {
        this.getMap().removeEntity(this);
    }
};


Game.Entity.prototype.setX = function(x) {
    this._x = x;
}
Game.Entity.prototype.setY = function(y) {
    this._y = y;
}
Game.Entity.prototype.setZ = function(z) {
    this._z = z;
}

Game.Entity.prototype.getX = function() {
    return this._x;
}
Game.Entity.prototype.getY   = function() {
    return this._y;
}
Game.Entity.prototype.getZ = function() {
    return this._z;
}
Game.Entity.prototype.setPosition = function(x, y, z) {
    let oldX = this._x;
    let oldY = this._y;
    let oldZ = this._z;

    this._x = x;
    this._y = y;
    this._z = z;

    if (this._map){
        this._map.updateEntityPosition(this, oldX, oldY, oldZ);
    }
}
Game.Entity.prototype.setMap = function(map) {
    this._map = map;
}
Game.Entity.prototype.getMap = function() {
    return this._map;
}

Game.Entity.prototype.switchMap = function(newMap) {
    // If it's the same map, nothing to do!
    if (newMap === this.getMap()) {
        return;
    }
    this.getMap().removeEntity(this);
    // Clear the position
    this._x = 0;
    this._y = 0;
    this._z = 0;
    // Add to the new map
    newMap.addEntity(this);
};

