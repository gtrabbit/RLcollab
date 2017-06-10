Game.Items.Selector = {
	buildItem: function(rare, spread){
		let item = this.pickTemplate();
		console.log(item);
// 		let type;
// 		item.constructor === "Weapon" ? type = "WeaponPrefix" : type = "ArmorPrefix";
// 		let prefixes = this.rarityBasedPick(rare, spread, type);



// let weapon1 = new Helmet(Game.Items.Equipment.Helmets.Cap)


// //then make that item into equipment, attaching prefixes as extras
// let item = new Equipment(weapon1, extras);

// //then make that equipment into an item
// let item1 = new Game.Item(item);

// //then log the result so you can check it
// console.log(item1);



	},

	pickTemplate: function(){
		let selection = this.pickRandomKey(Game.Items.Equipment)
		for (let i = 0; i < 3; i++){
			selection = this.pickRandomKey(selection)
		}
		return selection
	},

	pickRandomKey: function(parentObject){
		return Object.keys(parentObject)[Math.floor(Object.keys(parentObject).length * Math.random())]
	},

	pickRandomPrefixOfType: function(option){
		let selected = thingy[option]
		for (let i = 0; i < 2; i++){
			selected = selected[Object.keys(selected)[Math.floor(Math.random() * Object.keys(selected).length)]]
			}
		return selected
	},


	rarityBasedPick: function(rare, spread, type){
		let selections = {};
		let options = Object.keys(Game.Items[type])
		totalRarity = [];
		while (rare < 100 && options.length){

			let number = Math.floor( Math.random() * options.length )
			let option = options[number]
			let pick = pickRandomPrefixOfType(option)

			if (pick.rarity > rare - spread && pick.rarity < rare + spread){
				options.splice(number, 1);
				selections[option] = pick;
				rare +=  ( ( 100 / options.length )- (pick.rarity ))
				totalRarity.push( pick.rarity)
			} else {
				rare += 5;
			}
		}
		return selections
	},







}