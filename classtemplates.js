
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
		perception: 5,
        intelligence: 5,
        arcana: 5,
        charisma: 5,
        luck: 5,
    },
    statPointsPerLevel: 3,
    skillPointsPerLevel: 5,
    abilityPointsPerLevel: 5,
    staminaRegenRate: 1,
    hpPerLevel: 5,
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
            Game.Mixins.PlayerStatGainer],
    extraMixins: [],
    baseSkills: [[Game.Skills.Run, 1], [Game.Skills.Bash, 1], [Game.Skills.Regenerate, 1], [Game.Skills.WhirlwindAttack, 1], [Game.Skills.FlameBurst, 1]],
 
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

//=================  Starter Equipment  ============>====>-->


//  pick the weapon/armor template you want

//          copy this...up until here --|<class>  ------{The item template you want}---------
let shortsword = new Game.ItemFactory.Classes.Weapons(Game.Items.Equipment.Weapons.Swords.shortsword);
let handaxe = new Game.ItemFactory.Classes.Weapons(Game.Items.Equipment.Weapons.Axes.handaxe);
let dagger = new Game.ItemFactory.Classes.Weapons(Game.Items.Equipment.Weapons.Daggers.dagger);
// -check itemFactory, "equipment class constructors," starting at line 116 currently


                //just follow declaration from prefixes file
let cheap = {Quality: Game.Items.WeaponPrefix.Quality.Cheap} //can do one of each type

//  <any name>...copy all this exactly as is, then put variables above
let basicSword = new Game.ItemFactory.Classes.Equipment(shortsword, cheap);
let basicAxe = new Game.ItemFactory.Classes.Equipment(handaxe, cheap);
let basicDagger = new Game.ItemFactory.Classes.Equipment(dagger, cheap);
// then above variable goes -----V  here
let cheapSword = new Game.Item(basicSword) //<<--- the resulting item
let cheapAxe = new Game.Item(basicAxe)
let cheapDagger = new Game.Item(basicDagger)


//more examples. The final variable can be re-used for other classes, if wanted.
let boots = new Game.ItemFactory.Classes.Boots(Game.Items.Equipment.Armor.Boots.boots);
let shoddy = {Quality: Game.Items.ArmorPrefix.Quality.Shoddy};
let basicBoots = new Game.ItemFactory.Classes.Equipment(boots, shoddy);
let shoddyBoots = new Game.Item(basicBoots); //<<--- the final item


let armor = new Game.ItemFactory.Classes.Body(Game.Items.Equipment.Armor.Body.crude);

let basicArmor = new Game.ItemFactory.Classes.Equipment(armor, cheap);
let cheapArmor = new Game.Item(basicArmor);//<<--- the final item



//================= Classes ==============================>>>>>>>


Game.classTemplates.FighterTemplate = Game.extend(Game.PlayerTemplate, {
    name: "Fighter",
	maxHP: 40,
    stats: {
        strength: 7,
        vitality: 7,
        willpower: 5,
        dexterity: 5,
		perception: 5,
        intelligence: 3,
        arcana: 2,
        charisma: 5,
        luck: 5,
    },
    equipment: { //items added here
        body: cheapArmor,
        mainHand: cheapSword,
        offhand: null,
        boots: shoddyBoots,
        bracers: null,
        leftRing: null,
        rightRing: null,
        amulet: null,
        cape: null,
        helmet: null,
    },
    items: [
        cheapArmor,
        cheapSword,
        shoddyBoots
    ],
    abilities: [
        ["Combat Mastery", 0, 1],
        ["Tenacity", 0, 1],
		["Combat Brutality", 0, 1.2],
		["Assassination", 0, 3],
		["Mysticism", 0, 4],
		["Shield Mastery", 0, 0.8],
		["Guardian Combat", 0, 0.8],
		["Readiness", 0, 2.5],
		["Sword", 0, 1],
		["Bow", 0, 1.3],
		["Axe", 0, 1],
		["Mace", 0, 1],
		["Dagger", 0, 1],
		["Ambidexterity", 0, 2],
		["Meditation", 0, 3],
    ],
    sightRadius: 5,
    description: "A heroic fighter. Testing his mettle in the dungeons."

})

Game.classTemplates.RogueTemplate = Game.extend(Game.PlayerTemplate, {
    name: "Rogue",
    speed: 1400,
	stats: {
        strength: 5,
        vitality: 4,
        willpower: 5,
        dexterity: 9,
		perception: 7,
        intelligence: 5,
        arcana: 5,
        charisma: 5,
        luck: 5,
    },
	    equipment: {
        body: null,
        mainHand: null,
        offhand: null,
        boots: null,
        bracers: null,
        leftRing: null,
        rightRing: null,
        amulet: null,
        cape: null,
        helmet: null,
    },
    items: [

    ],
    abilities: [
        ["Combat Mastery", 0, 1],
        ["Tenacity", 0, 2.4],
		["Combat Brutality", 0, 2],
		["Assassination", 0, 1],
		["Mysticism", 0, 2.2],
		["Shield Mastery", 0, 3],
		["Guardian Combat", 0, 4],
		["Readiness", 0, 1],
		["Sword", 0, 1],
		["Bow", 0, 1],
		["Axe", 0, 1],
		["Mace", 0, 1],
		["Dagger", 0, 0.8],
		["Ambidexterity", 0, 1],
		["Meditation", 0, 2.4],
    ],
    sightRadius: 7,
	hpPerLevel: 3,
    description: "A devious rogue in search of great fortune"

})

Game.classTemplates.BarbarianTemplate = Game.extend(Game.PlayerTemplate, {
    name: "Barbarian",
	stats: {
        strength: 9,
        vitality: 6,
        willpower: 5,
        dexterity: 6,
		perception: 5,
        intelligence: 2,
        arcana: 1,
        charisma: 4,
        luck: 5,
    },
    equipment: { //items added here
        body: null,
        mainHand: cheapAxe,
        offhand: null,
        boots: null,
        bracers: null,
        leftRing: null,
        rightRing: null,
        amulet: null,
        cape: null,
        helmet: null,
    },
    items: [
        cheapAxe,
    ],
    abilities: [
        ["Combat Mastery", 0, 1],
        ["Tenacity", 0, 0.8],
		["Combat Brutality", 0, 0.8],
		["Assassination", 0, 4],
		["Mysticism", 0, 4],
		["Shield Mastery", 0, 2],
		["Guardian Combat", 0, 2],
		["Readiness", 0, 2.4],
		["Sword", 0, 1],
		["Bow", 0, 1],
		["Axe", 0, 1.4],
		["Mace", 0, 1.4],
		["Dagger", 0, 3],
		["Ambidexterity", 0, 1.4],
		["Meditation", 0, 3],
    ],
    fullnessDepletionRate: 3,
	hpPerLevel: 6,
    fullness: 1000,
    description: "From the great north, the barbarian is on a journey of self discovery"
})

Game.classTemplates.WizardTemplate = Game.extend(Game.PlayerTemplate, {
    name: "Wizard",
	stats: {
        strength: 3,
        vitality: 3,
        willpower: 6,
        dexterity: 5,
		perception: 6,
        intelligence: 9,
        arcana: 7,
        charisma: 4,
        luck: 5,
    },
		    equipment: {
        body: null,
        mainHand: null,
        offhand: null,
        boots: null,
        bracers: null,
        leftRing: null,
        rightRing: null,
        amulet: null,
        cape: null,
        helmet: null,
    },
    items: [

    ],
    abilities: [
        ["Combat Mastery", 0, 4],
        ["Tenacity", 0, 3],
		["Combat Brutality", 0, 3],
		["Assassination", 0, 3],
		["Mysticism", 0, 1],
		["Shield Mastery", 0, 5],
		["Guardian Combat", 0, 5],
		["Readiness", 0, 3],
		["Sword", 0, 3],
		["Bow", 0, 2],
		["Axe", 0, 3],
		["Mace", 0, 3],
		["Dagger", 0, 2],
		["Ambidexterity", 0, 3],
		["Meditation", 0, 1],
    ],
	hpPerLevel: 2,
    mpPerLevel: 5,
    maxMP: 25,
    description: "Studying for decades to become a master of magic",
    extraMixins: [Game.Mixins.RangedAttacker, Game.Mixins.Caster]
})

Game.classTemplates.ClericTemplate = Game.extend(Game.PlayerTemplate, {
    name: "Cleric",
	stats: {
        strength: 5,
        vitality: 6,
        willpower: 8,
        dexterity: 5,
		perception: 5,
        intelligence: 5,
        arcana: 6,
        charisma: 5,
        luck: 7,

    },
		    equipment: {
        body: null,
        mainHand: null,
        offhand: null,
        boots: null,
        bracers: null,
        leftRing: null,
        rightRing: null,
        amulet: null,
        cape: null,
        helmet: null,
    },
    items: [

    ],
    abilities: [
        ["Combat Mastery", 0, 1.6],
        ["Tenacity", 0, 1.4],
		["Combat Brutality", 0, 2.4],
		["Assassination", 0, 5],
		["Mysticism", 0, 1.5],
		["Shield Mastery", 0, 1.3],
		["Guardian Combat", 0, 1.3],
		["Readiness", 0, 3],
		["Sword", 0, 1.5],
		["Bow", 0, 3],
		["Axe", 0, 2],
		["Mace", 0, 0.8],
		["Dagger", 0, 5],
		["Ambidexterity", 0, 3],
		["Meditation", 0, 1],
    ],
	hpPerLevel: 4,
    description: "To cleanse the world in the name of their primordial god"
})

Game.classTemplates.NinjaTemplate = Game.extend(Game.PlayerTemplate, {
    name: "Ninja",
	stats: {
        strength: 5,
        vitality: 3,
        willpower: 5,
        dexterity: 7,
		perception: 9,
        intelligence: 3,
        arcana: 3,
        charisma: 2,
        luck: 3,

    },
		    equipment: {
        body: null,
        mainHand: null,
        offhand: null,
        boots: null,
        bracers: null,
        leftRing: null,
        rightRing: null,
        amulet: null,
        cape: null,
        helmet: null,
    },
    items: [
	
    ],
    abilities: [
        ["Combat Mastery", 0, 1],
        ["Tenacity", 0, 2.2],
		["Combat Brutality", 0, 2.2],
		["Assassination", 0, 1],
		["Mysticism", 0, 2],
		["Shield Mastery", 0, 5],
		["Guardian Combat", 0, 4],
		["Readiness", 0, 1],
		["Sword", 0, 1],
		["Bow", 0, 1],
		["Axe", 0, 2],
		["Mace", 0, 2.2],
		["Dagger", 0, 1],
		["Ambidexterity", 0, 1],
		["Meditation", 0, 2.2],
    ],
	hpPerLevel: 3,
    description: "The way of the ninja is quiet, dark, and lonely"
})

Game.classTemplates.getAvailableClasses = function() {
    let availableClasses = [];
    for (let i in Game.classTemplates){
            availableClasses.push(Game.classTemplates[i]);
    }
        return availableClasses;
}

