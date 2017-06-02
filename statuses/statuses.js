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
		regenBonus: -2 - (multi || 0),
		strength: *.90 - (multi || 0),
		};
	this.duration = 5 * (multi || 1);

//etc. etc. might want a 'penetration' value to use to calculate against saving throws

}

Game.StatusEffects.weakness = function(multi){
	this.name = 'weakness';
	this.value = {strength: *.30 - (multi || 0)
	};
	this.duration = 6 + (multi || 1);
}

Game.StatusEffects.blindness = function(multi){
	this.name = 'blindness';
	this.value = {sightRadius: -3 - (multi || 1),
		perception: *.30),
		dexterity: *.50),
	};
	this.duration = 7 + (multi || 1);
}

Game.StatusEffects.daze = function(multi){
	this.name = 'daze';
	this.value = {strength: *.80 - (multi || 0),
		perception: *.70),
		speed: *.60),
	};
	this.duration = 4 + (multi || 1);
}

Game.StatusEffects.bless = function(multi){
	this.name = 'bless';
	this.value = {strength: *1.30 - (multi || 0),
		dexterity: *1.30),
		vitality: *1.40),
	};
	this.duration = 9 + (multi || 1);
}

Game.StatusEffects.haste = function(multi){
	this.name = 'haste';
	this.value = {speed: *1.60 - (multi || 0)
	};
	this.duration = 6 + (multi || 1);
}

Game.StatusEffects.chilled = function(multi){
	this.name = 'chilled';
	this.value = {speed: *.80 - (multi || 0)
		strength: *.80
	};
	this.duration = 5 + (multi || 1);
}

Game.StatusEffects.slow = function(multi){
	this.name = 'slow';
	this.value = {speed: *1.60 - (multi || 0)
	};
	this.duration = 5 + (multi || 1);
}


//this function is used to generate a status and apply it to a target

Game.StatusEffects.makeStatus = function(status, multi, target){
	target.addStatus( new Game.StatusEffects (new Game.StatusEffects[status](multi)));
}