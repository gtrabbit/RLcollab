

Game.Skill = class skill {
	constructor(skill, actor){
		this.title = skill.name;
		this.coolDownDuration = Number(skill.coolDownDuration)+1;
		this.timer = 0;
		this.inCoolDown = false;
		this.isActive = false;
		this.costs = skill.costs;
		this.actor = actor;
		this.activateMsg = skill.activateMsg;
		if (actor.hasMixin('PlayerActor')){
			this.makeIcon();
		}	

	}
	makeIcon(){

		let UI = document.createElement('div');
		UI.className = "skillIcon";
		UI.id = this.title;
		let name = document.createElement('span');
		name.className = "skillTitle";
		name.textContent = this.title;
		let CDcount = document.createElement('span');
		CDcount.className = "CDcount";
		UI.appendChild(name);
		UI.appendChild(CDcount);
		Game.skillBar.appendChild(UI);
		this.UI = UI;
	}
	canActivate(){
		for (let key in this.costs){
			let getter = "get" + key;
			if (this.actor[getter]() < this.costs[key]){
				return "Insufficient " + key;
			}

		}
		this.activate();
		return this.activateMsg;		
	}

	activate(){
		this.inCoolDown = true;
		for (let key in this.costs){
			switch(key){
				case 'Stamina':
					this.actor.modifyStamina(-this.costs[key]);
					break;



			}
		}
	}

	coolDown(){
		this.timer++
		if (this.timer > this.coolDownDuration){
			this.timer = 0;
			this.inCoolDown = false;
			this.UI.childNodes[1].textContent = "";
			this.UI.style.backgroundColor = "white";	
			window.setTimeout(()=> this.UI.style.transition = "", 2000 );
			window.setTimeout(()=> {
				this.UI.style.transition = "background-color 1s";
				this.UI.style.backgroundColor = "rgba(0,0,0,0)";
			} , 50);
			
		} else {
			this.UI.style.opacity = this.timer / this.coolDownDuration;
			this.UI.childNodes[1].textContent = " : " + (this.coolDownDuration - this.timer);
		}
		//render CD UI
	
	}

	onTick(){
		
	}


}