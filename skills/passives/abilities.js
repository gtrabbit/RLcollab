

Game.Passives = {
	"Combat Mastery": class CombatMastery {
		constructor(level){
			this.name = "Combat Mastery";
			this.level = level;
			this.DoubleSwing = 3 * level;
			this.MeleeCriticalDamageBonus = 2 * level;
			this.MeleeCritical = 2 * level;
			this.MeleeDamageModifier = 5 * level;
			this.AccuracyBonus = 5 * level;

		}
	}

}