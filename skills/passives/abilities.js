Game.Abilities = {};

Game.Abilities.Ability = class Ability{
	constructor(points, name){
			this.name = name;
			this.totalPoints = points;
			this.maxLevel = 10;
			this.progression = Game.Abilities.levelProgression(this.maxLevel);
			this.level = this.getLevel(this.totalPoints)
			this.level === -1 ? this.level = "Master" : {}
			this.toNext = Math.abs(this.totalPoints - this.progression[this.level])
		}
		getLevel(points){
			return this.progression.findIndex(points => points > this.totalPoints )

		}
}



Game.Abilities["Combat Mastery"] = class CombatMastery extends Game.Abilities['Ability']{

		constructor(points, name){
			super(points, name);
			if (this.level !== "Master"){
				this.DoubleSwing = this.level;
				this.MeleeCriticalDamageBonus = Math.round(this.level * 0.6);
				this.MeleeCritical = Math.round(this.level * 0.6);
				this.MeleeDamageModifier = Math.round(this.level * 1.3);
				this.AccuracyBonus = 2 * this.level;
			} else { //static bonuses for Mastery
				this.DoubleSwing = 15;
				this.MeleeCriticalDamageBonus = 12;
				this.MeleeCritical = 12;
				this.MeleeDamageModifier = 12;
				this.AccuracyBonus = 25;
			}
			

		}
	}





Game.Abilities.levelProgression = function(maxLevel){
	let seq = [0, 0];

	for (let i=1; i<maxLevel; i++){
		let cur = seq[i] + i
		seq.push(cur);
	}

	let result = seq.slice(1);
	return result
}



