/**
 * define.js
 *
 * This function is intended to replace RequireJS's one with built code.
 * I
 */

if(!define) {
	var define;
	
	(function(win) {
		var modules = {},
			autoName = 1,
			oString = Object.prototype.toString,
			isArray = function(arr) {return oString.call(arr) === "[object Array]"},
			isFunction = function(arr) {return oString.call(arr) === "[object Function]"};
	
		define = function(name, deps, callback) {
			
			if(typeof name !== 'string') {
				callback = deps;
				deps = name;
				name = 'autoname-'+(autoName++);
			}
			
			if(name in modules && 'console' in win) {
				console.warn('define', name+' already exists');
			}
	
			if(!isArray(deps)) {
				callback = deps;
				deps = [];
			}
	
			if (isFunction(callback)) {
				var depsModules = [],
					i;
				
				for(i in deps) {
					
					if(deps[i] in modules) {
					
						depsModules.push(modules[deps[i]]);
						
					} else if('console' in win) {
						
						console.warn('define', deps[i]+' not found');
						
					}
				}
				modules[name] = callback.apply(win, depsModules);
				
			} else {
				modules[name] = callback;
				
			}
		};
	})(this);
}