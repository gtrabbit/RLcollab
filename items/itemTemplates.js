
//if you make another template here, you need to define the namespace in item.js. see notes there



//====================Weapons ===========>>

//daggers
Game.Items.Equipment.Weapons.Daggers = {
	dagger: {
	character: ")",
	foreground: 'grey',
	attackValue: 5,
	name: 'dagger',
	weight: 4,
	variance: 1,
	bonuses: {   //possible to modify secondary stats here as well. Could do primary, but that would be weird if the standard sword raised your strength. But I am thinking that daggers might be easier to swing, so could have them give higher doubleswing chance, etc. for any other items and so on
		DoubleSwing: 17,
		MeleeCritical: 3
	}
	
	
}
},

//swords
Game.Items.Equipment.Weapons.Sword = {
	shortsword: {
	character: ")",
	foreground: 'white',
	attackValue: 8,
	name: 'short sword',
	weight: 4,
	variance: 3,
	bonuses: {   //possible to modify secondary stats here as well. Could do primary, but that would be weird if the standard sword raised your strength. But I am thinking that daggers might be easier to swing, so could have them give higher doubleswing chance, etc. for any other items and so on
		DoubleSwing: 8,
		MeleeCritical: 1
	}
},



	longsword: {
	character: ")",
	foreground: 'white',
	attackValue: 12,
	name: 'long sword',
	weight: 9,
	variance: 5,
	
	
	
},
}

//staves
Game.Items.Equipment.Weapons.Staves = {
	yewstaff: {
	character: ")",
	foreground: 'blue',
	attackValue: 6,
	name: 'yew staff',
	weight: 6,
	variance: 3,
	bonuses: {   //possible to modify secondary stats here as well. Could do primary, but that would be weird if the standard sword raised your strength. But I am thinking that daggers might be easier to swing, so could have them give higher doubleswing chance, etc. for any other items and so on
		Arcana: 2
	}
},
}

//axes
Game.Items.Equipment.Weapons.Axes = {
	handaxe: {
	character: ")",
	foreground: 'brown',
	attackValue: 4,
	name: 'hand axe',
	weight: 5,
	variance: 4,
	bonuses: {
		MeleeCriticalDamageBonus: 2,
		MeleeCritical: 1
		}
},

	broadaxe: {
	character: ")",
	foreground: 'brown',
	attackValue: 9,
	name: 'broad axe',
	weight: 4,
	variance: 8,
	bonuses: {   //possible to modify secondary stats here as well. Could do primary, but that would be weird if the standard sword raised your strength. But I am thinking that daggers might be easier to swing, so could have them give higher doubleswing chance, etc. for any other items and so on
		MeleeCriticalDamageBonus: 4,
		MeleeCritical: 2
		}
},
	
	
}

//================ Armor========>>
Game.Items.Equipment.Armor.Body = {
	crude: {
	character: "#",
	foreground: 'turquoise',
	defenseValue: 1,
	name: "crude armor",
	weight: 2
},
	
	light: {
	character: "#",
	foreground: 'turquoise',
	defenseValue: 3,
	name: "light armor",
	weight: 5
},


	chainmail: {
	character: "#",
	foreground: 'turquoise',
	defenseValue: 7,
	name: "chainmail",
	weight: 16,
	bonuses: {
	speed: -200,
	DoubleSwing: -8
	}
},

	platemail: {
	character: "#",
	foreground: 'turquoise',
	defenseValue: 14,
	name: "platemail",
	weight: 38,
	bonuses: {
	speed: -400,
	DoubleSwing: -25
	}
}
},

//================ Helmets =========>>

Game.Items.Equipment.Armor.Helmets = {
	cap: {
	character: "^",
	defenseValue: 2,
	name: "cap",
	weight: 7
}
},

//================ Bracers =========>>

Game.Items.Equipment.Armor.Bracers = {
	bracer: {
	character: "8",
	defenseValue: 1,
	name: "bracer",
	weight: 3
},
	
	gauntlets: {
	character: "8",
	defenseValue: 3,
	name: "gauntlets",
	weight: 5
}
},

//================ Boots========>>
Game.Items.Equipment.Armor.Boots = {
	boots: {
	character: ",",
	foreground: 'brown',
	defenseValue: 1,
	name: "boots",
	weight: 2
}
},

//================ Rings=====>>
Game.Items.Equipment.Armor.Rings = {
	ring: {
	character: ".",
	foreground: 'gold',
	defenseValue: 0,
	name: "ring",
	weight: 0
}
},

//================ Amulets=====>>
Game.Items.Equipment.Armor.Amulets = {
	amulet: {
	character: ".",
	foreground: 'pink',
	defenseValue: 1,
	name: "amulet",
	weight: 0
}
},
//=========== Capes ========>>

Game.Items.Equipment.Armor.Capes = {
	cape: {
	character: "[",
	defenseValue: 0,
	name: "cape",
	weight: 1,
	bonuses: {
	Evasion: 10
	}
}
}