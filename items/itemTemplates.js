
//if you make another template here, you need to define the namespace in item.js. see notes there



//====================Weapons ===========>>

Game.Items.Equipment.Weapons.Dagger = {

	dagger: {
		character: ")",
		attackValue: 5,
		name: 'dagger',
		weight: 4,
		variance: 1,
		bonuses: {   
			DoubleSwing: 2
		}
	},
	knife: {
		character: ")",
		attackValue: 3,
		name: 'knife',
		weight: 3,
		variance: 4,
		bonuses: {   
			DoubleSwing: 2.5
		}
	}
	
}


Game.Items.Equipment.Weapons.Axe = {
	attackValue: 12,
	name: 'axe',
	weight: 14,
	variance: 10

}



//================ Helmets =========>>

Game.Items.Equipment.Helmets.Cap = {
	character: "^",
	defenseValue: 2,
	name: "cap",
	weight: 7
}
