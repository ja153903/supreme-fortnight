import { PriorityQueue } from "@datastructures-js/priority-queue";

type _isWithinBoundsParams = {
	rows: number;
	cols: number;
	row: number;
	col: number;
};
function isWithinBounds(params: _isWithinBoundsParams) {
	return (
		params.row >= 0 &&
		params.row < params.rows &&
		params.col >= 0 &&
		params.col < params.cols
	);
}

const DIR4: [number, number][] = [
	[0, 1],
	[0, -1],
	[1, 0],
	[-1, 0],
];

type _ShortestPathGridQueueNode = {
	dist: number;
	row: number;
	col: number;
	_rawValue: number;
};

/**
 * `findShortestPathOnGrid` is a shortest path algorithm implementation
 * on a 2d grid implemented with Dijkstra's.
 */
export function findShortestPathOnGrid(
	cmp: (a: _ShortestPathGridQueueNode, b: _ShortestPathGridQueueNode) => number,
	grid: number[][],
	start: [number, number],
) {
	const distances = new Map<string, number>();

	const rows = grid.length;
	const cols = grid[0].length;

	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			distances.set(`${row},${col}`, Number.POSITIVE_INFINITY);
		}
	}

	// Set the start distance to 0
	distances.set(`${start[0]},${start[1]}`, 0);

	const queue = new PriorityQueue(cmp);

	queue.push({
		dist: 0,
		row: start[0],
		col: start[1],
		_rawValue: grid[start[0]][start[1]],
	});

	while (!queue.isEmpty()) {
		const u = queue.dequeue();

		for (const [dr, dc] of DIR4) {
			const nr = u.row + dr;
			const nc = u.col + dc;
			if (isWithinBounds({ rows, cols, row: nr, col: nc })) {
				const alt = (distances.get(`${u.row},${u.col}`) ?? 0) + grid[nr][nc];
				if (alt < (distances.get(`${nr},${nc}`) ?? Number.POSITIVE_INFINITY)) {
					distances.set(`${nr},${nc}`, alt);
					queue.push({ dist: alt, row: nr, col: nc, _rawValue: grid[nr][nc] });
				}
			}
		}
	}

	return distances;
}
