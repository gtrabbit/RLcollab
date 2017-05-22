Game.EntityRepository = new Game.Repository('entities', Game.Entity);



//templates here can be created/modified very similar to the classTemplates


Game.EntityRepository.define('fungus', {
    name: 'fungus',
    character: 'F',
    foreground: 'rgb(30,200,30)',
    maxHP: 10,
    speed: 250,
    mixins: [Game.Mixins.FungusActor,
            Game.Mixins.Destructible,
            Game.Mixins.ExperienceGainer,
            Game.Mixins.RandomStatGainer]

});

Game.EntityRepository.define('giant zombie', {
    name: 'giant zombie', 
    character: 'Z',
    foreground: 'teal',
    maxHp: 100,
    attackValue: 12,
    defenseValue: 5,
    level: 5,
    sightRadius: 6,
    mixins: [Game.Mixins.GiantZombieActor, Game.Mixins.Sight,
             Game.Mixins.Attacker, Game.Mixins.Destructible,
             Game.Mixins.CorpseDropper,
             Game.Mixins.ExperienceGainer]
}, {
    disableRandomCreation: true
});

Game.EntityRepository.define('slime', {
    name: 'slime',
    character: 's',
    foreground: 'lightGreen',
    maxHp: 10,
    attackValue: 5,
    sightRadius: 3,
    tasks: ['hunt', 'wander'],
    mixins: [Game.Mixins.TaskActor, Game.Mixins.Sight,
             Game.Mixins.Attacker, Game.Mixins.Destructible,
             Game.Mixins.CorpseDropper,
             Game.Mixins.ExperienceGainer, Game.Mixins.RandomStatGainer]
});

Game.EntityRepository.define('bat', {
    name: 'bat',
    character: 'B',
    foreground: 'white',
    maxHP: 5,
    attackValue: 4,
    speed: 2000,
    mixins: [Game.Mixins.TaskActor, 
             Game.Mixins.Attacker,
             Game.Mixins.Destructible,
             Game.Mixins.CorpseDropper,
             Game.Mixins.ExperienceGainer,
            Game.Mixins.RandomStatGainer]
});

Game.EntityRepository.define('newt', {
    name: 'newt',
    character: ':',
    foreground: 'yellow',
    maxHP: 3,
    attackValue: 2,
    mixins: [Game.Mixins.TaskActor, 
             Game.Mixins.Attacker,
             Game.Mixins.Destructible,
             Game.Mixins.CorpseDropper,
             Game.Mixins.ExperienceGainer,
            Game.Mixins.RandomStatGainer]
});

Game.EntityRepository.define('kobold', {
    name: 'kobold',
    character: 'k',
    foreground: 'white',
    maxHp: 6,
	speed: 300,
    attackValue: 4,
    sightRadius: 5,
    tasks: ['hunt', 'wander'],
    mixins: [Game.Mixins.TaskActor, Game.Mixins.Sight,
             Game.Mixins.Attacker, Game.Mixins.Destructible,
             Game.Mixins.CorpseDropper,
             Game.Mixins.ExperienceGainer,
            Game.Mixins.RandomStatGainer]
});

Game.EntityRepository.define('orc', {
	name: 'orc',
	character: 'O',
	foreground: 'DarkOliveGreen',
	maxHP: 12,
	attackValue: 7,
	sightRadius: 5,
	tasks: ['hunt', 'wander'],
	mixins: [Game.Mixins.TaskActor, Game.Mixins.Sight,
             Game.Mixins.Attacker, Game.Mixins.Destructible,
             Game.Mixins.CorpseDropper,
             Game.Mixins.ExperienceGainer,
            Game.Mixins.RandomStatGainer]
}};

Game.EntityRepository.define('ogre', {
	name: 'ogre',
	character: 'O',
	foreground: 'Chocolate',
	maxHP: 18,
	attackValue: 11,
	sightRadius: 5,
	tasks: ['hunt', 'wander'],
	mixins: [Game.Mixins.TaskActor, Game.Mixins.Sight,
             Game.Mixins.Attacker, Game.Mixins.Destructible,
             Game.Mixins.CorpseDropper,
             Game.Mixins.ExperienceGainer,
            Game.Mixins.RandomStatGainer]