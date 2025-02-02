function map(arr: number[], fn: (n: number, i: number) => number): number[] {
	const copy = []

	for (let i = 0; i < arr.length; i++) {
		copy.push(fn(arr[i], i))
	}

	return copy
}

export { map }
