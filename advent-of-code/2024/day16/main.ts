import { PriorityQueue } from "@datastructures-js/priority-queue"
import { readInputToArray } from "@utils/advent-of-code"

const lines = await readInputToArray(`${import.meta.dir}/data.in`)

const MAZE = lines.map((line) => line.split(""))

type Direction = "N" | "S" | "E" | "W"

type QueueNode = {
	dist: number
	direction: Direction
	x: number
	y: number
}

function findStartAndEndPoints(
	maze: string[][],
): [[number, number], [number, number]] {
	let start: [number, number] = [-1, -1]
	let end: [number, number] = [-1, -1]

	for (let y = 0; y < maze.length; y++) {
		for (let x = 0; x < maze[y].length; x++) {
			if (maze[y][x] === "S") {
				start = [x, y]
			}

			if (maze[y][x] === "E") {
				end = [x, y]
			}
		}
	}

	return [start, end]
}

const DIRECTIONS: [number, number, Direction][] = [
	[1, 0, "E"],
	[-1, 0, "W"],
	[0, 1, "S"],
	[0, -1, "N"],
]

function part1() {
	const [start, end] = findStartAndEndPoints(MAZE)
	const queue = new PriorityQueue<QueueNode>((a: QueueNode, b: QueueNode) => {
		return a.dist < b.dist ? -1 : 1
	})

	const visited = new Map<string, number>()

	queue.enqueue({ dist: 0, direction: "E", x: start[0], y: start[1] })

	while (queue.size() > 0) {
		const u = queue.dequeue()
		const visitedKey = `(${u.x}, ${u.y}), ${u.direction}`

		if (u.x === end[0] && u.y === end[1]) {
			return u.dist
		}

		visited.set(visitedKey, u.dist)

		for (const [dx, dy, dd] of DIRECTIONS) {
			const nx = u.x + dx
			const ny = u.y + dy

			const nextVisitedKey = `(${nx}, ${ny}), ${dd}`

			if (
				nx < 0 ||
				ny < 0 ||
				nx >= MAZE[0].length ||
				ny >= MAZE.length ||
				visited.has(nextVisitedKey) ||
				MAZE[ny][nx] === "#"
			) {
				continue
			}

			if (u.direction !== dd) {
				queue.enqueue({ dist: u.dist + 1001, x: nx, y: ny, direction: dd })
			} else {
				queue.enqueue({ dist: u.dist + 1, x: nx, y: ny, direction: dd })
			}
		}
	}
}

function part2() {
	const [start, end] = findStartAndEndPoints(MAZE)
	const queue = new PriorityQueue<QueueNode & { path: Set<string> }>(
		(a: QueueNode, b: QueueNode) => {
			return a.dist < b.dist ? -1 : 1
		},
	)

	const pathsByScore = new Map<number, Set<string>>()
	const visited = new Map<string, number>()

	queue.enqueue({
		dist: 0,
		direction: "E",
		x: start[0],
		y: start[1],
		path: new Set(),
	})

	let lowest = Number.POSITIVE_INFINITY

	while (queue.size() > 0) {
		const u = queue.dequeue()
		const visitedKey = `(${u.x}, ${u.y}), ${u.direction}`

		if (u.x === end[0] && u.y === end[1]) {
			lowest = u.dist
			pathsByScore.set(
				u.dist,
				(pathsByScore.get(u.dist) ?? new Set()).union(u.path),
			)
		}

		visited.set(visitedKey, u.dist)

		for (const [dx, dy, dd] of DIRECTIONS) {
			const nx = u.x + dx
			const ny = u.y + dy

			const nextVisitedKey = `(${nx}, ${ny}), ${dd}`

			if (
				nx < 0 ||
				ny < 0 ||
				nx >= MAZE[0].length ||
				ny >= MAZE.length ||
				visited.has(nextVisitedKey) ||
				MAZE[ny][nx] === "#"
			) {
				continue
			}

			const uPathCopy = new Set(u.path)
			uPathCopy.add(`${nx},${ny}`)

			if (u.direction !== dd) {
				queue.enqueue({
					dist: u.dist + 1001,
					x: nx,
					y: ny,
					direction: dd,
					path: uPathCopy,
				})
			} else {
				queue.enqueue({
					dist: u.dist + 1,
					x: nx,
					y: ny,
					direction: dd,
					path: uPathCopy,
				})
			}
		}
	}

	return pathsByScore.get(lowest)?.size ?? Number.POSITIVE_INFINITY
}

console.log(`Part 1: ${part1()}`)
console.log(`Part 2: ${part2()}`)
