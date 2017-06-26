Game.Abilities = {};

Game.Abilities.Ability = class Ability{
	constructor(points, name, affinity, maxLevel){
			this.name = name;
			this.totalPoints = points;
			this.maxLevel = maxLevel || 10;
			this.affinity = affinity
			this.progression = Game.Abilities.levelProgression(this.maxLevel, this.affinity);
			this.level = this.getLevel(this.totalPoints)
			this.level === -1 ? this.level = "Master" : {}
			this.toNext = Math.abs(this.totalPoints - this.progression[this.level])
		}
		getLevel(points){
			return this.progression.findIndex(points => points > this.totalPoints )

		}
}



Game.Abilities["Combat Mastery"] = class CombatMastery extends Game.Abilities['Ability']{

		constructor(points, name, affinity){
			super(points, name, affinity);
			if (this.level !== "Master"){
				this.DoubleSwing = Math.round(this.level * 0.5);
				this.MeleeCriticalDamageBonus = Math.round(this.level * 0.6);
				this.MeleeCritical = Math.round(this.level * 0.6);
				this.MeleeDamageModifier = Math.round(this.level * 0.2);
				this.AccuracyBonus = this.level;
			} else { //static bonuses for Mastery
				this.DoubleSwing = 6;
				this.MeleeCriticalDamageBonus = 12;
				this.MeleeCritical = 7;
				this.MeleeDamageModifier = 5;
				this.AccuracyBonus = 12;
			}
			

		}
	}
	
	Game.Abilities["Combat Brutality"] = class CombatBrutality extends Game.Abilities['Ability']{

		constructor(points, name, affinity){
			super(points, name, affinity);
			if (this.level !== "Master"){
				this.CleavingBonus = this.level;
				this.MeleeCriticalDamageBonus = Math.round(this.level * 0.6);
				this.MeleeDamageModifier = Math.round(this.level * 0.3);
				this.MaimBonus = Math.round(this.level * 1.2);
			} else { //static bonuses for Mastery
				this.CleavingBonus = 15;
				this.MeleeCriticalDamageBonus = 10;
				this.MeleeDamageModifier = 8;
				this.MaimBonus = 14;
			}
			

		}
	}
	
	Game.Abilities["Assassination"] = class Assassination extends Game.Abilities['Ability']{

		constructor(points, name, affinity){
			super(points, name, affinity);
			if (this.level !== "Master"){
				this.MeleeCritical = Math.round(this.level * 0.5);
				this.MeleeCriticalDamageBonus = Math.round(this.level * 0.6);
				this.StabBonus = this.level;
				this.Disembowel = this.level;
				this.StealthBonus = this.level;
			} else { //static bonuses for Mastery
				this.MeleeCritical = 6;
				this.MeleeCriticalDamageBonus = 10;
				this.StabBonus= 14;
				this.Disembowel = 11;
				this.StealthBonus = 11;
			}
			

		}
	}
	
		Game.Abilities["Mysticism"] = class Mysticism extends Game.Abilities['Ability']{

		constructor(points, name, affinity){
			super(points, name, affinity);
			if (this.level !== "Master"){
				this.SpellPenetration = (this.level * 7);
				this.SpellCritical = this.level;
				this.SpellDamage = this.level; 
			} else { //static bonuses for Mastery
				this.SpellPenetration = 80;
				this.SpellCritical = this.level;
				this.SpellDamage = this.level;
			}
		}
	}
	
	Game.Abilities["Tenacity"] = class Tenacity extends Game.Abilities['Ability']{

		constructor(points, name, affinity){
			super(points, name, affinity, 15);
			if (this.level !== "Master"){
				this.ResistPhysical = Math.round(this.level * 1.3);
				this.HpPerLevel = Math.round(this.level * 1.4);
				this.DefenseValue = Math.round(this.level * 2);
				this.RegenBonus = this.level;
			} else { //static bonuses for Mastery
				this.ResistPhysical = 25;
				this.HpPerLevel = 25;
				this.DefenseValue = 35;
				this.RegenBonus = 18;
			}
			

		}
	}
	
	Game.Abilities["Shield Mastery"] = class ShieldMastery extends Game.Abilities['Ability']{

		constructor(points, name, affinity){
			super(points, name, affinity);
			if (this.level !== "Master"){
				this.BlockValue = Math.round(this.level * 2);
				this.BlockChance = this.level;
			} else { //static bonuses for Mastery
				this.BlockValue = 25;
				this.BlockChance = 12;
			

		}
	}
}
	
		Game.Abilities["Guardian Combat"] = class GuardianCombat extends Game.Abilities['Ability']{

		constructor(points, name, affinity){
			super(points, name, affinity);
			if (this.level !== "Master"){
				this.ShieldBash = Math.round(this.level *1.5);
				this.BashBonus = this.level;
			} else { //static bonuses for Mastery
				this.ShieldBash = 20;
				this.BashBonus = 15;
			

		}
	}
}
	
	Game.Abilities["Readiness"] = class Readiness extends Game.Abilities['Ability']{

		constructor(points, name, affinity){
			super(points, name, affinity);
			if (this.level !== "Master"){
				this.Evasion = Math.round(this.level * 3.8);
				this.DefenseValue = Math.round(this.level * 2);
				this.AccuracyBonus = 3.5 * this.level;
			} else { //static bonuses for Mastery
				this.Evasion = 60;
				this.DefenseValue = 18;
				this.AccuracyBonus = 60;
			}
			

		}
	}

	Game.Abilities["Sword"] = class Sword extends Game.Abilities['Ability']{

		constructor(points, name, affinity){
			super(points, name, affinity);
			if (this.level !== "Master"){
				this.ParryBonus = this.level;
				this.DoubleSwing = this.level;
				this.AccuracyBonus = 3 * this.level;

			} else { //static bonuses for Mastery
				this.ParryBonus = 15;
				this.DoubleSwing = 12;
				this.AccuracyBonus = 50;
			}
			

		}
	}
	
	Game.Abilities["Bow"] = class Bow extends Game.Abilities['Ability']{

		constructor(points, name, affinity){
			super(points, name, affinity);
			if (this.level !== "Master"){
				this.PiercingBonus = this.level;
				this.DoubleSwing = this.level;
				this.AccuracyBonus = 3 * this.level;

			} else { //static bonuses for Mastery
				this.PiercingBonus = 15;
				this.DoubleSwing = 12;
				this.AccuracyBonus = 50;
			}
			

		}
	}
	
	Game.Abilities["Axe"] = class Axe extends Game.Abilities['Ability']{

		constructor(points, name, affinity){
			super(points, name, affinity);
			if (this.level !== "Master"){
				this.CleavingBonus = this.level;
				this.DoubleSwing = this.level;
				this.AccuracyBonus = 3 * this.level;

			} else { //static bonuses for Mastery
				this.CleavingBonus = 15;
				this.DoubleSwing = 12;
				this.AccuracyBonus = 50;
			}
			

		}
	}
	
		Game.Abilities["Mace"] = class Mace extends Game.Abilities['Ability']{

		constructor(points, name, affinity){
			super(points, name, affinity);
			if (this.level !== "Master"){
				this.BashBonus = this.level;
				this.DoubleSwing = this.level;
				this.AccuracyBonus = 3 * this.level;

			} else { //static bonuses for Mastery
				this.BashBonus = 15;
				this.DoubleSwing = 12;
				this.AccuracyBonus = 50;
			}
			

		}
	}
	
	Game.Abilities["Dagger"] = class Dagger extends Game.Abilities['Ability']{

		constructor(points, name, affinity){
			super(points, name, affinity);
			if (this.level !== "Master"){
				this.StabBonus = this.level;
				this.DoubleSwing = this.level;
				this.AccuracyBonus = 3 * this.level;
				this.CriticalDamageBonus = this.level;

			} else { //static bonuses for Mastery
				this.StabBonus = 15;
				this.DoubleSwing = 12;
				this.AccuracyBonus = 50;
				this.CriticalDamageBonus = 11;
			}
			

		}
	}
	
	Game.Abilities["Ambidexterity"] = class Ambidexterity extends Game.Abilities['Ability']{

		constructor(points, name, affinity){
			super(points, name, affinity);
			if (this.level !== "Master"){
				this.DualWield = this.level;
				this.DoubleSwing = this.level;


			} else { //static bonuses for Mastery
				this.DualWield = 15;
				this.DoubleSwing = 12;
			}
			

		}
	}
	
	Game.Abilities["Meditation"] = class Meditation extends Game.Abilities['Ability']{

		constructor(points, name, affinity){
			super(points, name, affinity);
			if (this.level !== "Master"){
				this.MpRegen = Math.round(this.level * 0.3);
				this.MagicalResist = Math.round(this.level * 2.6);
				this.MpBonus = 2 * this.level;


			} else { //static bonuses for Mastery
				this.MpRegen = 6;
				this.MagicalResist = 55;
				this.MpBonus = 24;

			}
			

		}
	}
	

	
	





Game.Abilities.levelProgression = function(maxLevel, affinity){
	let seq = [Math.round(0+affinity), Math.round(0+affinity+affinity)];

	for (let i=1; i<maxLevel; i++){
		let cur = Math.round(seq[i] + i + (i * affinity))
		seq.push(cur);
	}

	let result = seq.slice(1);
	return result
}



