Game.PlayerTemplate = {
    character: '@',
    foreground: 'white',
    maxHP: 40,
    attackValue: 10,
    sightRadius: 6,
    name: 'human (you)',
    inventorySlots: 22,
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

Game.classTemplates = {}

Game.classTemplates.FighterTemplate = Game.extend(Game.PlayerTemplate, {
    maxHP: 60,
    attackValue: 15,
    sightRadius: 5,
    speed: 800,
    className: "Fighter"

})

Game.classTemplates.RogueTemplate = Game.extend(Game.PlayerTemplate, {
    speed: 1500,
    sightRadius: 7,
    ClassName: "Rogue"
})
