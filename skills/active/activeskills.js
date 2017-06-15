Game.Skills = {};


Game.Skills.Run = {
	name: 'Run',
	coolDownDuration: 10,
	costs: {
		Stamina: 20
	},
	activateMsg: "You begin running",
	args: ["level", "actor"],
	activate: function(args){
		let level = this[args[0]];
		let actor = this[args[1]];
		Game.StatusEffects.makeStatus('haste', level, actor);
		
	}
}


Game.Skills.WhirlwindAttack = {
	name: 'Whirlwind Attack',
	coolDownDuration: 20,
	costs: {
		Stamina: 40
	},
	activateMsg: "You perform a whirlwind attack",
	args: ["level", "actor"],
	relStats: {},
	activate: function(args){
		let level = this[args[0]];
		let actor = this[args[1]];
		let targets = this.getTargets(actor);
		targets.forEach(a=>{
			if (a.hasMixin('Destructible')){
				let damage = Math.ceil((actor.getMeleeDamageModifier() + actor.getWeaponAttackValue(true, true) * level) / 2)
				let msg = "whirlwind attack";
				a.takeDamage(actor, damage, msg);
			}
		})
	},
	getTargets: function(actor){
		return actor.getMap().getEntitiesInVisibleRadius(actor.getPosition(), 1, true)
	}
}


Game.Skills.Bash = {
	name: 'Bash',
	coolDownDuration: 15,
	costs: {
		Stamina: 20
	},
	activateMsg: "You attempt to bash your target"
} //incomplete

Game.Skills.Regenerate = {
	name: 'Regenerate',
	coolDownDuration: 25,
	costs: {
		Stamina: 20,
	},
	activateMsg: "You begin healing faster",
	args: ["level", "actor"],
	activate: function(args){
		let level = this[args[0]];
		let actor = this[args[1]];
		Game.StatusEffects.makeStatus('regen', level, actor);
	}
}

Game.Skills.FlameBurst = {
	name: "Flame Burst",
	coolDownDuration: 20,
	costs: {
		Stamina: 5
	},
	activateMsg: "You send out a wave of flames",
	args: ["level", "actor"],
	activate: function(args){
		let actor = this[args[1]];
		let targets = this.getTargets(actor);
		let level = this[args[0]];
		targets.forEach((a)=>{
			if (a.hasMixin('Destructible')){
				let damage = 20;
				let msg = "wall of flame"
				a.takeDamage(actor, 20, msg)
			}
		})
	},
	getTargets: function(actor){
		return actor.getMap().getEntitiesInVisibleRadius(actor.getPosition(), 7, true);
	}
}