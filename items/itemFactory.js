Game.ItemFactory = {};

Game.ItemFactory.EquippableListeners = {
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

Game.ItemFactory.Classes = {

Equipment: class Equipment {
	constructor(template, extras){
		//console.log("inside equipment constructor ", template)
		this.multi = 1;
		this.bonuses = {};
		this.prefix = [];
		this.listeners = Game.ItemFactory.EquippableListeners;
		if (template.hasOwnProperty('mixins') && template.mixins.length){
			while(template.mixins.length){
				this.mixins.push(template.mixins.pop())
			}
			delete template.mixins;

		}

		for (let key in template){
			this[key] = template[key] || 0;		
		}

		extras.Quality ? this.make(extras.Quality) : {};
		extras.Adjective ? this.build(extras.Adjective) : {};
		extras.Classy ? this.build(extras.Classy) : {};
		extras.Material ? this.forge(extras.Material) : {};
		
		
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
		let initial = this.prefix.join(" ") + " " + this.name
		this.name = initial.trim();
	} 

	getAttackValue(){
		return this.attackValue === 0 ? 0 :
		Math.round(this.attackValue + (Math.random() * this.variance) - (Math.random() * this.variance))
	}

	getDefenseValue(){
		return Math.round(this.defenseValue + (Math.random() * this.variance) - (Math.random() * this.variance))
	}

},

Weapons: class Weapon {
	constructor(template){
		this.baseStat = 'attackValue';
		this.EQSlot = ['mainHand', "offhand"];
		for (let key in template){
			this[key] = template[key] || 0;		
		}
	}
},

Helmets: class Helmet {
	constructor(template){
		this.baseStat = 'defenseValue';
		this.EQSlot = ['helmet'];
		for (let key in template){
			this[key] = template[key] || 0;		
		}
	}
},

Boots: class Boots {
	constructor(template){
		this.baseStat = 'defenseValue';
		this.EQSlot = ['boots'];
		for (let key in template){
			this[key] = template[key] || 0;		
		}
	}
},

Bracers: class Bracers {
	constructor(template){
		this.baseStat = 'defenseValue';
		this.EQSlot = ['bracers'];
		for (let key in template){
			this[key] = template[key] || 0;
			
			}
		}
},

Body: class Body {
	constructor(template){
		this.baseStat = 'defenseValue';
		this.EQSlot = ['body'];
		for (let key in template){
			this[key] = template[key] || 0;
			
			}
		}
},

Rings: class Rings {
	constructor(template){
		this.baseStat = 'defenseValue';
		this.EQSlot = ["leftRing", "rightRing"];
		for (let key in template){
			this[key] = template[key] || 0;
			
			}
		}
},

Amulets: class Amulets {
	constructor(template){
		this.baseStat = 'defenseValue';
		this.EQSlot = ['amulet'];
		for (let key in template){
			this[key] = template[key] || 0;
			
			}
		}
},

Capes: class Capes {
	constructor(template){
		this.baseStat = 'defenseValue';
		this.EQSlot = ['cape'];
		for (let key in template){
			this[key] = template[key] || 0;
			
			}
		}
}			

}



