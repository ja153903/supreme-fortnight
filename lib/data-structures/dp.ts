export function createMemoTable<T>(
	rows: number,
	cols: number,
	defaultValue: T,
): T[][] {
	const matrix: T[][] = []

	for (let i = 0; i < rows; i++) {
		matrix.push([])
		for (let j = 0; j < cols; j++) {
			matrix[i].push(defaultValue)
		}
	}

	return matrix
}
