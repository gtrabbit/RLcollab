//basic constructor for status effects

Game.StatusEffects = function(status){

	for (let key in status){
		this[key] = status[key]
	}

}



//individual status effect constructors (can be scaled using the "multi" argument)


Game.StatusEffects.poison = function(multi){
	this.name = 'poison';
	let perc = ROT.RNG.getPercentage()       
        if (((this.getSpellPenetration()) + perc()) > this.getMagicResist()){
            return true;
        } else {
	this.value = {
		regenBonus: -2 - (multi || 0),
		strength: -2 - (multi || 0),
		};
	this.duration = 5 * (multi || 1);

//etc. etc. might want a 'penetration' value to use to calculate against saving throws

}

Game.StatusEffects.weakness = function(multi){
	this.name = 'weakness';
	let perc = ROT.RNG.getPercentage()       
        if (((this.getSpellPenetration()) + perc()) > this.getMagicResist()){
            return true;
        } else {
	this.value = {strength: -4 - (multi || 0),
	};
	this.duration = 6 + (multi || 0);
}

Game.StatusEffects.blindness = function(multi){
	this.name = 'blindness';
	let perc = ROT.RNG.getPercentage()       
        if (((this.getSpellPenetration()) + perc()) > this.getMagicResist()){
            return true;
        } else {
	this.value = {sightRadius: -3 - (multi || 1),
		perception: -2 - (multi || 0),
		dexterity: -1 - (multi || 0),
	};
	this.duration = 5 + (multi || 0);
}

Game.StatusEffects.daze = function(multi){
	this.name = 'daze';
	let perc = ROT.RNG.getPercentage()       
        if (((this.getSpellPenetration()) + perc()) > this.getResistPhysical()){
            return true;
        } else {
	this.value = {strength: -2 - (multi || 0),
		perception: -2 - (multi || 0),
		speed: -400 - (multi || 0),
	};
	this.duration = 4 + (multi || 0);
}

Game.StatusEffects.bless = function(multi){
	this.name = 'bless';
	this.value = {strength: +3 + (multi || 0),
		dexterity: + 3 + (multi || 0),
		vitality: + 4 + (multi || 0),
	};
	this.duration = 6 + (multi || 0);
}

Game.StatusEffects.haste = function(multi){
	this.name = 'haste';
	this.value = {speed: +500 + (multi || 0),
	};
	this.duration = 6 + (multi || 0);
}

Game.StatusEffects.chilled = function(multi){
	this.name = 'chilled';
	let perc = ROT.RNG.getPercentage()       
        if (((this.getSpellPenetration()) + perc()) > this.getMagicResist()){
            return true;
        } else {
	this.value = {speed: -350 - (multi || 0),
		strength: -2 - (multi || 0),
	};
	this.duration = 5 + (multi || 0);
}

Game.StatusEffects.slow = function(multi){
	this.name = 'slow';
	let perc = ROT.RNG.getPercentage()       
        if (((this.getSpellPenetration()) + perc()) > this.getMagicResist()){
            return true;
        } else {
	this.value = {speed: -500 - (multi || 0),
	};
	this.duration = 5 + (multi || 0);
}

Game.StatusEffects.enrage = function(multi){
	this.name = 'enrage';
	this.value = {speed: +500 + (multi || 0),
		strength: +5 + (multi || 0),
		dexterity: +5 + (multi || 0),
	};
	this.duration = 7 + (multi || 0);
}

//this function is used to generate a status and apply it to a target

Game.StatusEffects.makeStatus = function(status, multi, target){
	target.addStatus( new Game.StatusEffects (new Game.StatusEffects[status](multi)));
}

});