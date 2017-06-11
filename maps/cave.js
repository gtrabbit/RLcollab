Game.Map.Cave = function(tiles, player) {
    // Call the Map constructor
    Game.Map.call(this, tiles);
    let spread = 8;
    // Add the player
    this.addEntityAtRandomPosition(player, 0);
    // Add random entities and items to each floor.
    for (var z = 0; z < this._depth; z++) {
      
        for (var i = 0; i < (5*(z+1))+12; i++) {
            var entity = Game.EntityRepository.createRandom();
            // Add a random entity
            this.addEntityAtRandomPosition(entity, z);
        
            // Level up the entity based on the floor
            if (entity.hasMixin('ExperienceGainer')) {
                for (var level = 0; level < z*2; level++) {
                    entity.giveExperience(entity.getNextLevelExperience() -
                        entity.getExperience());
                }
            }
        }
        // 15 items per floor
       for (let z = 0; z < this._depth; z++){
            
            for (i = 0; i < 5; i++){

                let item = Game.Items.Selector.buildItem((100-(z*15)), spread*i);
                console.log(item);
                this.addItemAtRandomPosition(item, z); 
            }
            
       }


    }
    // Add weapons and armor to the map in random positions and floors
    // Add a hole to the final cavern on the last level.
    var holePosition = this.getRandomFloorPosition(this._depth - 1);
    this._tiles[this._depth - 1][holePosition.x][holePosition.y] = 
        Game.Tile.holeToCavernTile;

     
};
Game.Map.Cave.extend(Game.Map);