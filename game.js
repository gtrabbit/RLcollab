window.onload = function(){
	if (!ROT.isSupported()) {
    	alert("The rot.js library isn't supported by your browser.");
	} else {
		Game.init();

		const gameDisplay = Game.getDisplay().getContainer();
		gameDisplay.id = "gameDisplay";
		gameDisplay.className = "gameDsp centered-block";
		document.body.appendChild(gameDisplay);
		const msgDisp = Game.getMsgDisplay().getContainer();
		msgDisp.className = "centered-block"
		document.body.appendChild(msgDisp);
		Game.switchScreen(Game.Screen.startScreen);
	}

}



const Game = {
		display: null,
		init: function(){
			this._display = new ROT.Display({width: this._screenWidth, height: this._screenHeight + 1});
			this._msgDisplay = new ROT.Display({width: this._screenWidth, height: this._screenHeight / 4 })
			let game = this;
			let bindEventToScreen = function(event){
				window.addEventListener(event, function(e){
					if (game._currentScreen !==null){
						game._currentScreen.handleInput(event, e);
					}
				});
			}
			bindEventToScreen('keydown');
			bindEventToScreen('keyup');
			bindEventToScreen('keypress');
		},
		refresh: function(){
			this._display.clear();
			this._currentScreen.render(this._display, this._msgDisplay);
		},
		getDisplay: function(){
			return this._display;
		},
		getMsgDisplay: function(){
			return this._msgDisplay;
		},
		_display: null,
		_currentScreen: null,
		_screenWidth: 80,
		_screenHeight: 24,
		getDisplay: function() {
    		return this._display;
		},
		getScreenWidth: function() {
    		return this._screenWidth;
		},
		getScreenHeight: function() {
    		return this._screenHeight;
		},
		switchScreen: function(screen, value){
			if (this._currentScreen !== null){
				this._currentScreen.exit();
			}
			this.getDisplay().clear();
			this._currentScreen = screen;
			if (this._currentScreen) {
				this._currentScreen.enter(value);
				this.refresh();
			}
		}

	} //end of game object






