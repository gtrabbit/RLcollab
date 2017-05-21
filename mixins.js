Game.Mixins = {};

Game.Mixins.Equipper = {
    name: 'Equipper',
    init: function(template) {
        this._weapon = null;
        this._armor = null;
    },
    wield: function(item) {
        this._weapon = item;
    },
    unwield: function() {
        this._weapon = null;
    },
    wear: function(item) {
        this._armor = item;
    },
    takeOff: function() {
        this._armor = null;
    },
    getWeapon: function() {
        return this._weapon;
    },
    getArmor: function() {
        return this._armor;
    },
    unequip: function(item) {
        // Helper function to be called before getting rid of an item.
        if (this._weapon === item) {
            this.unwield();
        }
        if (this._armor === item) {
            this.takeOff();
        }
    }
};

Game.Mixins.FoodConsumer = {
    name: 'FoodConsumer',
    init: function(template) {
        this._maxFullness = template['maxFullness'] || 1000;
        // Start halfway to max fullness if no default value
        this._fullness = template['fullness'] || (this._maxFullness / 2);
        // Number of points to decrease fullness by every turn.
        this._fullnessDepletionRate = template['fullnessDepletionRate'] || 1;
    },
    addTurnHunger: function() {
        // Remove the standard depletion points
        this.modifyFullnessBy(-this._fullnessDepletionRate);
    },
    modifyFullnessBy: function(points) {
        this._fullness = this._fullness + points;
        if (this._fullness <= 0) {
            this.kill("You have died of starvation!");
        } else if (this._fullness > this._maxFullness) {
            this.kill("You choke and die!");
        }
    },
    getHungerState: function() {
        // Fullness points per percent of max fullness
        var perPercent = this._maxFullness / 100;
        // 5% of max fullness or less = starving
        if (this._fullness <= perPercent * 5) {
            return 'Starving';
        // 25% of max fullness or less = hungry
        } else if (this._fullness <= perPercent * 25) {
            return 'Hungry';
        // 95% of max fullness or more = oversatiated
        } else if (this._fullness >= perPercent * 95) {
            return 'Oversatiated';
        // 75% of max fullness or more = full
        } else if (this._fullness >= perPercent * 75) {
            return 'Full';
        // Anything else = not hungry
        } else {
            return 'Not Hungry';
        }
    }
};



Game.Mixins.Destructible = {
    name: 'Destructible',
    init: function(template) {
        this._maxHP = template['maxHP'] || 10;
        this._hp = template['hp'] || this._maxHP;
        this._defenseValue = template['defenseValue'] || 0;
   
    },
    takeDamage: function(attacker, damage){
        this._hp -= damage;
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
            // Heal the entity.
            this.setHP(this.getMaxHP());
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

Game.Mixins.Sight = {
    name: "Sight",
    groupName: 'Sight',
    init: function(template){
        this._sightRadius = template['sightRadius'] || 5;
    },
    getSightRadius: function(){
        return this._sightRadius;
    },
    canSee: function(entity) {
        // If not on the same map or on different floors, then exit early
        if (!entity || this._map !== entity.getMap() || this._z !== entity.getZ()) {
            return false;
        }

        var otherX = entity.getX();
        var otherY = entity.getY();

        // If we're not in a square field of view, then we won't be in a real
        // field of view either.
        if ((otherX - this._x) * (otherX - this._x) +
            (otherY - this._y) * (otherY - this._y) >
            this._sightRadius * this._sightRadius) {
            return false;
        }

        // Compute the FOV and check if the coordinates are in there.
        var found = false;
        this.getMap().getFov(this.getZ()).compute(
            this.getX(), this.getY(), 
            this.getSightRadius(), 
            function(x, y, radius, visibility) {
                if (x === otherX && y === otherY) {
                    found = true;
                }
            });
        return found;
    },
    increaseSightRadius: function(value) {
        // If no value was passed, default to 1.
        value = value || 1;
        // Add to sight radius.
        this._sightRadius += value;
        Game.sendMessage(this, "You are more aware of your surroundings!");
    }
}

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
            Game.sendMessage(this, 'You strike the %s for %d damage!', [target.getName(), damage]);
            Game.sendMessage(target, 'The %s strikes you for %d damage!', [this.getName(), damage]);
            target.takeDamage(this, damage);
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
    increaseAttackValue: function(value) {
        // If no value was passed, default to 2.
        value = value || 2;
        // Add to the attack value.
        this._attackValue += value;
        Game.sendMessage(this, "You look stronger!");
    }

}

Game.Mixins.ExperienceGainer = {
    name: 'ExperienceGainer',
    init: function(template) {
        this._level = template['level'] || 1;
        this._experience = template['experience'] || 0;
        this._statPointsPerLevel = template['statPointsPerLevel'] || 1;
        this._statPoints = 0;
        // Determine what stats can be levelled up.
        this._statOptions = [];
        if (this.hasMixin('Attacker')) {
            this._statOptions.push(['Increase attack value', this.increaseAttackValue]);
        }
        if (this.hasMixin('Destructible')) {
            this._statOptions.push(['Increase defense value', this.increaseDefenseValue]);   
            this._statOptions.push(['Increase max health', this.increaseMaxHp]);
        }
        if (this.hasMixin('Sight')) {
            this._statOptions.push(['Increase sight range', this.increaseSightRadius]);
        }
    },
    listeners: {
        onKill: function(victim) {
            var exp = victim.getMaxHP() + victim.getDefenseValue();
            if (victim.hasMixin('Attacker')) {
                exp += victim.getAttackValue();
            }
            // Account for level differences
            if (victim.hasMixin('ExperienceGainer')) {
                exp -= (this.getLevel() - victim.getLevel()) * 3;
            }
            // Only give experience if more than 0.
            if (exp > 0) {
                this.giveExperience(exp);
            }
        },
        details: function() {
            return [{key: 'level', value: this.getLevel()}];
        }
    },
    getLevel: function() {
        return this._level;
    },
    getExperience: function() {
        return this._experience;
    },
    getNextLevelExperience: function() {
        return (this._level * this._level) * 10;
    },
    getStatPoints: function() {
        return this._statPoints;
    },
    setStatPoints: function(statPoints) {
        this._statPoints = statPoints;
    },
    getStatOptions: function() {
        return this._statOptions;
    },
    giveExperience: function(points) {
        var statPointsGained = 0;
        var levelsGained = 0;
        // Loop until we've allocated all points.
        while (points > 0) {
            // Check if adding in the points will surpass the level threshold.
            if (this._experience + points >= this.getNextLevelExperience()) {
                // Fill our experience till the next threshold.
                var usedPoints = this.getNextLevelExperience() - this._experience;
                points -= usedPoints;
                this._experience += usedPoints;
                // Level up our entity!
                this._level++;
                levelsGained++;
                this._statPoints += this._statPointsPerLevel;
                statPointsGained += this._statPointsPerLevel;
            } else {
                // Simple case - just give the experience.
                this._experience += points;
                points = 0;
            }
        }
        // Check if we gained at least one level.
        if (levelsGained > 0) {
            Game.sendMessage(this, "You advance to level %d.", [this._level]);
            this.raiseEvent('onGainLevel');  
        }
    }
};

Game.Mixins.CorpseDropper = {
    name: 'CorpseDropper',
    init: function(template) {
        // Chance of dropping a cropse (out of 100).
        this._corpseDropRate = template['corpseDropRate'] || 100;
    },
    listeners: {
        onDeath: function(attacker) {
            // Check if we should drop a corpse.
            if (Math.round(Math.random() * 100) <= this._corpseDropRate) {
                // Create a new corpse item and drop it.
                this._map.addItem(this.getX(), this.getY(), this.getZ(),
                    Game.ItemRepository.create('corpse', {
                        name: this._name + ' corpse',
                        foreground: this._foreground
                    }));
            }    
        }
    }
};

Game.Mixins.RandomStatGainer = {
    name: 'RandomStatGainer',
    groupName: 'StatGainer',
    listeners: {
        onGainLevel: function() {
            var statOptions = this.getStatOptions();
            // Randomly select a stat option and execute the callback for each
            // stat point.
            while (this.getStatPoints() > 0) {
                // Call the stat increasing function with this as the context.
                statOptions.random()[1].call(this);
                this.setStatPoints(this.getStatPoints() - 1);
            }
        }
    }
};

Game.Mixins.PlayerStatGainer = {
    name: 'PlayerStatGainer',
    groupName: 'StatGainer',
    listeners: {
        onGainLevel: function() {
            // Setup the gain stat screen and show it.
            Game.Screen.gainStatScreen.setup(this);
            Game.Screen.playScreen.setSubScreen(Game.Screen.gainStatScreen);
        }
    }
};


Game.Mixins.PlayerActor = {
    name: 'PlayerActor',
    groupName: 'Actor',
    act: function(){
        if (this._acting){
            return;
        }
        this._acting = true;
        this.addTurnHunger();
        if (this.getHP() < 1){
            Game.Screen.playScreen.setGameEnded(true);
            Game.sendMessage(this, 'Press [enter] to die all the way')
        }
        this._acting = false;


        Game.refresh();
        this.getMap().getEngine().lock();
       //  this.clearMessages();
    }
}

Game.Mixins.TaskActor = {
    name: 'TaskActor',
    groupName: 'Actor',
    init: function(template) {
        // Load tasks
        this._tasks = template['tasks'] || ['wander']; 
    },
    act: function() {
    
        // Iterate through all our tasks
        for (var i = 0; i < this._tasks.length; i++) {
            if (this.canDoTask(this._tasks[i])) {
                // If we can perform the task, execute the function for it.
                this[this._tasks[i]]();
                return;
            }
        }
    },
    canDoTask: function(task) {
        if (task === 'hunt') {
            return this.hasMixin('Sight') && this.canSee(this.getMap().getPlayer());
        } else if (task === 'wander') {
            return true;
        } else {
            throw new Error('Tried to perform undefined task ' + task);
        }
    },
    hunt: function() {
        var player = this.getMap().getPlayer();
    
        // If we are adjacent to the player, then attack instead of hunting.
        var offsets = Math.abs(player.getX() - this.getX()) + 
            Math.abs(player.getY() - this.getY());
        if (offsets === 1) {
            if (this.hasMixin('Attacker')) {
                this.attack(player);
                return;
            }
        }

        // Generate the path and move to the first tile.
        var source = this;
        var z = source.getZ();
        var path = new ROT.Path.AStar(player.getX(), player.getY(), function(x, y) {
            // If an entity is present at the tile, can't move there.
            var entity = source.getMap().getEntityAt(x, y, z);
            if (entity && entity !== player && entity !== source) {
                return false;
            }
            return source.getMap().getTile(x, y, z).isWalkable();
        }, {topology: 4});
        // Once we've gotten the path, we want to move to the second cell that is
        // passed in the callback (the first is the entity's strting point)
        var count = 0;
        path.compute(source.getX(), source.getY(), function(x, y) {
            if (count == 1) {
                source.tryMove(x, y, z);
            }
            count++;
        });
    },
    wander: function() {
        // Flip coin to determine if moving by 1 in the positive or negative direction
        var moveOffset = (Math.round(Math.random()) === 1) ? 1 : -1;
        // Flip coin to determine if moving in x direction or y direction
        if (Math.round(Math.random()) === 1) {
            this.tryMove(this.getX() + moveOffset, this.getY(), this.getZ());
        } else {
            this.tryMove(this.getX(), this.getY() + moveOffset, this.getZ());
        }
    }
};


Game.Mixins.GiantZombieActor = Game.extend(Game.Mixins.TaskActor, {
    init: function(template) {
       
        // Call the task actor init with the right tasks.
        Game.Mixins.TaskActor.init.call(this, Game.extend(template, {
            'tasks' : ['growArm', 'spawnSlime', 'hunt', 'wander']
        }));
        // We only want to grow the arm once.
        this._hasGrownArm = false;
    },
    canDoTask: function(task) {
       
        // If we haven't already grown arm and HP <= 20, then we can grow.
        if (task === 'growArm') {
            return this.getHP() <= 20 && !this._hasGrownArm;
        // Spawn a slime only a 10% of turns.
        } else if (task === 'spawnSlime') {
            return Math.round(Math.random() * 100) <= 10;
        // Call parent canDoTask
        } else {
           
            return Game.Mixins.TaskActor.canDoTask.call(this, task);
        }
    },
    growArm: function() {
        this._hasGrownArm = true;
        this.increaseAttackValue(5);
        // Send a message saying the zombie grew an arm.
        Game.sendMessageNearby(this.getMap(),
            this.getX(), this.getY(), this.getZ(),
            'An extra arm appears on the giant zombie!');
    },
    spawnSlime: function() {
        // Generate a random position nearby.
        var xOffset = Math.floor(Math.random() * 3) - 1;
        var yOffset = Math.floor(Math.random() * 3) - 1;

        // Check if we can spawn an entity at that position.
        if (!this.getMap().isEmptyFloor(this.getX() + xOffset, this.getY() + yOffset,
            this.getZ())) {
            // If we cant, do nothing
            return;
        }
        // Create the entity
        var slime = Game.EntityRepository.create('slime');
        slime.setX(this.getX() + xOffset);
        slime.setY(this.getY() + yOffset)
        slime.setZ(this.getZ());
        this.getMap().addEntity(slime);
    },
    listeners: {
        onDeath: function(attacker) {
            // Switch to win screen when killed!
            Game.switchScreen(Game.Screen.winScreen);
        }
    }
});


Game.Mixins.FungusActor = {
    name: 'FungusActor',
    groupName: 'Actor',
    init: function(){
        this._growthsRemaining = 3;
    },
    act: function(){
        if (this._growthsRemaining > 0){
            if (Math.random() <= 0.02){
                let xOffset = Math.floor(Math.random() * 3) - 1;
                let yOffset = Math.floor(Math.random() * 3) - 1;
                let newX = this.getX() + xOffset;
                let newY = this.getY() + yOffset;
                let z = this.getZ();
                if (xOffset != 0 || yOffset != 0){
                    if (this.getMap().isEmptyFloor(newX, newY, z)){
                        let entity = Game.EntityRepository.create('fungus');
                        entity.setPosition(newX, newY, z)
                        this.getMap().addEntity(entity);
                        this._growthsRemaining--;
                        Game.sendMessageNearby(this.getMap(),
                            entity.getX(), entity.getY(), z,
                            "The fungus is spreading!")
                    }
                }
            }
        }
    }
}

Game.Mixins.InventoryHolder = {
    name: 'InventoryHolder',
    init: function(template){
        let inventorySlots = template['inventorySlots'] || 10;
        this._items = new Array(inventorySlots);
    },
    getItems: function(){
        return this._items;
    },
    getItem: function(i){
        return this._items[i];
    },
    addItem: function(item){
        for (let i = 0; i<this._items.length; i++){
            if (!this._items[i]){
                this._items[i] = item;
                return true;
            }
        }
        return false;
    },
    removeItem: function(i) {
        // If we can equip items, then make sure we unequip the item we are removing.
        if (this._items[i] && this.hasMixin(Game.Mixins.Equipper)) {
            this.unequip(this._items[i]);
        }
        // Simply clear the inventory slot.
        this._items[i] = null;
    },
    canAddItem: function(){
        for (let i = 0; i < this._items.length; i++){
            if (!this._items[i]){
                return true;
            }
        }
        return false;
    },
    pickupItems: function(indices){
        let mapItems = this._map.getItemsAt(this.getX(), this.getY(), this.getZ());
        let added = 0;
        for (let i = 0; i<indices.length; i++){
            if (this.addItem(mapItems[indices[i] - added])){
                mapItems.splice(indices[i] - added, 1);
                added++;
            } else {
                break;
            }
        }
        this._map.setItemsAt(this.getX(), this.getY(), this.getZ(), mapItems);
        return added === indices.length;
    },
    dropItem: function(i){
        if (this._items[i]){
            if (this._map){
                this._map.addItem(this.getX(), this.getY(), this.getZ(), this._items[i]);
            }
            this.removeItem(i);
        }
    }
}


Game.Mixins.MessageRecipient = {
    name: 'MessageRecipient',
    init: function(template){
        this._messages = [];
    },
    recieveMessage: function(message){
        this._messages.push(message);
    },
    getMessages: function(){
        return this._messages;
    },
    clearMessages: function(){
        this._messages = [];
    }
}

Game.sendMessage = function(recipient, message, args){
    if (recipient.hasMixin(Game.Mixins.MessageRecipient)){
        if (args){
            message = vsprintf(message, args);
        }
        recipient.recieveMessage(message);
    }
}

Game.sendMessageNearby = function(map, centerX, centerY, centerZ, message, args){
    if (args){
        message = vsprintf(message, args);
    }

    entities = map.getEntitiesWithinRadius(centerX, centerY, centerZ, 5);
    entities.forEach(function(a){
        
         
     
        if (a.hasMixin(Game.Mixins.MessageRecipient)){
           
            a.recieveMessage(message);
        }
    })
}


//templates must be declared after mixins....

