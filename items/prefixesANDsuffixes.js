


//===================MATERIAL===========>>>>



Game.Items.WeaponPrefix.Material.Silver = {
	prefix: "silver",
	baseStatBonus: 3, //is applied to attack for weapons, defense for armor
	rarity: 18,
	weight: 2, //multiplies by this amount
	modifies: {  //everything in here multiplied by multi (from quality) and then added to template base
	MeleeCriticalDamageBonus: 4,
	MagicSlayer: 3
	//if you do a secondary stat, format the name exactly as it appears after the "get" on its function, so, in this case, capitalize the first word as well, like in this example
}
}

Game.Items.ArmorPrefix.Material.Silver = {
	prefix: "silver",
	baseStatBonus: 3, //is applied to attack for weapons, defense for armor
	rarity: 18,
	weight: 2, //multiplies by this amount
	modifies: {  //everything in here multiplied by multi (from quality) and then added to template base
	MagicalResist: 16
	//if you do a secondary stat, format the name exactly as it appears after the "get" on its function, so, in this case, capitalize the first word as well, like in this example
}
}

Game.Items.WeaponPrefix.Material.Iron = {
	prefix: "iron",
	baseStatBonus: 1,
	rarity: 40,
	weight: 2.2,
	modifies: {
	MeleeCriticalDamageBonus: 2,
	
}
}

Game.Items.ArmorPrefix.Material.Iron = {
	prefix: "iron",
	baseStatBonus: 1,
	rarity: 40,
	weight: 2.2,
	modifies: {
	ResistPhysical: 10
	
}
}

Game.Items.WeaponPrefix.Material.Steel = {
	prefix: "steel",
	baseStatBonus: 3,
	rarity: 18,
	weight: 1.5,
	modifies: {
	MeleeCriticalDamageBonus: 4,
		
}
}

Game.Items.ArmorPrefix.Material.Steel = {
	prefix: "steel",
	baseStatBonus: 3,
	rarity: 18,
	weight: 1.5,
	modifies: {
		
}
}

Game.Items.WeaponPrefix.Material.Elven = {
	prefix: "elven",
	baseStatBonus: 2,
	rarity: 5,
	weight: 0.6,
	modifies: {
	MeleeCriticalDamageBonus: 2,
	DoubleSwing: 5,
}
}

Game.Items.ArmorPrefix.Material.Elven = {
	prefix: "elven",
	baseStatBonus: 2,
	rarity: 5,
	weight: 0.6,
	modifies: {
	speed: 100,
}
}


//=========================QUALITY===========>>>>>>

Game.Items.ArmorPrefix.Quality.Good = {
	prefix: "good",
	rarity: 60,
	multi: 1.5, //all relevant attributes multiplied by this number
			//these three are the only relevant values for this prefix type
}

Game.Items.WeaponPrefix.Quality.Good = {
	prefix: "good",
	rarity: 60,
	multi: 1.5, //all relevant attributes multiplied by this number
			//these three are the only relevant values for this prefix type
}

Game.Items.ArmorPrefix.Quality.Formidable = {
	prefix: "formidable",
	rarity: 45,
	multi: 1.75,
	
}

Game.Items.WeaponPrefix.Quality.Formidable = {
	prefix: "formidable",
	rarity: 45,
	multi: 1.75,
	
}

Game.Items.ArmorPrefix.Quality.Cheap = {
	prefix: "cheap",
	multi: 0.4,
	rarity: 70, 

}

Game.Items.WeaponPrefix.Quality.Cheap = {
	prefix: "cheap",
	multi: 0.4,
	rarity: 70, 

}

Game.Items.ArmorPrefix.Quality.Shoddy = {
	prefix: "shoddy",
	multi: 0.7,
	rarity: 70,

}

Game.Items.WeaponPrefix.Quality.Shoddy = {
	prefix: "shoddy",
	multi: 0.7,
	rarity: 70,

}

Game.Items.ArmorPrefix.Quality.Exquisite = {
	prefix: "exquisite",
	multi: 3,
	rarity: 20,

}

Game.Items.WeaponPrefix.Quality.Exquisite = {
	prefix: "exquisite",
	multi: 3,
	rarity: 20,

}

Game.Items.ArmorPrefix.Quality.Masterwork = {
	prefix: "masterwork",
	multi: 3.5,
	rarity: 10,

}

Game.Items.WeaponPrefix.Quality.Masterwork = {
	prefix: "masterwork",
	multi: 3.5,
	rarity: 10,

}

Game.Items.ArmorPrefix.Quality.Glorious = {
	prefix: "glorious",
	multi: 2.5,
	rarity: 30,

}

Game.Items.WeaponPrefix.Quality.Glorious = {
	prefix: "glorious",
	multi: 2.5,
	rarity: 30,

}

Game.Items.ArmorPrefix.Quality.Miraculous = {
	prefix: "miraculous",
	multi: 4,
	rarity: 5,
	
}

Game.Items.WeaponPrefix.Quality.Miraculous = {
	prefix: "miraculous",
	multi: 4,
	rarity: 5,
	
}

Game.Items.ArmorPrefix.Quality.Godlike = {
	prefix: "godlike",
	multi: 5,
	rarity: 1,
	
}

Game.Items.WeaponPrefix.Quality.Godlike = {
	prefix: "godlike",
	multi: 5,
	rarity: 1,
	
}



//====================== CLASSY ===============>>>



Game.Items.WeaponPrefix.Classy.Squire = {
	prefix: "squire's", //notice that these do not need to line up with how it's declared above
	modifies: {
		vitality: 2,
		strength: 3,
		AccuracyBonus: 20,
	},
	rarity: 25,
}

Game.Items.ArmorPrefix.Classy.Squire = {
	prefix: "squire's", //notice that these do not need to line up with how it's declared above
	modifies: {
		vitality: 2,
		strength: 3,
		DefenseValue: 2,
	},
	rarity: 25,
}

Game.Items.WeaponPrefix.Classy.Thief = {
	prefix: "theif's", 
	modifies: {
		dexterity: 3,
		MeleeCritical: 2,
	},
	rarity: 25,
}

Game.Items.ArmorPrefix.Classy.Thief = {
	prefix: "theif's", 
	modifies: {
		dexterity: 3,
		Evasion: 15,
	},
	rarity: 25,
}

Game.Items.WeaponPrefix.Classy.Mage = {
	prefix: "mage's", 
	modifies: {
		intelligence: 3,
		SpellCritical: 3,
	},
	rarity: 25,
}

Game.Items.ArmorPrefix.Classy.Mage = {
	prefix: "mage's", 
	modifies: {
		intelligence: 2,
		arcana: 4,
	},
	rarity: 25,
}

Game.Items.WeaponPrefix.Classy.Illusionist = {
	prefix: "illusionist's",  
	modifies: {
		arcana: 6,
		Evasion: 25,
		MagicResist: 15
	},
	rarity: 12,
}

Game.Items.ArmorPrefix.Classy.Illusionist = {
	prefix: "illusionist's",  
	modifies: {
		arcana: 6,
		Evasion: 25,
		MagicResist: 15
	},
	rarity: 12,
}


Game.Items.WeaponPrefix.Classy.Ninja = {
	prefix: "ninja's",
	modifies: {
		perception: 4,
		DoubleSwing: 8,
		ThrowStat: 10,
	},
	rarity: 15,
}

Game.Items.ArmorPrefix.Classy.Ninja = {
	prefix: "ninja's",
	modifies: {
		speed: 100,
		perception: 4,
		dexterity: 4,
		ThrowStat: 10,
	},
	rarity: 15,
}

//========================ADJECTIVE ==============>>>

Game.Items.WeaponPrefix.Adjective.Sharp = {
	prefix: "sharp",
	rarity: 15,
	modifies: {
		MeleeCritical: 3, 
	}
}

Game.Items.WeaponPrefix.Adjective.Deadly = {
	prefix: "deadly",
	rarity: 8,
	modifies: {
		MeleeCritical: 5, 
	}
}

Game.Items.WeaponPrefix.Adjective.Furious = {
	prefix: "furious",
	rarity: 15,
	modifies: {
		DoubleSwing: 10,
		strength: 3
	}
}

Game.Items.ArmorPrefix.Adjective.Vigorous = {
	prefix: "vigorous",
	rarity: 12,
	modifies: {
		HpBonus: 10,
		vitality: 2,
		RegenBonus: 1,
	}
}

Game.Items.ArmorPrefix.Adjective.Spiked = {
	prefix: "spiked",
	attackValue: 4,
	defenseValue: 3,
	rarity: 12,
}