import { format as Format } from 'util';

if(!globalThis.window) {
	let format: typeof Format = require('util').format;
	let getline: () => string | null = require('./rary');

	let globalThat = Object.getPrototypeOf(globalThis);
	globalThat.alert = function(message: {} = '') {
		console.log(message);
	};
	globalThat.confirm = function(message = "Are you sure?", fallback = true, custom = '%s (%s/%s) ') {
		let yes = 'y';
		let no = 'n';
		if(fallback)
			yes = yes.toUpperCase();
		else
			no = no.toUpperCase();
		message = format(custom, message, yes, no);

		while(true) {
			switch(prompt(message, '')) {
			case yes.toLowerCase():
			case yes.toUpperCase():
				return true;

			case no.toLowerCase():
			case no.toUpperCase():
			case null:
				return false;

			case '':
				return fallback;

			default:
				message = 'Please enter exactly \'' + yes + '\' or \'' + no + '\': ';
			}
		}
	};
	globalThat.prompt = function(message = 'Enter text:', delimiter = ' ') {
		process.stdout.write(message + delimiter);

		let line = getline();
		if(line)
			line = line.trim();
		else
			console.log();
		return line;
	};
	globalThis.window = globalThat;
}

export { constructor } from './constructor';
export * as dictionary from './dictionary';

export let window: {
	alert(_?: {}): void,
	confirm(_?: string, fallback?: boolean, custom?: string): boolean,
	prompt(_?: string, delimiter?: string): string | null,
} = {
	alert: globalThis.alert.bind(globalThis),
	confirm: globalThis.confirm.bind(globalThis),
	prompt: globalThis.prompt.bind(globalThis),
};
export let {alert, confirm, prompt} = window;
