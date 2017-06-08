
//if you make another template here, you need to define the namespace in item.js. see notes there



//====================Weapons ===========>>

Game.Items.Equipment.Weapons.Dagger = {

	character: ")",
	attackValue: 5,
	name: 'dagger',
	weight: 4,
	variance: 1,
	bonuses: {   //possible to modify secondary stats here as well. Could do primary, but that would be weird if the standard sword raised your strength. But I am thinking that daggers might be easier to swing, so could have them give higher doubleswing chance, etc. for any other items and so on
		DoubleSwing: 2
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

//================ Bracers =========>>

Game.Items.Equipment.Bracers.Bracers = {
	character: "8",
	defenseValue: 1,
	name: "bracer",
	weight: 3
}

