export function prettyPrintGrid<T>(grid: T[][]) {
	for (const row of grid) {
		console.log(row.join(" "));
	}
}
