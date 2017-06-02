
//this is the basic template from which all classes are built
Game.PlayerTemplate = {
    character: '@',
    foreground: 'white',
    maxHP: 20,
    sightRadius: 5,
    name: 'human (you)',
    inventorySlots: 22,
    stats: {
        strength: 5,
        vitality: 5,
        willpower: 5,
        dexterity: 5,
        intelligence: 5,
        arcana: 5,
        charisma: 5,
        luck: 5,
    },
    staminaRegenRate: 1,
    regenDelay: 5,
    mixins: [Game.Mixins.PlayerActor,
             Game.Mixins.Attacker,
             Game.Mixins.Destructible,
             Game.Mixins.MessageRecipient,
             Game.Mixins.Sight,
             Game.Mixins.InventoryHolder,
             Game.Mixins.FoodConsumer,
             Game.Mixins.Equipper,
            Game.Mixins.ExperienceGainer,
            Game.Mixins.PlayerStatGainer]
 
}

Game.classTemplates = {};


//from here, you can build classes simply by entering values.
//I think this is all the values you can alter
//with a description where they aren't obvious


//statPointsPerLevel -- default 1
//fullnessDepletionRate -- default: 1 -- how quickly hunger is added
//maxFullness -- default: 1000 --how much you can eat
//speed -- default: 1000
//sightRadius -- default 7 -- how many tiles (literally) you can see
//maxHP -- default 40
//defenseValue -- default 0
//attackValue -- default 10

//i made a few to get started...

//any values not defined in the classTemplate will default to playertemplate values


Game.classTemplates.FighterTemplate = Game.extend(Game.PlayerTemplate, {
    name: "Fighter",
	maxHP: 40,
    stats: {
        strength: 7,
        vitality: 7,
        willpower: 5,
        dexterity: 5,
        intelligence: 4,
        arcana: 5,
        charisma: 5,
        luck: 5,
    },
    sightRadius: 5,
    speed: 800,
    description: "Standard fighter. Strong, but slow"

})

Game.classTemplates.RogueTemplate = Game.extend(Game.PlayerTemplate, {
    name: "Rogue",
    speed: 1400,
	stats: {
        strength: 5,
        vitality: 5,
        willpower: 5,
        dexterity: 9,
        intelligence: 5,
        arcana: 5,
        charisma: 5,
        luck: 5,
    },
    sightRadius: 7,
    description: "A Rogue. Quick, but weak"

})

Game.classTemplates.BarbarianTemplate = Game.extend(Game.PlayerTemplate, {
    name: "Barbarian",
	stats: {
        strength: 9,
        vitality: 6,
        willpower: 5,
        dexterity: 6,
        intelligence: 4,
        arcana: 4,
        charisma: 4,
        luck: 5,
    },
    fullnessDepletionRate: 3,
    fullness: 1000,
    description: "Hungry for blood, and food"
})

Game.classTemplates.getAvailableClasses = function() {
    let availableClasses = [];
    for (let i in Game.classTemplates){
            availableClasses.push(Game.classTemplates[i]);
    }
        return availableClasses;
}

