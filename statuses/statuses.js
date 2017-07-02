//basic constructor for status effects

Game.StatusEffects = function(status){

	for (let key in status){
		this[key] = status[key]
	}

}



//individual status effect constructors (can be scaled using the "multi" argument)


Game.StatusEffects.poison = function(multi){
	this.name = 'poison';
	this.value = {
		RegenBonus: *25 - (multi || 0),
		};
	this.duration = 5 * (multi || 1);
}
//etc. etc. might want a 'penetration' value to use to calculate against saving throws


Game.StatusEffects.weakness = function(multi){
	this.name = 'weakness';
	this.value = {strength: *50 - (multi || 0),
	};
	this.duration = 6 + (multi || 0);
}


Game.StatusEffects.blindness = function(multi){
	this.name = 'blindness';
	this.value = {sightRadius: *10 + (multi || 0),
		AccuracyBonus: *25 (multi || 0),
	};
	this.duration = 5 + (multi || 0);
}

Game.StatusEffects.daze = function(multi){
	this.name = 'daze';
	this.value = {AccuracyBonus: *50 - (multi || 0),
		speed: *50 - (multi || 0),
		
	};
	this.duration = 4 + (multi || 0);
}


Game.StatusEffects.bless = function(multi){
	this.name = 'bless';
	this.value = {strength: *130 + (multi || 0),
		dexterity: *130 + (multi || 0),
		vitality: * 130 + (multi || 0),
		strength:
	};
	this.duration = 6 + (multi || 0);
}

Game.StatusEffects.haste = function(multi){
	this.name = 'haste';
	this.value = {speed: *135 + (multi || 0),
	};
	this.duration = 6 + (multi || 0);
}

Game.StatusEffects.chilled = function(multi){
	this.name = 'chilled';
	this.value = {speed: *70 - (multi || 0),
		strength: *70 - (multi || 0),
	};
	this.duration = 5 + (multi || 0);
}


Game.StatusEffects.slow = function(multi){
	this.name = 'slow';
	this.value = {speed: *50 - (multi || 0),
	};
	this.duration = 5 + (multi || 0);
}

Game.StatusEffects.enrage = function(multi){
	this.name = 'enrage';
	this.value = {speed: *125 + (multi || 0),
		strength: *140 + (multi || 0),
		dexterity: *120 + (multi || 0),
		DefenseValue: *75 (multi || 0),
	};
	this.duration = 7 + (multi || 0);
}

Game.StatusEffects.regen = function(multi){
	this.name = "regen";
	this.value = {
		RegenBonus: *145 + (multi || 0)
	}
	this.duration = 10 + ((multi || 1) * 2 )
}

//this function is used to generate a status and apply it to a target

Game.StatusEffects.makeStatus = function(status, multi, target){
	target.addStatus( new Game.StatusEffects (new Game.StatusEffects[status](multi)));
}

