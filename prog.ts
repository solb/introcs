import { confirm, dictionary } from './lib';

let seen = new dictionary.Set();
do {
	let name = prompt('What is your name?');
	let greeting = 'Hello ' + name + '!';
	if(name) {
		if(name in seen)
			greeting += ' I\'ve seen you before.';
		else
			seen[name] = true;
	}
	alert(greeting);
} while(confirm('Again?', false));
