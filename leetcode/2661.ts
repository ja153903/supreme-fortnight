type Coordinate = { row: number; col: number }

function firstCompleteIndex(arr: number[], mat: number[][]): number {
	// go through each index i in arr starting from index 0 and paint
	// the cell in mat containing the integer arr[i]

	const ROWS = mat.length
	const COLS = mat[0].length

	// the idea here is that we want to keep track of when our hash
	// has enough values for a given row or col
	// For example, if we color (0, 0), then we should add count[row0]++ and count[col0]++

	const counter = new Map<string, number>()
	const positions = new Map<number, Coordinate>()

	for (let row = 0; row < ROWS; row++) {
		for (let col = 0; col < COLS; col++) {
			positions.set(mat[row][col], { row, col })
		}
	}

	for (let i = 0; i < arr.length; i++) {
		// biome-ignore lint/style/noNonNullAssertion: <It should exist dummy>
		const { row, col } = positions.get(arr[i])!

		const downTheCol = `r${row}`
		const acrossTheRow = `c${col}`

		counter.set(acrossTheRow, (counter.get(acrossTheRow) ?? 0) + 1)
		counter.set(downTheCol, (counter.get(downTheCol) ?? 0) + 1)

		if (
			counter.get(acrossTheRow) === ROWS ||
			counter.get(downTheCol) === COLS
		) {
			return i
		}
	}

	return -1
}

export { firstCompleteIndex }
