// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type Fn = (n: number, i: number) => any

function filter(arr: number[], fn: Fn): number[] {
	const copy = []

	for (let i = 0; i < arr.length; i++) {
		if (fn(arr[i], i)) {
			copy.push(arr[i])
		}
	}

	return copy
}

export { filter }
