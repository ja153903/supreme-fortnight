/**
 * `TODO` is an error that we'll throw whenever
 * the implementation is not worried yet
 */
export class TODO extends Error {
	constructor(message: string) {
		super(message)
		this.name = "TODO"
	}
}
