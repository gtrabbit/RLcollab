


//===================MATERIAL===========>>>>



Game.Items.Prefix.Material.Silver = {
	prefix: "silver",
	baseStatBonus: 3, //is applied to attack for weapons, defense for armor
	rarity: 20,
	weight: 2,   //multiplies base by this amount
	modifies: {  //everything in here multiplied by multi (from quality) and then added to template base
		dexterity: 1, 
		DoubleSwing: 2 //if you do a secondary stat, format the name exactly as it appears after the "get" on its function, so, in this case, capitalize the first word as well, like in this example
}
}



//=========================QUALITY===========>>>>>>

Game.Items.Prefix.Quality.Good = {
	prefix: "good",
	rarity: 70,
	multi: 1.5  //all relevant attributes multiplied by this number
			//these three are the only relevant values for this prefix type
}


Game.Items.Prefix.Quality.Cheap = {
	prefix: "cheap",
	multi: 0.4,
	rarity: 100  

}



//====================== CLASSY ===============>>>



Game.Items.Prefix.Classy.Knight = {
	prefix: "knight's",  //notice that these do not need to line up with how it's declared above
	modifies: {
		vitality: 2,
		strength: 3,
		AccuracyBonus: 20
	},
	rarity: 10
}

Game.Items.Prefix.Classy.Thief = {
	prefix: "theif's",  //notice that these do not need to line up with how it's declared above
	modifies: {
		dexterity: 3,
		perception: 2,
		MeleeCritical: 3,
	},
	rarity: 10
}

Game.Items.Prefix.Classy.Mage = {
	prefix: "mage's",  //notice that these do not need to line up with how it's declared above
	modifies: {
		intelligence: 3,
		arcana: 2,
		SpellCritical: 3,
	},
	rarity: 10
}

Game.Items.Prefix.Classy.Ninja = {
	prefix: "ninja's",
	modifies: {
		speed: 150
		perception: 4,
		dexterity: 2,
	},
	rarity: 8
}

//========================ADJECTIVE ==============>>>

Game.Items.Prefix.Adjective.Sharp = {
	prefix: "sharp",
	attackValue: 5,
	rarity: 5,
	weaponOnly: true,
	modifies: {
		MeleeCritical: 5  //if you do a secondary stat, format the name exactly as it appears after the "get" on its function, so, in this case, capitalize the first word as well, like in this example
	}
}

Game.Items.Prefix.Adjective.Spiked = {
	prefix: "spiked",
	attackValue: 4,
	defenseValue: 3,
	rarity: 12,
	armorOnly: true
}