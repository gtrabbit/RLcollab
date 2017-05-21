Game.Map = function(tiles, player){
	this._tiles = tiles;
	this._depth = tiles.length
	this._width = tiles[0].length;
	this._height = tiles[0][0].length;
	this._entities = {};
    this._items = {};
    this._fov = [];
    var templates = ['dagger', 'sword', 'staff', 
        'tunic', 'chainmail', 'platemail'];
    for (var i = 0; i < templates.length; i++) {
        this.addItemAtRandomPosition(Game.ItemRepository.create(templates[i]),
            Math.floor(this._depth * Math.random()));
    }
    this.setupFov();
    this._explored = new Array(this._depth);
    this._setupExploredArray();
	this._scheduler = new ROT.Scheduler.Speed();
	this._engine = new ROT.Engine(this._scheduler);
};

Game.Map.prototype.getWidth = function(){
	return this._width;
};
Game.Map.prototype.getHeight = function(){
	return this._height;
};
Game.Map.prototype.getDepth = function() {
    return this._depth;
};

Game.Map.prototype.getPlayer = function() {
    return this._player;
};

Game.Map.prototype.dig = function(x, y, z) {
    // If the tile is diggable, update it to a floor
    if (this.getTile(x, y, z).isDiggable()) {
        this._tiles[z][x][y] = Game.Tile.floorTile;
    }
}


Game.Map.prototype.removeEntity = function(entity){
    let key = entity.getX() + ',' + entity.getY() + ',' + entity.getZ();
    if (this._entities[key] == entity){
        delete this._entities[key];
    }
	if (entity.hasMixin('Actor')){
		this._scheduler.remove(entity);
	}
    if (entity.hasMixin(Game.Mixins.PlayerActor)) {
        this._player = undefined;
    }
}

Game.Map.prototype.setupFov = function(){
    let map = this;
    for (let z = 0; z < this._depth; z++){
        (function(){
            let depth = z;
            map._fov.push(
                new ROT.FOV.DiscreteShadowcasting(function(x, y){
                    return !map.getTile(x, y, depth).isBlockingLight();
                }, {topology: 4}))
        }) ();
    }
}

Game.Map.prototype._setupExploredArray = function(){
    for (let z = 0; z<this._depth; z++){
        this._explored[z] = new Array(this._width);
        for (let x = 0; x<this._width; x++){
            this._explored[z][x] = new Array(this._height);
            for (let y = 0; y<this._height; y++){
                this._explored[z][x][y] = false;
            }
        }
    }
}

Game.Map.prototype.setExplored = function(x, y, z, state) {
    // Only update if the tile is within bounds
    if (this.getTile(x, y, z) !== Game.Tile.nullTile) {
        this._explored[z][x][y] = state;
    }
};

Game.Map.prototype.isExplored = function(x, y, z) {
    // Only return the value if within bounds
    if (this.getTile(x, y, z) !== Game.Tile.nullTile) {
        return this._explored[z][x][y];
    } else {
        return false;
    }
};

Game.Map.prototype.getFov = function(depth){
    return this._fov[depth];
}

Game.Map.prototype.isEmptyFloor = function(x, y, z) {
    // Check if the tile is floor and also has no entity
    return this.getTile(x, y, z) == Game.Tile.floorTile &&
           !this.getEntityAt(x, y, z);
}

Game.Map.prototype.getRandomFloorPosition = function(z) {
    // Randomly generate a tile which is a floor
    var x, y;
    do {
        x = Math.floor(Math.random() * this._width);
        y = Math.floor(Math.random() * this._height);
    } while(!this.isEmptyFloor(x, y, z));
    return {x: x, y: y, z: z};
}



Game.Map.prototype.addEntity = function(entity) {
    // Update the entity's map
    entity.setMap(this);
    // Add the entity to the list of entities
    this.updateEntityPosition(entity);
    // Check if this entity is an actor, and if so add
    // them to the scheduler
    if (entity.hasMixin('Actor')) {
       this._scheduler.add(entity, true);
    }
    if (entity.hasMixin(Game.Mixins.PlayerActor)) {
        this._player = entity;
    }
}



Game.Map.prototype.addEntityAtRandomPosition = function(entity, z) {
    var position = this.getRandomFloorPosition(z);
    entity.setX(position.x);
    entity.setY(position.y);
    entity.setZ(position.z);
    this.addEntity(entity);
}


Game.Map.prototype.getEngine = function() {
    return this._engine;
}
Game.Map.prototype.getEntities = function() {
    return this._entities;
}


Game.Map.prototype.getEntityAt = function(x, y, z){
    return this._entities[x+','+y+','+z];
}

Game.Map.prototype.getItemsAt = function(x, y, z) {
    return this._items[x + ',' + y + ',' + z];
};

Game.Map.prototype.setItemsAt = function(x, y, z, items) {
    // If our items array is empty, then delete the key from the table.
    var key = x + ',' + y + ',' + z;
    if (items.length === 0) {
        if (this._items[key]) {
            delete this._items[key];
        }
    } else {
        // Simply update the items at that key
        this._items[key] = items;
    }
};

Game.Map.prototype.addItem = function(x, y, z, item) {
    // If we already have items at that position, simply append the item to the 
    // list of items.
    var key = x + ',' + y + ',' + z;
    if (this._items[key]) {
        this._items[key].push(item);
    } else {
        this._items[key] = [item];
    }
};

Game.Map.prototype.addItemAtRandomPosition = function(item, z) {
    var position = this.getRandomFloorPosition(z);
    this.addItem(position.x, position.y, position.z, item);
};


Game.Map.prototype.getEntitiesWithinRadius = function(centerX, centerY,
                                                      centerZ, radius) {
    results = [];
    // Determine our bounds
    var leftX = centerX - radius;
    var rightX = centerX + radius;
    var topY = centerY - radius;
    var bottomY = centerY + radius;
    // Iterate through our entities, adding any which are within the bounds
    for (let key in this._entities) {
        let entity = this._entities[key];
        if (entity.getX() >= leftX &&
            entity.getX() <= rightX && 
            entity.getY() >= topY &&
            entity.getY() <= bottomY &&
            entity.getZ() == centerZ) {
            results.push(entity);
        }
    }
    return results;
};

Game.Map.prototype.updateEntityPosition = function(entity, oldX, oldY, oldZ){
    if (typeof oldX === 'number'){
        let oldKey = oldX+','+oldY+','+oldZ;
        if (this._entities[oldKey]==entity){
            delete this._entities[oldKey];
        }
    }

    if (entity.getX() < 0 || entity.getX() >= this._width ||
        entity.getY() < 0 || entity.getY() >= this._height ||
        entity.getZ() < 0 || entity.getZ() >= this._depth){
        throw new Error("Entity's position is out of bounds");
    }
    let key = entity.getX() + ',' + entity.getY() + ',' + entity.getZ();
    if (this._entities[key]){
        throw new Error('Tried to add an entity at an occupied position');
    }
    this._entities[key] = entity;
}


Game.Map.prototype.getTile = function(x, y, z) {
    // Make sure we are inside the bounds. If we aren't, return
    // null tile.
    if (x < 0 || x >= this._width || y < 0 || y >= this._height ||
        z < 0 || z >= this._depth) {
        return Game.Tile.nullTile;
    } else {
        return this._tiles[z][x][y] || Game.Tile.nullTile;
    }
};
