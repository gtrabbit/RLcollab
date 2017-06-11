Game.Mixins.Equipper = {
    name: 'Equipper',
    init: function(template) {
        this._equipment = {
            mainHand: null,
            offhand: null,
            body: null,
            helmet: null,
            boots: null,
            bracers: null,
            leftRing: null,
            rightRing: null,
            amulet: null,
            cape: null
        }

    },
    wield: function(item) {
        let changed = false;
        item.EQSlot.forEach(a => {
            if (this.getEquipment(a) === null && !changed){
                this._equipment[a] = item;
                changed = true;

            }
        })
        if (changed){
            return true;
        } else {
            Game.sendMessage(this, "You must unequip something first");
            return false;
        }

    },
    unwield: function(slot) {
        this._equipment[slot] = null;
    },
    getEquipment: function(slot) {
        return slot ? this._equipment[slot] : this._equipment;    
    },
    unequip: function(item) {
        // Helper function to be called before getting rid of an item.
        if (this._equipment[item.EQSlot] === item){
            this.unwield(item.EQSlot);
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