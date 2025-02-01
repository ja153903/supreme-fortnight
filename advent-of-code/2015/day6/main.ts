import { readInputToArray } from "@utils/advent-of-code"

const lines = await readInputToArray(`${import.meta.dir}/data.in`)

type Coordinate = { x: number; y: number }
type Instruction = {
	command: "TOGGLE" | "TURN_OFF" | "TURN_ON"
	start: Coordinate
	end: Coordinate
}

function getCommandFromStr(command: string): Instruction["command"] {
	switch (command) {
		case "turn on":
			return "TURN_ON"
		case "turn off":
			return "TURN_OFF"
		case "toggle":
			return "TOGGLE"
		default:
			throw new Error(`Invalid command: ${command}`)
	}
}

function getInstruction(line: string): Instruction {
	const splits = line
		.split(/(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/g)
		.filter(Boolean)

	const [command, startX, startY, endX, endY] = splits

	return {
		command: getCommandFromStr(command),
		start: { x: Number.parseInt(startX), y: Number.parseInt(startY) },
		end: { x: Number.parseInt(endX), y: Number.parseInt(endY) },
	}
}

const instructions = lines.map((line) => getInstruction(line))

function part1() {
	const GRID = []
	for (let i = 0; i < 1000; i++) {
		GRID.push(new Array(1000).fill(0))
	}

	for (const { command, start, end } of instructions) {
		switch (command) {
			case "TURN_ON":
				for (let y = start.y; y <= end.y; y++) {
					for (let x = start.x; x <= end.x; x++) {
						GRID[y][x] = 1
					}
				}
				break
			case "TURN_OFF":
				for (let y = start.y; y <= end.y; y++) {
					for (let x = start.x; x <= end.x; x++) {
						GRID[y][x] = 0
					}
				}
				break
			case "TOGGLE":
				for (let y = start.y; y <= end.y; y++) {
					for (let x = start.x; x <= end.x; x++) {
						GRID[y][x] ^= 1
					}
				}
				break
		}
	}

	let result = 0

	for (let y = 0; y < 1000; y++) {
		for (let x = 0; x < 1000; x++) {
			if (GRID[y][x] === 1) {
				result++
			}
		}
	}

	return result
}

function part2() {
	const GRID = []
	for (let i = 0; i < 1000; i++) {
		GRID.push(new Array(1000).fill(0))
	}

	for (const { command, start, end } of instructions) {
		switch (command) {
			case "TURN_ON":
				for (let y = start.y; y <= end.y; y++) {
					for (let x = start.x; x <= end.x; x++) {
						GRID[y][x]++
					}
				}
				break
			case "TURN_OFF":
				for (let y = start.y; y <= end.y; y++) {
					for (let x = start.x; x <= end.x; x++) {
						GRID[y][x] = Math.max(0, GRID[y][x] - 1)
					}
				}
				break
			case "TOGGLE":
				for (let y = start.y; y <= end.y; y++) {
					for (let x = start.x; x <= end.x; x++) {
						GRID[y][x] += 2
					}
				}
				break
		}
	}

	let result = 0

	for (let y = 0; y < 1000; y++) {
		for (let x = 0; x < 1000; x++) {
			result += GRID[y][x]
		}
	}

	return result
}

console.log(`Part 1: ${part1()}`)
console.log(`Part 2: ${part2()}`)
