Game.Skills = {};
Game.Skills.Templates = {};

//==========Self-Targeting=========>>>>>>>



Game.Skills.Templates.Run = {
	name: 'Run',
	coolDownDuration: 10,
	costs: {
		Stamina: 20
	},
	activateMsg: "You begin running",
	activate: function(){
		this.extractCosts();
		Game.StatusEffects.makeStatus('haste', this.level, this.actor);	
	}
}

Game.Skills.Templates.Regenerate = {
	name: 'Regenerate',
	coolDownDuration: 25,
	costs: {
		Stamina: 20,
	},
	activateMsg: "You begin healing faster",
	activate: function(){
		this.extractCosts();
		Game.StatusEffects.makeStatus('regen', this.level, this.actor);
	}
}

Game.Skills.Templates.Bless = {
	name: 'Bless',
	coolDownDuration: 25,
	costs: {
		Stamina: 20,
	},
	activateMsg: "You are blessed",
	activate: function(){
		this.extractCosts();
		Game.StatusEffects.makeStatus('bless', this.level, this.actor);
	}
}



//===========AoEAroundCaster==========>>>>>>>

Game.Skills.Templates.WhirlwindAttack = {
	name: 'Whirlwind Attack',
	coolDownDuration: 20,
	costs: {
		Stamina: 40
	},
	activateMsg: "You perform a whirlwind attack",
	targetingType: 'AoEAroundCaster',
	determineTargetingProps: function(actor, level){
		return {
			radius: 1,
			excludeCenter: true
		}
	},
	activate: function(){
		this.extractCosts();
		let targets = this.getTargets(this.actor, this.targetingProps);
		targets.forEach(a=>{
			if (a.hasMixin('Destructible')){
				let damage = Math.ceil(((this.actor.getMeleeDamageModifier() + this.actor.getWeaponAttackValue(true, true)) * this.level) / 2)
				let msg = "whirlwind attack";
				a.takeDamage(this.actor, damage, msg);
			}
		})
	}
	
}


Game.Skills.Templates.FlameBurst = {
	name: "Flame Burst",
	coolDownDuration: 20,
	costs: {
		Stamina: 5
	},
	activateMsg: "You send out a wave of flames",
	targetingType: 'AoEAroundCaster',
	determineTargetingProps: function(actor, level){
		let radius = 3 + level
		return {
			radius: radius,
			excludeCenter: true
		}
	},
	activate: function(){
		this.extractCosts();
		let targets = this.getTargets(this.actor, this.targetingProps);
		targets.forEach((a)=>{
			if (a.hasMixin('Destructible')){
				let damage = 20;
				let msg = "wall of flame"
				a.takeDamage(this.actor, damage, msg)
			}
		})
	}
}

Game.Skills.Templates.CorruptionWave = {
	name: "Wave of Corruption",
	coolDownDuration: -1,
	costs: {
		MP: 10
	},
	activateMsg: "you conjure a wave of corruption",
	targetingType: 'AoEAroundCaster',
	determineTargetingProps: function(actor, level){
		let radius = 1 + level + Math.round(actor.getArcana() / 5)
		return {
			radius: radius,
			excludeCenter: true
		}
	},
	activate: function(){
		this.extractCosts();
		let targets = this.getTargets(this.actor, this.targetingProps);
		let msg = "wave of corruption";
		let damage = (this.level + Math.round(this.actor.getArcana() / 5)) * 2;
		targets.forEach((a)=>{
			if (a.hasMixin('Destructible')){
				a.takeDamage(this.actor, damage, msg)
				Game.StatusEffects.makeStatus('blindness', this.level, a)
				Game.StatusEffects.makeStatus('weakness', this.level, a)
			}
		})
	}
}







//===========Single-Target=========>>>>>>>



Game.Skills.Templates.Bash = {
	name: 'Bash',
	coolDownDuration: 15,
	costs: {
		Stamina: 25
	},
	activateMsg: "You attempt to bash your target",
	targetingType: 'singleTarget',
	determineTargetingProps: function(actor, level){
		return {
			maxRange: 1,
			allowSelfTarget: false,
			canTargetGround: false
		}
	},
	activate: function(){
        let callback = (target)=>{
			Game.sendMessage(this.actor, this.activateMsg)
			let msg = "bash"
			target.getOccupant().takeDamage(this.actor, damage, msg)
			this.extractCosts();		
		}
		let damage = (this.level + 1) * 5;
		this.getTargets(this.actor, this.targetingProps, callback);
	}
}



