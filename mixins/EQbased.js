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
    throwItem: function(item, target){
        this._items;
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
        let tile = this._map.getTile(this.getX(), this.getY(), this.getZ())
        let loot = tile.getLoot();
        let count = 0;
        for (let i of indices){
            if (this.addItem(loot[i-count])){
                tile.takeLoot(i-count);
                count++;
            } else {
                break;
            }
        }
        return count === indices.length;

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