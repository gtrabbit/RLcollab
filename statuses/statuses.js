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
		strength: -1 - (multi || 1)
		};
	this.duration = 5 * (multi || 1);

//etc. etc. might want a 'penetration' value to use to calculate against saving throws

}

Game.StatusEffects.weakness = function(multi){
	this.name = 'weakness';
	this.value = {strength: -3 - (multi || 0)};
	this.duration = 10 + (multi || 1);
}



//this function is used to generate a status and apply it to a target

Game.StatusEffects.makeStatus = function(status, multi, target){
	target.addStatus( new Game.StatusEffects (new Game.StatusEffects[status](multi)));
}