import { readInputToString } from "@utils/advent-of-code"

const data = await readInputToString(`${import.meta.dir}/data.in`)

function part1() {
	const visited = new Set<string>()
	let x = 0
	let y = 0

	visited.add(`${x},${y}`)

	for (let i = 0; i < data.length; i++) {
		if (data[i] === "^") {
			y -= 1
		}
		if (data[i] === "v") {
			y += 1
		}
		if (data[i] === "<") {
			x -= 1
		}
		if (data[i] === ">") {
			x += 1
		}
		visited.add(`${x},${y}`)
	}

	return visited.size
}

function part2() {
	const visited = new Set<string>()
	let x = 0
	let y = 0
	let rx = 0
	let ry = 0

	visited.add(`${x},${y}`)

	for (let i = 0; i < data.length; i++) {
		if (data[i] === "^") {
			if (i % 2 === 0) {
				ry -= 1
			} else {
				y -= 1
			}
		}
		if (data[i] === "v") {
			if (i % 2 === 0) {
				ry += 1
			} else {
				y += 1
			}
		}
		if (data[i] === "<") {
			if (i % 2 === 0) {
				rx -= 1
			} else {
				x -= 1
			}
		}
		if (data[i] === ">") {
			if (i % 2 === 0) {
				rx += 1
			} else {
				x += 1
			}
		}

		visited.add(`${x},${y}`)
		visited.add(`${rx},${ry}`)
	}

	return visited.size
}

console.log(`Part 1: ${part1()}`)
console.log(`Part 2: ${part2()}`)
