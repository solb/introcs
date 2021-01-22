export type Map<T> = {[_: string]: T};

export type Set = Map<true>;

export let Map = function<T>(this: Map<T>, iterable?: Iterable<[string, T]>) {
	if(iterable)
		for(let each of iterable)
			this[each[0]] = each[1];
	return new Proxy(this, dictionary);
} as Function as new<T>(_?: Iterable<[string, T]>) => Map<T>;

export let Set: new() => Set = Map;

let dictionary = {
	get: function<T>(target: Map<T>, property: string, _: Map<T>) {
		if(Object.hasOwnProperty.call(target, property))
			return target[property];
		else
			return undefined;
	},
	has: function<T>(target: Map<T>, property: string) {
		return Object.hasOwnProperty.call(target, property);
	},
};
