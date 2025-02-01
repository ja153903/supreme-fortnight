function createCounter(n: number): () => number {
	let current = n
	// biome-ignore lint/complexity/useArrowFunction: <explanation>
	return function () {
		return current++
	}
}

export { createCounter }
