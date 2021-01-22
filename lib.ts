if(!globalThis.window) {
	let globalThat = Object.getPrototypeOf(globalThis);
	globalThat.alert = function(message: {} = '') {
		console.log(message);
	};
	globalThis.window = globalThat;
}

export let window: {
	alert(_?: {}): void,
} = {
	alert: globalThis.alert.bind(globalThis),
};
export let {alert} = window;
