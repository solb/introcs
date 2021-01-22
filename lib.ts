if(!globalThis.window) {
	let getline: () => string | null = require('./rary');

	let globalThat = Object.getPrototypeOf(globalThis);
	globalThat.alert = function(message: {} = '') {
		console.log(message);
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

export let window: {
	alert(_?: {}): void,
	prompt(_?: string, delimiter?: string): string | null,
} = {
	alert: globalThis.alert.bind(globalThis),
	prompt: globalThis.prompt.bind(globalThis),
};
export let {alert, prompt} = window;
