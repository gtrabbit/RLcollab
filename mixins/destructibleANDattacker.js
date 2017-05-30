Game.Mixins.Destructible = {
    name: 'Destructible',
    init: function(template) {
        this._maxHP = template['maxHP'] || 10;
        this._hp = template['hp'] || this._maxHP;
        this._defenseValue = template['defenseValue'] || 0;
   
    },
    takeDamage: function(attacker, damage){
        this._hp -= damage;
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
        return this._maxHP
    },
    setHP: function(hp) {
        this._hp = hp;
    },
    modifyHP: function(amount){
        this._hp += amount;
    },
    increaseDefenseValue: function(value) {
        // If no value was passed, default to 2.
        value = value || 2;
        // Add to the defense value.
        this._defenseValue += value;
        Game.sendMessage(this, "You look tougher!");
    },
    increaseMaxHp: function(value) {
        // If no value was passed, default to 10.
        value = value || 10;
        // Add to both max HP and HP.
        this._maxHP += value;
        this._hp += value;
        Game.sendMessage(this, "You look healthier!");
    },
    getDefenseValue: function() {
        var modifier = 0;
        // If we can equip items, then have to take into 
        // consideration weapon and armor
        if (this.hasMixin(Game.Mixins.Equipper)) {
            if (this.getWeapon()) {
                modifier += this.getWeapon().getDefenseValue();
            }
            if (this.getArmor()) {
                modifier += this.getArmor().getDefenseValue();
            }
        }
        return this._defenseValue + modifier;
    }
}





//===========================Attacker===================>>>>






Game.Mixins.Attacker = {
    name: 'Attacker',
    groupName: 'Attacker',
    listeners: {
        details: function() {
            return [{key: 'attack', value: this.getAttackValue()}];
        }
    },
    init: function(template){
        this._attackValue = template['attackValue'] || 1;

    },
    attack: function(target){
        if (target.hasMixin('Destructible')){
            let attack = this.getAttackValue();
            let defense = target.getDefenseValue();
            let max = Math.max(0, attack - defense);
            let damage = 1+Math.floor(Math.random()*max);
            Game.sendMessage(target, 'The %s strikes you for %d damage!', [this.getName(), damage]);
            target.takeDamage(this, damage);
        }
    },
    throw: function(target, projectile){
        this.removeItem(this._items.indexOf(projectile));
        target.setLoot(projectile);
        let targetedEntity = target.getOccupant();
        if (targetedEntity && target.getOccupant().hasMixin('Destructible')){
            let damage = projectile._attackValue || 2;
            damage += projectile._weight || 2;
            damage += Math.floor((this.getThrowStat() || 1) / 4);
            targetedEntity.takeDamage(this, damage);
                        
        }

    },
    getAttackValue: function() {
        var modifier = 0;
        // If we can equip items, then have to take into 
        // consideration weapon and armor
        if (this.hasMixin(Game.Mixins.Equipper)) {
            if (this.getWeapon()) {
                modifier += this.getWeapon().getAttackValue();
            }
            if (this.getArmor()) {
                modifier += this.getArmor().getAttackValue();
            }
        }
        return this._attackValue + modifier;
    },
    getThrowStat: function(){
        return this._throwStat;
    },
    increaseAttackValue: function(value) {
        // If no value was passed, default to 2.
        value = value || 2;
        // Add to the attack value.
        this._attackValue += value;
        Game.sendMessage(this, "You look stronger!");
    }

}


//==========================Thrower=============>>>

