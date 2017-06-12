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

