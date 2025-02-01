function createHelloWorld() {
	// biome-ignore lint/complexity/useArrowFunction: <its a leetcode problem>
	// biome-ignore lint/suspicious/noExplicitAny: <its a stupid exercise>
	return function (..._args: any): string {
		return "Hello World"
	}
}

export { createHelloWorld }
