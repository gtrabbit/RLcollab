Game.Screen = {};



Game.Screen.startScreen = {
    _availableClasses: null,
    _selectedIndex: null,
	enter: function(){
        console.log(Game.ItemRepository);
        this._selectedIndex = 0;
        this._availableClasses = Game.classTemplates.getAvailableClasses()},
	exit: function(){console.log("exited start screen");},
	render: function(display){
        display.clear();
        let entermsg = 'Please Select a Class'
        let confirmMsg = "Press [Enter] to confirm selection"
		display.drawText((Game.getScreenWidth() - entermsg.length)/2 ,1,"%c{yellow}" + entermsg);
		display.drawText((Game.getScreenWidth() - confirmMsg.length)/2, (Game.getScreenHeight()/2)+5, confirmMsg);
        for (let i = this._availableClasses.length-1; i>=0; i--){
            let x = ( (i*12) + Game.getScreenWidth()/(this._availableClasses.length+1) )  ;
            let y = Game.getScreenHeight()/2;
            display.drawText(x, y, this._availableClasses[i].name);
            if (i === this._selectedIndex){

                display.drawText(x-1, y, "%c{yellow}[");
                display.drawText(x+this._availableClasses[i].name.length, y, "%c{yellow}]");
                let description = this._availableClasses[i].description;
                display.drawText((Game.getScreenWidth() - description.length)/2, (Game.getScreenHeight()/2)-5, description )
            }
        }
	},
	handleInput: function(inputType, inputData){
        if (inputType === 'keydown'){
            switch(inputData.keyCode){
                case ROT.VK_NUMPAD4:
                    if (this._selectedIndex > 0){
                        this._selectedIndex--;
                        this.render(Game.getDisplay());
                    }
                    break;
                case ROT.VK_NUMPAD6:
                    if (this._selectedIndex < this._availableClasses.length-1){
                        this._selectedIndex++;
                        this.render(Game.getDisplay());
                    }          
                    break;
                case ROT.VK_RETURN:
                    Game.switchScreen(Game.Screen.playScreen, this._availableClasses[this._selectedIndex]);
                    break;
            }
		}
	}
}


Game.Screen.winScreen = {
    enter: function() {    console.log("Entered win screen."); },
    exit: function() { console.log("Exited win screen."); },
    render: function(display) {
        // Render our prompt to the screen
        for (var i = 0; i < 22; i++) {
            // Generate random background colors
            var r = Math.round(Math.random() * 255);
            var g = Math.round(Math.random() * 255);
            var b = Math.round(Math.random() * 255);
            var background = ROT.Color.toRGB([r, g, b]);
            display.drawText(2, i + 1, "%b{" + background + "}You win!");
        }
    },
    handleInput: function(inputType, inputData) {
        // Nothing to do here      
    }
}


Game.Screen.loseScreen = {
    enter: function() {    console.log("Entered lose screen."); },
    exit: function() { console.log("Exited lose screen."); },
    render: function(display) {
        // Render our prompt to the screen
        for (var i = 0; i < 22; i++) {
            display.drawText(2, i + 1, "%b{red}You lose! :(");
        }
    },
    handleInput: function(inputType, inputData) {
        // Nothing to do here      
    }
}




Game.Screen.playScreen = {

	_player: null,
	_gameEnded: false,
	_subScreen: null,
	exit: function(){
		console.log("exiting the play screen")
	},
	enter: function(className){
      
		let width = 100;
		let height = 48;
		let depth = 6;
		let tiles = new Game.Builder(width, height, depth).getTiles();
		this._player = new Game.Entity(className);
        console.log(this._player)
		this._map = new Game.Map.Cave(tiles, this._player);
		this._map.getEngine().start();
	},
	setSubScreen: function(subScreen){
		this._subScreen = subScreen;
		Game.refresh();
	},
    getScreenOffsets: function() {
        // Make sure we still have enough space to fit an entire game screen
        var topLeftX = Math.max(0, this._player.getX() - (Game.getScreenWidth() / 2));
        // Make sure we still have enough space to fit an entire game screen
        topLeftX = Math.min(topLeftX, this._player.getMap().getWidth() -
            Game.getScreenWidth());
        // Make sure the y-axis doesn't above the top bound
        var topLeftY = Math.max(0, this._player.getY() - (Game.getScreenHeight() / 2));
        // Make sure we still have enough space to fit an entire game screen
        topLeftY = Math.min(topLeftY, this._player.getMap().getHeight() - Game.getScreenHeight());
        return {
            x: topLeftX,
            y: topLeftY
        };
    },
	render: function(display, msgDisplay, statusDisplay){
		if (this._subScreen){
			this._subScreen.render(display);
			return;
		}
		let screenWidth = Game.getScreenWidth();
		let screenHeight = Game.getScreenHeight();
        this.renderTiles(display);

        let messages = this._player.getMessages();

        let messageY = 0;
        for (let i = 0; i < messages.length; i++){
            if (messages.length > 8){
                msgDisplay.clear();
                messages.shift();
            }
            messageY += msgDisplay.drawText(
                0,
                messageY,
                '%c{white}%b{black}' + messages[i]
                );
        }

        let stats = '%c{white}%b{black}';
        stats += vsprintf('HP: %d/%d St: %d/%d  | L: %d XP: %d' , [this._player.getHP(), 
                                        this._player.getMaxHP(),
                                        this._player.getStamina(),
                                        this._player.getMaxStamina(),
                                        this._player.getLevel(),
                                        this._player.getExperience()]);
        display.drawText(0, screenHeight, stats);
        var hungerState = this._player.getHungerState();
        display.drawText(screenWidth - hungerState.length, screenHeight, hungerState);

        let statuses = this._player._statuses;
        let spot = 0;
        for (let status of statuses){
            spot += statusDisplay.drawText(spot, 1, status.name);
            spot+= status.name.length;
        }



		
	},
     renderTiles: function(display) {
        var screenWidth = Game.getScreenWidth();
        var screenHeight = Game.getScreenHeight();
        var offsets = this.getScreenOffsets();
        var topLeftX = offsets.x;
        var topLeftY = offsets.y;
        // This object will keep track of all visible map cells
        var visibleCells = {};
        // Store this._player.getMap() and player's z to prevent losing it in callbacks
        var map = this._player.getMap();
        var currentDepth = this._player.getZ();
        // Find all visible cells and update the object
        map.getFov(currentDepth).compute(
            this._player.getX(), this._player.getY(), 
            this._player.getSightRadius(), 
            function(x, y, radius, visibility) {
                visibleCells[x + "," + y] = true;
                // Mark cell as explored
                map.setExplored(x, y, currentDepth, true);
            });


    



        for (let x = topLeftX; x < topLeftX + screenWidth; x++){
            for (let y = topLeftY; y < topLeftY + screenHeight; y++){
                
                if (map.isExplored(x, y, currentDepth)){
                    let glyph = map.getTile(x, y, currentDepth);
                    let char = glyph.getChar();
                    let foreground = 'darkGray';
                    if (visibleCells[x+','+y]){
                        foreground = glyph.getForeground();
                        char = glyph.getChar(true);
                    } 
                    display.draw(
                        x - topLeftX,
                        y - topLeftY,
                        char,
                        foreground,
                        glyph.getBackground()
                        );
                }

            }
          
        }
  
    },
    handleInput: function(inputType, inputData){
		if (this._gameEnded){
			if (inputType === 'keydown' && inputData.keyCode === ROT.VK_RETURN){
				Game.switchScreen(Game.Screen.loseScreen);
			}
			return;
		}
		if (this._subScreen){
			this._subScreen.handleInput(inputType, inputData);
			return;
		}

		if (inputType === 'keydown'){
            let validInput = true;
			switch(inputData.keyCode){
				case ROT.VK_NUMPAD4:
					this.move(-1,0, 0);
					break;
				case ROT.VK_NUMPAD1:
					this.move(-1, 1, 0);
					break;
				case ROT.VK_NUMPAD7:
					this.move(-1, -1, 0);
					break;
				case ROT.VK_NUMPAD9:
					this.move(1, -1, 0);
					break;
				case ROT.VK_NUMPAD3:
					this.move(1, 1, 0);
					break;
				case ROT.VK_NUMPAD6:
					this.move(1,0, 0);
					break;
				case ROT.VK_NUMPAD8:
					this.move(0,-1, 0);
					break;
				case ROT.VK_NUMPAD2:
					this.move(0,1, 0);
					break;
                case ROT.VK_F:
                    if (this._player.hasMixin('RangedAttacker')){
                        let point = {
                            x: this._player.getX(),
                            y: this._player.getY(),
                            z: this._player.getZ()
                        }
                        let radius = this._player.getSightRadius();
                        let target = Game.Geometry.getClosestTarget(this._map, point, radius);
                        if (target){
                            this._player.shoot(target);
                        }
                      

                    } else {
                        Game.sendMessage(this._player, "You do not have a ranged weapon equipped")
                    }

                    

                    break;
                case ROT.VK_T:
                    Game.Screen.selectProjectile.setup(this._player, this._player.getItems())
                    this.setSubScreen(Game.Screen.selectProjectile);
                    break;

				case ROT.VK_I:
					this.showItemsSubScreen(Game.Screen.inventoryScreen, this._player.getItems(),
                        'You are not carrying anything.');
                    break;
                case ROT.VK_E:
                	this.showItemsSubScreen(Game.Screen.eatScreen, this._player.getItems(),
                       'You have nothing to eat.');
                    break;
                case ROT.VK_W:
                    if (inputData.shiftKey){
                        this.showItemsSubScreen(Game.Screen.wearScreen, this._player.getItems(),
                            'You have nothing to wear.');
                    } else {
                        // Show the wield screen
                        this.showItemsSubScreen(Game.Screen.wieldScreen, this._player.getItems(),
                            'You have nothing to wield.');
                    }
                    break;

                case ROT.VK_D:
                	this.showItemsSubScreen(Game.Screen.dropScreen, this._player.getItems(),
                        'You have nothing to drop.');
                    break;
                case ROT.VK_COMMA:
                	var items = this._player.getMap().getItemsAt(this._player.getX(), this._player.getY(), this._player.getZ());
                    // If there is only one item, directly pick it up
                    if (items && items.length === 1) {
                        var item = items[0];
                        if (this._player.pickupItems([0])) {
                            Game.sendMessage(this._player, "You pick up %s.", [item.describeA()]);
                        } else {
                            Game.sendMessage(this._player, "Your inventory is full! Nothing was picked up.");
                        }
                    } else {
                        this.showItemsSubScreen(Game.Screen.pickupScreen, items,
                            'There is nothing here to pick up.');
                    } 
                    break;

                case ROT.VK_X:
                    this.showItemsSubScreen(Game.Screen.examineScreen, this._player.getItems(),
                    'You have nothing to examine.');
                    return;


				default:
                    validInput = false;
					break;
			}
            if (validInput){
                this._player.getMap().getEngine().unlock();
            }
			
		} else if (inputType === 'keypress'){
			let keyChar = String.fromCharCode(inputData.charCode);
			switch (keyChar){
				case ">":
					this.move(0, 0, 1);
                    this._player.getMap().getEngine().unlock();
					break;
				case "<":
					this.move(0,0,-1);
                    this._player.getMap().getEngine().unlock();
					break;
                case "?":
                    this.setSubScreen(Game.Screen.helpScreen);
                    return;

                case ";":
                    var offsets = this.getScreenOffsets();
                    Game.Screen.lookScreen.setup(this._player,
                    this._player.getX(), this._player.getY(),
                    offsets.x, offsets.y);
                    this.setSubScreen(Game.Screen.lookScreen);
                    return;
				default:

					break;
			}
			
		}
        
		
	},
	move: function(dX, dY, dZ){
		let newX = this._player.getX() + dX;
		let newY = this._player.getY() + dY;
		let newZ = this._player.getZ() + dZ;
		this._player.tryMove(newX, newY, newZ, this._player.getMap());
	},
	setGameEnded: function(gameEnded){
		this._gameEnded = gameEnded;
	},
    showItemsSubScreen: function(subScreen, items, emptyMessage) {
        if (items && subScreen.setup(this._player, items) > 0) {
            this.setSubScreen(subScreen);
        } else {
            Game.sendMessage(this._player, emptyMessage);
            Game.refresh();
        }
    }
}

Game.Screen.gainStatScreen = {
    setup: function(entity) {
        // Must be called before rendering.
        this._entity = entity;
        this._options = entity.getStatOptions();
    },
    render: function(display) {
        var letters = 'abcdefghijklmnopqrstuvwxyz';
        display.drawText(0, 0, 'Choose a stat to increase: ');

        // Iterate through each of our options
        for (var i = 0; i < this._options.length; i++) {
            display.drawText(0, 2 + i, 
                letters.substring(i, i + 1) + ' - ' + this._options[i][0]);
        }

        // Render remaining stat points
        display.drawText(0, 4 + this._options.length,
            "Remaining points: " + this._entity.getStatPoints());   
    },
    handleInput: function(inputType, inputData) {
        if (inputType === 'keydown') {
            // If a letter was pressed, check if it matches to a valid option.
            if (inputData.keyCode >= ROT.VK_A && inputData.keyCode <= ROT.VK_Z) {
                // Check if it maps to a valid item by subtracting 'a' from the character
                // to know what letter of the alphabet we used.
                var index = inputData.keyCode - ROT.VK_A;
                if (this._options[index]) {
                    // Call the stat increasing function
                    this._options[index][1].call(this._entity);
                    // Decrease stat points
                    this._entity.setStatPoints(this._entity.getStatPoints() - 1);
                    // If we have no stat points left, exit the screen, else refresh
                    if (this._entity.getStatPoints() == 0) {
                        Game.Screen.playScreen.setSubScreen(undefined);
                    } else {
                        Game.refresh();
                    }
                }
            }
        }
    }
};



Game.Screen.helpScreen = {
    render: function(display) {
        var text = 'jsrogue help';
        var border = '-------------';
        var y = 0;
        display.drawText(Game.getScreenWidth() / 2 - text.length / 2, y++, text);
        display.drawText(Game.getScreenWidth() / 2 - text.length / 2, y++, border);
        display.drawText(0, y++, 'The villagers have been complaining of a terrible stench coming from the cave.');
        display.drawText(0, y++, 'Find the source of this smell and get rid of it!');
        y += 3;
        display.drawText(0, y++, '[,] to pick up items');
        display.drawText(0, y++, '[d] to drop items');
        display.drawText(0, y++, '[e] to eat items');
        display.drawText(0, y++, '[w] to wield items');
        display.drawText(0, y++, '[W] to wield items');
        display.drawText(0, y++, '[x] to examine items');
        display.drawText(0, y++, '[;] to look around you');
        display.drawText(0, y++, '[?] to show this help screen');
        y += 3;
        text = '--- press [escape] to continue ---';
        display.drawText(Game.getScreenWidth() / 2 - text.length / 2, y++, text);
    },
    handleInput: function(inputType, inputData) {
        if (inputType === 'keydown'){
            if (inputData.keyCode === ROT.VK_ESCAPE){
                 Game.Screen.playScreen.setSubScreen(null);
            }
        }
       
    }
};

