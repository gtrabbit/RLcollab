Game.Item = function(properties){
	properties = properties || {};
	for (let key in properties){
			this[key] = properties[key] || 0;		
		}
	Game.DynamicGlyph.call(this, properties);

}


Game.Item.extend(Game.DynamicGlyph);


//need to declare namespace here.... the basic setup is already made


Game.Items = {};
Game.Items.Prefix = {};



Game.Items.Prefix.Material = {};
Game.Items.Prefix.Quality = {};
Game.Items.Prefix.Classy = {};
Game.Items.Prefix.Adjective = {};


//for each equipment slot, you will need to define it like so

Game.Items.Equipment = {};
Game.Items.Equipment.Weapons = {};
Game.Items.Equipment.Helmets = {};

//and so on, for shields, armor, boots, etc.
