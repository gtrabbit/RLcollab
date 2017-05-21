Game.EntityRepository = new Game.Repository('entities', Game.Entity);






Game.EntityRepository.define('fungus', {
    name: 'fungus',
    character: 'F',
    foreground: 'green',
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
    maxHp: 30,
    attackValue: 8,
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
    attackValue: 4,
    sightRadius: 5,
    tasks: ['hunt', 'wander'],
    mixins: [Game.Mixins.TaskActor, Game.Mixins.Sight,
             Game.Mixins.Attacker, Game.Mixins.Destructible,
             Game.Mixins.CorpseDropper,
             Game.Mixins.ExperienceGainer,
            Game.Mixins.RandomStatGainer]
});