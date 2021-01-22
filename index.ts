let defined = function(filename: string) {
	if(!defined[filename] || typeof defined[filename] == 'function')
		throw new Error('defined(): \'' + filename + '\' is \'' + defined[filename] + '\'');
	return defined[filename];
} as {
	(_: string): {},
	[_: string]: ((_: unknown) => void) | {},
};

let define = async function(
	env: ['require', 'exports', ...string[]],
	factory: (require: (_: string) => {} | undefined, exports: {}) => void,
) {
	let module = define.amd!;
	for(let module of env.slice(2))
		if(!defined[module])
			await new Promise(function(resolve) {
				defined[module] = resolve;
				load(module);
			});

	let joined = defined[module];
	factory(defined, defined[module] = {});
	if(typeof joined == 'function')
		joined(null);
} as {
	(
		env: ['require', 'exports', ...string[]],
		factory: (require: (_: string) => {} | undefined, exports: {}) => void,
	): void,
	amd?: string,
};

function load(module: string) {
	let script = document.createElement('script');
	script.src = module + '.js';
	define.amd = module;
	document.head.append(script);
}

function index() {
	if(location.search) {
		load(location.search.substring(1).replace(/\.js$/, ''));
		return;
	}

	let file = document.createElement('input');
	file.type = 'file';
	file.accept = 'application/javascript';
	file.oninput = function() {
		location.href += '?' + file.files![0]!.name
	};
	document.body.append(file);
}

if(!globalThis.exports) {
	globalThis.exports = new Proxy({}, {
		defineProperty: function(_target: {}, _property: unknown, _attr: unknown) {
			document.body.innerHTML = 'Please recompile with:'
				+ '<br><code>$ tsc -m umd</code>'
				+ '<br>in order to run this program in your browser!';
			return false;
		},
	});
}
