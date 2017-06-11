Game.Mixins.Destructible = {
    name: 'Destructible',
    init: function(template) {
        this._maxHP = template['maxHP'] || 10;
        this._hp = template['maxHP'] + this.getHpBonus() || 10
        this._defenseValue = template['defenseValue'] || 0;
   
    },
    takeDamage: function(attacker, damage){
        damage = Math.max(damage - this.getDefenseValue(), 0);
        this.modifyHP(-damage);
        Game.sendMessage(this, "The %s strikes you for %d damage!", [attacker.getName(), damage])
        Game.sendMessage(attacker, 'You strike the %s for %d damage!', [this.getName(), damage]);
        if (this._hp <= 0){
            Game.sendMessage(attacker, "You kill the %s!", [this.getName()]);
            this.raiseEvent('onDeath', attacker);
            attacker.raiseEvent('onKill', this)
            this.kill();
            if (this.hasMixin(Game.Mixins.PlayerActor)){
                this.act();
            } else {
                this.getMap().removeEntity(this);
            }
        }
    },
    listeners: {
        onGainLevel: function() {
           
        },
        details: function() {
            return [
                {key: 'defense', value: this.getDefenseValue()},
                {key: 'hp', value: this.getHP()}
            ];
        }
    },
    getHP: function(){
        return this._hp;
    },
    getMaxHP: function(){
        return this._maxHP + this.getHpBonus();
    },
    setHP: function(hp) {
        this._hp = hp;
    },
    modifyHP: function(amount){
        this._hp = Math.min(this._hp + amount, this.getMaxHP())
    },
    getDefenseValue: function() {
        var modifier = 0;
        // If we can equip items, then have to take into 
        // consideration weapon and armor
        if (this.hasMixin(Game.Mixins.Equipper)) {
            let equipment = this.getEquipment();
            for (let key in equipment){
                if (equipment[key] !== null && equipment[key].hasOwnProperty('defenseValue')){
                    modifier += equipment[key].defenseValue;
                }
            }

        }

        return modifier;
    }
}





//===========================Attacker===================>>>>






Game.Mixins.Attacker = {
    name: 'Attacker',
    groupName: 'Attacker',
    listeners: {
        details: function() {
            return [{key: 'attack', value: this.getMeleeDamageModifier()}];
        }
    },
    attack: function(target){
        if (target.hasMixin('Destructible')){
            let attack = 0;
            if (this.checkHit(target)){
                attack += this.getMeleeDamageModifier();
					if (this.checkCrit()){
                        attack += this.getMeleeCriticalDamageBonus();
                        attack *= 1.5;
                    }
                    let max = 1 + Math.max(0, attack);
                    let damage = 1+Math.floor(ROT.RNG.getNormal(max, max/2));
                    // Game.sendMessage(target, 'The %s strikes you for %d damage!', [this.getName(), damage]);
                    target.takeDamage(this, damage);
                   
					}
				if (this.checkDoubleSwing(target)){
				    let attack2 = this.getMeleeDamageModifier();
					if (this.checkCrit()){
                        attack2 += this.getMeleeCriticalDamageBonus();
                        attack2 *= 1.5;
                    }
					let max2 = 1 + Math.max(0, attack2);
                    let damage2 = 1+Math.floor(ROT.RNG.getNormal(max2, max2/2));
                    // Game.sendMessage(target, 'The %s strikes you for %d damage!', [this.getName(), damage]);
                    target.takeDamage(this, damage2);	
					}
              
                
        }

            },
    checkHit(target){
  
        let perc = ROT.RNG.getPercentage()       
        if (((perc + this.getAccuracyBonus()) > target.getEvasion())+target.getFlatEvade()){
            return true;
        } else {
            Game.sendMessage(this, 'Your attack has missed!', [this.getName()]);
            Game.sendMessage(target, 'The %s\'s attack has missed!', [this.getName()]);
            return false;
        }        
    },
    checkCrit(){
		let perc = ROT.RNG.getPercentage()
        if (perc < (this.getFlatCrit() + this.getMeleeCritical())){
            Game.sendMessage(this, "A critical hit!")
            return true;
        } else {
            return false;
        }
        
    },
	checkDoubleSwing(target){
	let perc = ROT.RNG.getPercentage()       
        if (perc < this.getDoubleSwingChance()){
			Game.sendMessage(this, "You swing again!", [this.getName()]);
			Game.sendMessage(target, "The %s goes for another attack!", [this.getName()]);
			return true;
		} else {
			return false;
		}
	
	},
    throw: function(target, projectile){
        this.removeItem(this._items.indexOf(projectile));
        target.setLoot(projectile);
        let targetedEntity = target.getOccupant();
        if (targetedEntity && target.getOccupant().hasMixin('Destructible')){
            if (this.checkHit(targetedEntity)){
                let damage = projectile._attackValue || 2;
                damage += projectile._weight || 2;
                damage += Math.floor((this.getThrowStat() || 1) );
                damage = Math.floor(damage / 3);
                targetedEntity.takeDamage(this, damage);
            } 
            
                        
        }

    },
    getWeaponAttackValue: function() {
        var modifier = 0;
        // If we can equip items, then have to take into 
        // consideration weapon and armor
        if (this.hasMixin(Game.Mixins.Equipper)) {
         
//need code here eventually

        }
        return modifier;
    }
   

}


Game.Mixins.RangedAttacker = {
    name: 'RangedAttacker',
    groupName: 'Attacker',
    listeners: {
        details: function() {
            return [{key: 'attack', value: this.getMeleeDamageModifier()}];
        }
    },
    shoot: function(target){
        if (target.hasMixin('Destructible')){
            if (this.checkHit(target)){
                let attack = this.getRangedDamageModifier();
                attack += this.getWeaponAttackValue();
                let max = 1 + Math.max(0, attack);
                let damage = 1+Math.floor(ROT.RNG.getNormal(max, max/2));
                Game.sendMessage(target, 'The %s strikes you for %d damage!', [this.getName(), damage]);
                target.takeDamage(this, damage);

            }
        }
        

    },
    checkHit(target){
        let point1 = {
            x: this.getX(),
            y: this.getY()
        }
        let point2 = {
            x: target.getX(),
            y: target.getY()
        }
  
        let perc = ROT.RNG.getPercentage()       
        if ((perc + this.getAccuracyBonus()) - Game.Geometry.getDistance(point1, point2)*3 > target.getEvasion()){
            return true;
        } else {
            Game.sendMessage(this, 'your attack has missed!', [this.getName()]);
            Game.sendMessage(target, 'The %s\'s attack has missed!', [this.getName()]);
            return false;
        }        
    },


}