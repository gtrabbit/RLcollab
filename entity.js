Game.Entity = function(properties) {
    properties = properties || {};
    // Call the glyph's construtor with our set of properties
     this._stats = {};
     if (!properties.stats){
    properties.stats = {
        strength: 5,
        vitality: 5,
        willpower: 5,
        dexterity: 5,
        perception: 5,
        intelligence: 5,
        arcana: 5,
        charisma: 5,
        luck: 5
    }
   }
    for (let key in properties.stats){
            this._stats[key] = properties.stats[key] || 5;
        }


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
    this._regenDelay = properties['regenDelay'] || 5;
    this._tickCount = 0;
    this._skills = [];
    this._abilities = properties['abilities'] || {};
    this._hpPerLevel = properties['hpPerLevel'] || 5;
   

//===== this code will have to be replaced later ====>>>>>>

    if (properties.hasOwnProperty('baseSkills')){
         properties['baseSkills'].forEach((a)=>{
       this._skills.push(
             new Game.Skill(a[0], this, a[1])
            ) 
    })
    }
    if (properties.hasOwnProperty('classSkills')){
        properties['classSkills'].forEach((a)=>{
            this._skills.push(
                new Game.Skill(a[0], this, a[1])
                )
        })
    }
 //=================================........-=-=-=-=-  

  
   
}
// Make entities inherit all the functionality from glyphs
Game.Entity.extend(Game.DynamicGlyph);


//==========getters for base stats============>>>>

Game.Entity.prototype.getStrength = function(){
    let base = this._stats.strength;
    base += this.getModifiers('strength');
    return base;
}
Game.Entity.prototype.getWillpower = function(){
    let base = this._stats.willpower;
    base += this.getModifiers('willpower');
    return base;
}
Game.Entity.prototype.getDexterity = function(){
    let base = this._stats.dexterity;
    base += this.getModifiers('dexterity');
    return base;
}
Game.Entity.prototype.getVitality = function(){
    let base = this._stats.vitality;
    base += this.getModifiers('vitality');
    
    return base;
}
Game.Entity.prototype.getIntelligence = function(){
    let base = this._stats.intelligence;
    base += this.getModifiers('intelligence');
    return base;
}
Game.Entity.prototype.getLuck = function(){
    let base = this._stats.luck;
    base += this.getModifiers('luck');
    return base;
}
Game.Entity.prototype.getArcana = function(){
    let base = this._stats.arcana;
    base += this.getModifiers('arcana');
    return base;
}
Game.Entity.prototype.getPerception = function(){
    let base = this._stats.perception;
    base += this.getModifiers('perception');
    return base;
}
//==============getter functions for functional stats ============>>>>>>

	Game.Entity.prototype.getMeleeDamageModifier = function(){
		let base = Math.round( ( (this.getStrength() *1.4) / 2) - 6);
        base += this.getModifiers('MeleeDamageModifier');
        return base;
		}
		
	Game.Entity.prototype.getRangedDamageModifier = function(){
	   let base = Math.round( ( (this.getDexterity() *1.3) / 2) - 4);
		
	   base += this.getModifiers('RangedDamageModifier');
        return base
}
	Game.Entity.prototype.getDualWield = function(){
		let base = Math.round( ( (this.getDexterity() *2) / 2.6) + (this.getLuck() *1.5) / 2);
		
	   base += this.getModifiers('DualWield');
        return base
}

	Game.Entity.prototype.getDoubleSwing = function(){
		let base = Math.round( ( ( (this.getStrength() *2) / 3) + (this.getLuck() * 1.3) / 3) + (this.getDexterity() * 1.5) /2);
		
		base += this.getModifiers('DoubleSwing');
		 return base
}

	Game.Entity.prototype.getParry = function(){
		let base = Math.ceil( ( (this.getPerception() * 2.5) / 2) + (this.getDexterity() * 2) / 2);
		
		base += this.getModifiers('Parry');
		 return base
}

	Game.Entity.prototype.getSpellPenetration = function(){
		let base = Math.ceil( ( + (this.getIntelligence() *3) + (this.getLuck() *2) *.30) + (this.getPerception() *1.25) );
		
	   base += this.getModifiers('SpellPenetration');
        return base
}
	Game.Entity.prototype.getAccuracyBonus = function(){
	   let base = Math.ceil( ( (this.getDexterity() *5.2) + 10) + (this.getPerception() *3.2) );
		
	   base += this.getModifiers('AccuracyBonus');
        return base
}
			
	Game.Entity.prototype.getSpellDamage = function(){
	   let base = Math.round( ( ( ( (this.getIntelligence() *1.10) / 2 ) -4 ) + (this.getArcana() * 1.4) / 2) - 6 )
		
	   base += this.getModifiers('SpellDamage');
        return base
}
		
	Game.Entity.prototype.getThrowStat = function(){
	   let base = this.getDexterity() *2;
		
	   base += this.getModifiers('ThrowStat');
        return base
}
		
	Game.Entity.prototype.getMeleeCritical = function(){
	   let base = Math.round( ( ( ( (this.getDexterity() *2) / 2.8) - 3) + (this.getLuck() *1.5) / 2) -1);
		
	   base += this.getModifiers('MeleeCritical');
        return base
}
		
	Game.Entity.prototype.getMeleeCriticalDamageBonus = function(){
	   let base = Math.ceil( ( (this.getStrength() *1.5) / 2 ) );
		
	   base += this.getModifiers('MeleeCriticalDamageBonus');
        return base
}
		
	Game.Entity.prototype.getSpellCritical = function(){
	   let base = Math.round( ( ( ( ( ( (this.getIntelligence() *1.2) / 2 ) -3 ) + (this.getArcana() *1.2) / 2 ) - 3 )+ (this.getLuck() *1.05) / 2 ) - 2);
		
	   base += this.getModifiers('SpellCritical');
        return base
}
		
	Game.Entity.prototype.getRegenBonus = function(){
	   let base = Math.ceil( (this.getVitality() *2) * 0.10 );
		
	   base += this.getModifiers('RegenBonus');
        return base
}
		
	Game.Entity.prototype.getMagicRegenBonus = function(){
	   let base = Math.ceil( ( (this.getArcana() *2) * 0.20 ) + (this.getIntelligence() *2) * 0.10);
		
	   base += this.getModifiers('MagicRegenBonus');
        return base
}
		
	Game.Entity.prototype.getResistPhysical = function(){
	   let base = Math.ceil( ( (this.getVitality() *2) * 0.50 ) + (this.getStrength() *2) * 0.30);
		
	   base += this.getModifiers('ResistPhysical');
        return base
}

	Game.Entity.prototype.getFlatCrit = function(){
		let base = 0
		base += this.getModifiers('FlatCrit');
		 return base
}

Game.Entity.prototype.getFlatEvade = function(){
		let base = 0
		base += this.getModifiers('FlatEvade');
		 return base
}

Game.Entity.prototype.getDoubleSwing = function(){
	   let base = 0
	   
	   base += this.getModifiers('DoubleSwing');
	    return base
}

	Game.Entity.prototype.getMaxWeight = function(){
	   let base = Math.round(this.getStrength() * 4)
		
	   base += this.getModifiers('MaxWeight');
        return base
}
		
	Game.Entity.prototype.getHpBonus = function(){
	   let base = Math.ceil( ( (this.getVitality() *2.7) / 3 ) + (this.getStrength() *1.6) / 3 );
		
	   base += this.getModifiers('HpBonus');
    return base
}
		
	Game.Entity.prototype.getMpBonus = function(){
	   let base = Math.ceil( (this.getIntelligence() *2.8) / 3 );
		
	   base += this.getModifiers('MpBonus');
        return base
}

	Game.Entity.prototype.getMpRegen = function(){
	   let base = Math.ceil( (this.getArcana() *2.8) / 3 );
		
	   base += this.getModifiers('MpRegen');
        return base
}

	Game.Entity.prototype.getMagicSlayer = function(){
	   let base = 0
		
	   base += this.getModifiers('MagicSlayer');
        return base
}
		
	Game.Entity.prototype.getEvasion = function(){
	   let base = Math.ceil( ( ( ( (this.getDexterity() *14) /2 ) ) + (this.getLuck() *6) /2 ) );
		
	   base += this.getModifiers('Evasion');
	   return base
}
		
Game.Entity.prototype.getBlock = function(){
	let base = Math.ceil( ( ( ( (this.getStrength() *2.2) / 2) - 7) + (this.getVitality() *1.4) / 2) -5);
	
	base += this.getModifiers('Block');
    return base
}

Game.Entity.prototype.getMagicalResist = function(){
    let base = Math.ceil( ( (this.getWillpower() *3) + (this.getIntelligence() *2) *.40) + (this.getLuck() *2) *.40);

    base += this.getModifiers('MagicalResist');
    return base
}

Game.Entity.prototype.getSpeed = function() {
    let base = this._speed;
    base += this.getModifiers('speed');
    return base;
};

Game.Entity.prototype.getStamina = function(){
    return this._stamina;
}

Game.Entity.prototype.getMaxStamina = function(){
    return this._maxStamina;
}


//================ For Skills / Abilities ================= >>>>

Game.Entity.prototype.getAbilities = function(){
    return this._abilities;
}

Game.Entity.prototype.getSkills = function(){
    return this._skills;
}

//================Modify/Set Vitals ======================>>>>
Game.Entity.prototype.modifyStamina = function(amount){
    this._stamina += amount;
}

Game.Entity.prototype.setSpeed = function(speed) {
    this._speed = speed;
};

//=====================Helpers ==========================>>>



Game.Entity.prototype.getModifiers = function(char){
    let total = 0;
    if (this._statuses.length){
       total += this.getStatusModifiers(char); 
    }
    total += this.getEquipmentBonuses(char);
    total += this.checkPassives(char);
    if (char === "DoubleSwing"){
        console.log(total);
    }
    return total;

};

Game.Entity.prototype.getEquipmentBonuses = function(char){
    let total = 0;
    for (let slot in this._equipment){
        if (this._equipment[slot]){
            if (this._equipment[slot].bonuses.hasOwnProperty(char)){
                total += Number(this._equipment[slot].bonuses[char]);
            }
        }
    }

    return total;
}

Game.Entity.prototype.getStatusModifiers = function(char){
    let total = 0;
    if(this._statuses.length){
        this._statuses.forEach((a)=>{
            if (a.value.hasOwnProperty(char)){
                total += a.value[char]
                }
            })
        
    }
  return total;
}

Game.Entity.prototype.checkPassives = function(char){
    let total = 0;
    if (this.hasOwnProperty('_passives')){
        for (let key in this._passives){
            if (this._passives[key].ability.hasOwnProperty(char)){
                total += this._passives[key].ability[char];
            }
            
        }
    }
    return total;
}


//=====================Status Stuff=========>

Game.Entity.prototype.addStatus = function(status){

//will be able to calculate saving throws here
    this._statuses.push(status);
}
  




//======================Other Basic Stuff=========>>>>>>>>>

Game.Entity.prototype.onTick = function(){

    this._tickCount++;
    if (this._tickCount % this._regenDelay === 0){
        this.regen();
    }
    if (this.hasMixin('FoodConsumer') && this._tickCount % 5 === 0){
        this.addTurnHunger();
    }
    
    if (this._statuses.length){
    this._statuses.forEach((a, i) => {
        if (a.hasOwnProperty('duration')){
            a.duration--;
            if (a.duration < 1){
                this._statuses.splice(i, 1);
        }
        }
    })
    }
    if (this._tickCount > 100){
        this._tickCount = 0;
    }

    if (this.hasOwnProperty('_skills') && this._skills.length){
     
        this._skills.forEach(function(a){
        if (a.inCoolDown){
            a.coolDown();
        }
    })
    }
    

}


Game.Entity.prototype.regen = function(){
    if (this._stamina < this.getMaxStamina()){
        this.modifyStamina(this._staminaRegenRate);
    }
    if (this.hasMixin('Destructible') && this._hp < this.getMaxHP()){
        this.modifyHP(this.getRegenBonus());
    }
    if (this.hasMixin('Caster') && this._mp < this.getMaxMP()){
        this.modifyMP(this.getMpRegen());
    }
       
       
}

//========================Movement==============>>>>>>


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
                console.log("swithing maps!")
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


//==================== Life and Death ==========>>>

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






//--========================Map Based Stuff =============>>>>

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

Game.Entity.prototype.getPosition = function(){
    return [this._x, this._y, this._z];
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

