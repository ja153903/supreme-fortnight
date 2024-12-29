export async function readInputToArray(filepath: string): Promise<string[]> {
	const file = Bun.file(filepath);
	const data = await file.text();
	return data.split("\n").filter(Boolean);
}

export async function readInputToString(filepath: string): Promise<string> {
	const file = Bun.file(filepath);
	return await file.text();
}

export const DIR4 = [
	[1, 0],
	[-1, 0],
	[0, 1],
	[0, -1],
];

/**
 * `inRange` checks whether a given coordinate is in bounds
 * for an AOC grid problem
 */
export function inRange(
	rows: number,
	cols: number,
	row: number,
	col: number,
): boolean {
	return row >= 0 && row < rows && col >= 0 && col < cols;
}
