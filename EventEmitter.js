
class EventEmitter{
        constructor() {
            this.callbacks = {};
        }


        on(event, fn) {
		this.callbacks.hasOwnProperty(event)? this.callbacks[event].push(fn) : this.callbacks[event] = [fn] ;
		return this;
        }

	off(event, fn) {
		if(event != undefined){
			if(this.callbacks.hasOwnProperty(event)){
				if(fn != undefined){		
					if(this.callbacks[event].hasOwnProperty(fn){
						delete this.callbacks[event][ this.callbacks[event].indexOf(fn)];
					}	
				}
				else{
					delete this.callbacks[event];
				}
			}
		}
		else{
			this.callbacks = {};
		}
		
        }

	once(event, fn) {
		times(event, 1, fn);
		return this;
        }

	times(event, n, fn) {
		fn.times = n;
		on(event,fn);
		return this;
        }


	emit(event, arg) {
		if(this.callbacks.hasOwnProperty(event)){
			this.callbacks[event].forEach(function(fn){
				fn(arg);
				if(fn.times != undefined){
					fn.times --;
					fn.times == 0 ? this.off(event, fn);
				}
			});
		}
		return this;
        }
}
