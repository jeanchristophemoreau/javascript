class EventEmitter{
        constructor() {
            private this.callbacks = {};
        }


        on(event, fn) {
		this.callbacks.hasOwnProperty(event)? this.callbacks[event].push(fn) : this.callbacks[event]=[fn];  //si l'event est déjà présent dans l'EventEmitter on lui ajoute la fonction sinon on ajoute le tableau de fonction au callbacks avec en clé l'event 
		return this;	//on retourne l'objet pour pouvoir appeler les fonctions à la chaine
        }

	off(event, fn) {
		if(event != undefined){						//si on a bien un event passé en paramètre
			if(this.callbacks.hasOwnProperty(event)){			//et si l'event est bien dans l'EventEmitter
				if(fn != undefined){						//et si on a bien une fonction en paramètre
					if(this.callbacks[event].hasOwnProperty(fn){			//et si la fonction est bien dans l'event	
						delete this.callbacks[event][ this.callbacks[event].indexOf(fn)]; //alors la fonction est retirée de l'event
					}	
				}
				else{								//sinon si il n'y a pas de fonction en paramètre
					delete this.callbacks[event];				//c'est l'event qui est supprimé
				}
			}
		}
		else{								//sinon si il n'y a pas d'event en paramètre
			this.callbacks = {};					//ce sont tous les events qui sont supprimés
		}
		return this;	//on retourne l'objet pour pouvoir appeler les fonctions à la chaine
        }

	once(event, fn) {
		times(event, 1, fn);
		return this;	//on retourne l'objet pour pouvoir appeler les fonctions à la chaine
        }

	times(event, n, fn) {
		fn.times = n;	//on ajoute à la fonction un compteur qui indiquera combien de fois elle peut s'executer
		on(event,fn);	//on appelle on pour ajouter l'event et la fonction à l'EventEmitter
		return this;	//on retourne l'objet pour pouvoir appeler les fonctions à la chaine
        }


	emit(event, arg) {
		if(this.callbacks.hasOwnProperty(event)){			//si on a bien un event passé en paramètre
			this.callbacks[event].forEach(function(fn){		//pour chaque fonction de l'event
				fn(arg);					//on appelle la fonction en lui passant l'argument en paramètre
				if(fn.times != undefined){			//si la fonction a un compteur
					fn.times --;				//on decrémente ce compteur
					fn.times == 0 ? this.off(event, fn);	//et si le compteur tombe a 0, on retire la fonction de l'event en appelant off
				}
			});
		}
		return this;	//on retourne l'objet pour pouvoir appeler les fonctions à la chaine
        }

}
