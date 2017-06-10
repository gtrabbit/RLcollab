Game.Items.EquippableListeners = {
        'details': function() {
            var results = [];
            if (this._wieldable) {
                results.push({key: 'attack', value: this.getAttackValue()});
            }
            if (this._wearable) {
                results.push({key: 'defense', value: this.getDefenseValue()});
            }
            return results;
        }
    }

class Equipment {
	constructor(template, extras){
		this.multi = 1;
		this.bonuses = {};
		this.prefix = [];
		this.listeners = Game.Items.EquippableListeners;
		if (template.hasOwnProperty('mixins') && template.mixins.length){
			while(template.mixins.length){
				this.mixins.push(template.mixins.pop())
			}
			delete template.mixins;

		}

		for (let key in template){
			this[key] = template[key] || 0;		
		}

		extras.adjective ? this.build(extras.adjective) : {};
		extras.classy ? this.build(extras.classy) : {};
		extras.quality ? this.make(extras.quality) : {};
		extras.material ? this.forge(extras.material) : {};
		
		
		this.makeName();
		
		} 

	forge(material){
		this.prefix.push(material.prefix);
		this.weight *= material.weight;
		this[this.baseStat] = Math.round( this[this.baseStat] * (material.baseStatBonus * this.multi) )
		for (let key in material.modifies){
			this.bonuses.hasOwnProperty(key) ? this.bonuses[key] += Math.round(material.modifies[key] * this.multi) : this.bonuses[key] = Math.round(material.modifies[key] * this.multi );
		}

	} 

	make(quality){
		this.prefix.push(quality.prefix);
		this.multi = quality.multi;
	} 

	build(classy){
		this.prefix.push(classy.prefix);
		delete classy.prefix;
		this.defenseValue += classy.defenseValue || 0;
		delete classy.defenseValue;
		this.attackValue += classy.attackValue || 0;
		delete classy.attackValue;
		for (let key in classy.modifies){
			this.bonuses.hasOwnProperty(key) ? this.bonuses[key] += Math.round(classy.modifies[key] * this.multi) : this.bonuses[key] = Math.round(classy.modifies[key] * this.multi );
		}
		delete classy.modifies;
		for (let key in classy){
			this.hasOwnProperty(key) ? this[key] += Math.round(classy[key] * this.multi) : this[key] = Math.round(classy[key] * this.multi );
		}

	}

	makeName(){
		this.name = this.prefix.join(" ") + " " + this.name;
	} 

	getAttackValue(){
		return this.attackValue === 0 ? 0 :
		Math.round(this.attackValue + (Math.random() * this.variance) - (Math.random() * this.variance))
	}

	getDefenseValue(){
		return Math.round(this.defenseValue + (Math.random() * this.variance) - (Math.random() * this.variance))
	}

}



//basically, you can copy these exactly as they are for each equipment type you create. 

class Weapon {
	constructor(template){
		this.baseStat = 'attackValue';
		this.EQSlot = 'weapon';
		for (let key in template){
			this[key] = template[key] || 0;		
		}
	}
}

class Helmet {
	constructor(template){
		this.baseStat = 'defenseValue';
		this.EQSlot = 'helmet';
		for (let key in template){
			this[key] = template[key] || 0;		
		}
	}
}

class Boots {
	constructor(template){
		this.baseStat = 'defenseValue';
		this.EQSlot = 'boots';
		for (let key in template){
			this[key] = template[key] || 0;		
		}
	}
}

class Bracers {
	constructor(template){
		this.baseStat = 'defenseValue';
		this.EQSlot = 'bracers';
		for (let key in template){
			this[key] = template[key] || 0;
			
			}
		}
}		
//and so on, for however many EQ slots you want.




//define what prefixes you want
let extras = {
material: Game.Items.Prefix.Material.Silver,
quality: Game.Items.Prefix.Quality.Good,
classy: Game.Items.Prefix.Classy.Thief,
adjective: Game.Items.Prefix.Adjective.Sharp

}

//first make a weapon using the weapon template as an argument
let weapon1 = new Bracers(Game.Items.Equipment.Bracers.Bracers)


//then make that item into equipment, attaching prefixes as extras
let item = new Equipment(weapon1, extras);

//then make that equipment into an item
let item1 = new Game.Item(item);

//then log the result so you can check it
console.log(item1);
