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
    this._maxStamina = properties['maxStamina'] || 100;
    this._stamina = this._maxStamina;
    this._staminaRegenRate = properties['staminaRegenRate'] || 0;
    this._healthRegenRate = properties['healthRegenRate'] || 0;
	this._throwStat = properties['throwStat'] || 5;
    this._regenDelay = properties['regenDelay'] || 5;
    this._tickCount = 0;
   if (!properties.stats){
    properties.stats = {
        strength: 5,
        vitality: 5,
        willpower: 5,
        dexterity: 5,
        intelligence: 5,
        arcana: 5,
        charisma: 5,
        luck: 5
    }
   }
    for (let key in properties.stats){
            this['_'+key] = properties.stats[key] || 5;
        }


   
}
// Make entities inherit all the functionality from glyphs
Game.Entity.extend(Game.DynamicGlyph);


//==============get functions for functional stats ============>>>>>>

	Game.Entity.prototype.getMeleeDamageModifier = function(){
		let base = Math.round( ( (this._strength *1.4) / 2) - 6);
		}
		
	Game.Entity.prototype.getRangedDamageModifier = function(){
	   let base = Math.round( ( (this._dexterity *1.3) / 2) - 4);
		
	   base += this.getModifiers();
        return base
}
		
	Game.Entity.prototype.getAccuracyBonus = function(){
	   let base = Math.round(this._dexterity *1.5);
		
	   base += this.getModifiers();
        return base
}
			
	Game.Entity.prototype.getSpellDamage = function(){
	   let base = Math.round( ( ( ( (this._intelligence *1.10) / 2 ) -4 ) + (this._arcana * 1.4) / 2) - 6 )
		
	   base += this.getModifiers();
        return base
}
		
	Game.Entity.prototype.getThrowStat = function(){
	   let base = this._dexterity *4;
		
	   base += this.getModifiers();
        return base
}
		
	Game.Entity.prototype.getMeleeCritical = function(){
	   let base = Math.round( ( ( ( (this._dexterity *2) / 2.6) - 4) + (this._luck *1.5) / 2) -2);
		
	   base += this.getModifiers();
        return base
}
		
	Game.Entity.prototype.getMeleeCriticalDamageBonus = function(){
	   let base = Math.ceil( ( (this._strength *2.5) / 2 ) -10 );
		
	   base += this.getModifiers();
        return base
}
		
	Game.Entity.prototype.getSpellCritical = function(){
	   let base = Math.round( ( ( ( ( ( (this._intelligence *1.2) / 2 ) -3 ) + (this._arcana *1.2) / 2 ) - 3 )+ (this._luck *1.05) / 2 ) - 2);
		
	   base += this.getModifiers();
        return base
}
		
	Game.Entity.prototype.getRegenBonus = function(){
	   let base = Math.ceil( (this._vitality *2) * 0.10 );
		
	   base += this.getModifiers();
        return base
}
		
	Game.Entity.prototype.getMagicRegenBonus = function(){
	   let base = Math.ceil( ( (this._arcana *2) * 0.20 ) + (this._intelligence *2) * 0.10);
		
	   base += this.getModifiers();
        return base
}
		
	Game.Entity.prototype.getResistPhysical = function(){
	   let base = Math.ceil( ( (this._vitality *2) * 0.50 ) + (this._strength *2) * 0.30);
		
	   base += this.getModifiers();
        return base
}
		
	Game.Entity.prototype.getMaxWeight = function(){
	   let base = Math.round(this._strength * 4)
		
	   base += this.getModifiers();
        return base
}
		
	Game.Entity.prototype.getHpBonus = function(){
	   let base = Math.ceil( ( (this._vitality *2.7) / 3 ) + (this._strength *1.6) / 3 );
		
	   base += this.getModifiers();
    return base
}
		
	Game.Entity.prototype.getMpBonus = function(){
	   let base = Math.ceil( (this._intelligence *2.8) / 3 );
		
	   base += this.getModifiers();
        return base
}
		
	Game.Entity.prototype.getEvasion = function(){
	   let base = Math.ceil( ( (this._dexterity *2.2) / 3) -3);
		
	   base += this.getModifiers();
	   return base
}
		
Game.Entity.prototype.getBlock = function(){
	let base = Math.ceil( ( ( ( (this._strength *2.2) / 2) - 7) + (this._vitality *1.4) / 2) -5);
	
	base += this.getModifiers();
    return base
}

Game.Entity.prototype.getMagicalResist = function(){
    let base = Math.ceil( ( ( (this._willpower *2) * .60 ) + (this._intelligence *2) *.020) + (this._luck *2) *.30);

    base += this.getModifiers();
    return base
}

Game.Entity.prototype.setSpeed = function(speed) {
    this._speed = speed;
};

Game.Entity.prototype.getSpeed = function() {
    return this._speed;
};
Game.Entity.prototype.getStamina = function(){
    return this._stamina;
}
Game.Entity.prototype.modifyStamina = function(amount){
    this._stamina += amount;
}

Game.Entity.prototype.getRegenBonus = function(){
let base = Math.ceil( (this._vitality *2) * 0.10 );

base += this.getModifiers();
    return base
}

Game.Entity.prototype.getMaxStamina = function(){
    return this._maxStamina;
}

//=====================other stuff ==========================>>>




Game.Entity.prototype.getModifiers = function(){
    return 0;
};




Game.Entity.prototype.regen = function(){
    if (this._stamina < this.getMaxStamina()){
        this.modifyStamina(this._staminaRegenRate);
    }
    if (this._hp < this.getMaxHP()){
        this.modifyHP(this.getRegenBonus());
    }
       
       
}

Game.Entity.prototype.tryMove = function(x, y, z, map){
        map = this.getMap();
        let tile = map.getTile(x, y, this.getZ());
        if (!tile){
            return false;
        }
        let target = map.getTile(x, y, this.getZ()).getOccupant();
      
        if (z < this.getZ()){
            if (tile._name != 'stairsUpTile'){
                Game.sendMessage(this, "Climbing upward from here would be impossible");
            } else {
                Game.sendMessage(this, "You climb to level %d", [z+1]);
                this.setPosition(x, y, z);
            }
        } else if (z > this.getZ()){
            if (tile._name === 'holeToCavernTile' &&
                this.hasMixin(Game.Mixins.PlayerActor)) {
            // Switch the entity to a boss cavern!
                this.switchMap(new Game.Map.BossCavern());
            } else if (tile._name != 'stairsDownTile'){
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
            if (items.length){
                if (items.length === 1){
                    Game.sendMessage(this, 'You see %s', [items[0].describeA()])
                } else {
                    Game.sendMessage(this, "There is much loot to be had")
                }
            }
            return true;
        } else if (tile.isDiggable()){
            if (this.hasMixin(Game.Mixins.PlayerActor)){
                if (this._stamina >= 10){
                    map.dig(x,y,z);
                    this.modifyStamina(-10);
                    return true;
                } else {
                    Game.sendMessage(this, "You are too exhausted to dig")
                    return false
                }
              
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
        this._map.getTile(oldX, oldY, oldZ).setOccupant(null);
        this._map.getTile(x, y, z).setOccupant(this)
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

