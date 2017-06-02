

//set values inside this object to test your function

const stats = {
	
	statName1: 0,
	statName2: 0,
	statName3: 0,
	statName4: 0,
	statName5: 0,
	statName6: 0,
	statName7: 0

// add or remove as many statNames as you like, obviously giving them new names...

}


const Entity = function(stats){

this.onTick = ()=>{

this._statuses.forEach((a, i) => {
if (a.hasOwnProperty('duration')){
	a.duration--;
if (a.duration < 1){
this._statuses.splice(i, 1);
}

}


})


}

this.vitality = 12;
this.strength = 7;

this._statuses = [];
this._skills = [];

	this.addStatus = function(status){

//will be able to calculate saving throws here
		this._statuses.push(status);
}
	
		



this.getModifiers = function(char){
let total = 0;

this._statuses.forEach((a)=>{
if (a.value.hasOwnProperty(char)){
total += a.value[char]
}


})


return total;

}

this.getHPRegen = function(){

let base = this.vitality / 4;
base += this.getModifiers('HPRegen');
return base;
}

this.getStrength = function(){

let base = this.strength;
base += this.getModifiers('strength');
return base;
}



}

let player = new Entity(stats);




const Game = {};

Game.StatusEffects = function(status){

	for (let key in status){
		this[key] = status[key]
}

	this.thing = "monkey business"

}



//a sample status effect..


Game.StatusEffects.poison = function(multi){
this.name = 'poison';
this.value = {HPRegen: -2 - (multi || 0),
		strength: -1 - (multi || 1)};
this.duration = 5 * (multi || 1);

//etc. etc. might want a 'penetration' value to use to calculate against saving throws

}

Game.StatusEffects.weakness = function(multi){
this.name = 'weakness';
this.value = {strength: -3 - (multi || 0)};
this.duration = 10 + (multi || 1);


}


const makeStatus = function(status, multi, target){
target.addStatus( new Game.StatusEffects (new Game.StatusEffects[status](multi)));


}



let poison3 = makeStatus('poison', 3, player);
let poison5 = makeStatus('poison', 5, player);
let weakness7 = makeStatus('weakness', 7, player)





console.log(player);



