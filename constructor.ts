export function constructor<T, P extends unknown[], R>(fn: (this: T, ..._: P) => R) {
	return fn as unknown as new(..._: P) => T;
}
