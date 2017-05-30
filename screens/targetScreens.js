Game.Screen.TargetBasedScreen = function(template) {
    template = template || {};
    // By default, our ok return does nothing and does not consume a turn.
    this._isAcceptableFunction = template['okFunction'] || function(x, y) {
        return false;
    };
    // The defaut caption function simply returns an empty string.
    this._captionFunction = template['captionFunction'] || function(x, y) {
        var z = this._player.getZ();
        var map = this._player.getMap();
        // If the tile is explored, we can give a better capton
        if (map.isExplored(x, y, z)) {
            // If the tile isn't explored, we have to check if we can actually 
            // see it before testing if there's an entity or item.
            if (this._visibleCells[x + ',' + y]) {
                var items = map.getItemsAt(x, y, z);
                // If we have items, we want to render the top most item
                if (items.length) {
                    var item = items[items.length - 1];
                    return String.format('%s - %s (%s)',
                        item.getRepresentation(),
                        item.describeA(true),
                        item.details());
                // Else check if there's an entity
                } else if (map.getEntityAt(x, y, z)) {
                    var entity = map.getEntityAt(x, y, z);
                    return String.format('%s - %s (%s)',
                        entity.getRepresentation(),
                        entity.describeA(true),
                        entity.details());
                }
            }
            // If there was no entity/item or the tile wasn't visible, then use
            // the tile information.
            return String.format('%s - %s',
                map.getTile(x, y, z).getRepresentation(),
                map.getTile(x, y, z).getDescription());

        } else {
            let tile = Game.TileRepository.create('nulltile')  // If the tile is not explored, show the null tile description.
            return String.format('%s - %s',
                tile.getRepresentation(),
                tile.getDescription());
        }
    }
};

Game.Screen.TargetBasedScreen.prototype.setup = function(player, startX, startY, offsetX, offsetY, properties) {
    this._player = player;
    this._properties = properties;
    // Store original position. Subtract the offset to make life easy so we don't
    // always have to remove it.
    this._startX = startX - offsetX;
    this._startY = startY - offsetY;
    // Store current cursor position
    this._cursorX = this._startX;
    this._cursorY = this._startY;
    // Store map offsets
    this._offsetX = offsetX;
    this._offsetY = offsetY;
    // Cache the FOV
    var visibleCells = {};
    this._player.getMap().getFov(this._player.getZ()).compute(
        this._player.getX(), this._player.getY(), 
        this._player.getSightRadius(), 
        function(x, y, radius, visibility) {
            visibleCells[x + "," + y] = true;
        });
    this._visibleCells = visibleCells;
};

Game.Screen.TargetBasedScreen.prototype.render = function(display) {
    Game.Screen.playScreen.renderTiles.call(Game.Screen.playScreen, display);

    // Draw a line from the start to the cursor.
    var points = Game.Geometry.getLine(this._startX, this._startY, this._cursorX,
        this._cursorY);

    // Render stars along the line.
    for (var i = 0, l = points.length; i < l; i++) {
        display.drawText(points[i].x, points[i].y, '%c{magenta}*');
    }

    // Render the caption at the bottom.
    display.drawText(0, Game.getScreenHeight() - 1, 
        this._captionFunction(this._cursorX + this._offsetX, this._cursorY + this._offsetY));
};

Game.Screen.TargetBasedScreen.prototype.handleInput = function(inputType, inputData) {
    // Move the cursor
    if (inputType === 'keydown'){
            switch(inputData.keyCode){
                case ROT.VK_NUMPAD4:
                    this.moveCursor(-1, 0);
                    break;
                case ROT.VK_NUMPAD1:
                    this.moveCursor(-1, 1);
                    break;
                case ROT.VK_NUMPAD7:
                    this.moveCursor(-1, -1);
                    break;
                case ROT.VK_NUMPAD9:
                    this.moveCursor(1, -1);
                    break;
                case ROT.VK_NUMPAD3:
                    this.moveCursor(1, 1);
                    break;
                case ROT.VK_NUMPAD6:
                    this.moveCursor(1, 0);
                    break;
                case ROT.VK_NUMPAD8:
                    this.moveCursor(0, -1);
                    break;
                case ROT.VK_NUMPAD2:
                    this.moveCursor(0, 1);
                    break;
                case ROT.VK_RETURN:
                    this.executeOkFunction();
                    break;
                case ROT.VK_ESCAPE:
                    Game.Screen.playScreen.setSubScreen(undefined);
                    break;
                default:
                    break;
                }
    Game.refresh();
    }
};

Game.Screen.TargetBasedScreen.prototype.moveCursor = function(dx, dy) {
    // Make sure we stay within bounds.
    this._cursorX = Math.max(0, Math.min(this._cursorX + dx, Game.getScreenWidth()));
    // We have to save the last line for the caption.
    this._cursorY = Math.max(0, Math.min(this._cursorY + dy, Game.getScreenHeight() - 1));
};

Game.Screen.TargetBasedScreen.prototype.executeOkFunction = function() {
    // Switch back to the play screen.
    Game.Screen.playScreen.setSubScreen(undefined);
    // Call the OK function and end the player's turn if it return true.
    if (this._isAcceptableFunction(this._cursorX + this._offsetX, this._cursorY + this._offsetY, this._properties)) {
        this._player.getMap().getEngine().unlock();
    }
};





Game.Screen.singleProjectile = new Game.Screen.TargetBasedScreen({
    okFunction: function(x, y){
        console.log(this._properties);
        let target = this._player.getMap().getTile(x, y, this._player.getZ());
            switch(this._properties.actionType){
                case "throw":
                    let projectile = this._properties.projectile;
                    console.log(projectile)
                    this._player.removeItem(this._player._items.indexOf(projectile))
                    target.setLoot(projectile);
                    let targetedEntity = target.getOccupant();
                    if (targetedEntity && target.getOccupant().hasMixin('Destructible')){
                        let damage = projectile._attackValue || 2;
                        damage += Math.floor(this._player._attackValue / 4);
                        targetedEntity.takeDamage(this._player, damage);
                        
                    }
                    break;
            }

            return true;
    



    }

})



Game.Screen.lookScreen = new Game.Screen.TargetBasedScreen({
    captionFunction: function(x, y) {
        var z = this._player.getZ();
        var map = this._player.getMap();
        // If the tile is explored, we can give a better capton
        if (map.isExplored(x, y, z)) {
            // If the tile isn't explored, we have to check if we can actually 
            // see it before testing if there's an entity or item.
            if (this._visibleCells[x + ',' + y]) {
                var items = map.getItemsAt(x, y, z);
                // If we have items, we want to render the top most item
                if (items.length) {
                    var item = items[items.length - 1];
                    return String.format('%s - %s (%s)',
                        item.getRepresentation(),
                        item.describeA(true),
                        item.details());
                // Else check if there's an entity
                } else if (map.getEntityAt(x, y, z)) {
                    var entity = map.getEntityAt(x, y, z);
                    return String.format('%s - %s (%s)',
                        entity.getRepresentation(),
                        entity.describeA(true),
                        entity.details());
                }
            }
            // If there was no entity/item or the tile wasn't visible, then use
            // the tile information.
            return String.format('%s - %s',
                map.getTile(x, y, z).getRepresentation(),
                map.getTile(x, y, z).getDescription());

        } else {
            let tile = Game.TileRepository.create('nulltile')  // If the tile is not explored, show the null tile description.
            return String.format('%s - %s',
                tile.getRepresentation(),
                tile.getDescription());
        }
    }
});