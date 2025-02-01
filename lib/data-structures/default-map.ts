/**
 * Create a TypeScript implementation of Python's defaultdict.
 */
export class DefaultMap<V> extends Map<string | number, V> {
	private _default: V

	constructor(_default: V) {
		super()
		this._default = _default
	}

	override get(key: string): V {
		if (!this.has(key)) {
			this.set(key, this._default)
		}

		return super.get(key) ?? this._default
	}
}
