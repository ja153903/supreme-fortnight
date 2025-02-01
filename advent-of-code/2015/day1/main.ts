import { readInputToString } from "@utils/advent-of-code"

const data = await readInputToString(`${import.meta.dir}/data.in`)

function part1() {
	let res = 0

	for (let i = 0; i < data.length; i++) {
		if (data[i] === "(") {
			res++
		}
		if (data[i] === ")") {
			res--
		}
	}

	return res
}

function part2() {
	let level = 0

	for (let i = 0; i < data.length; i++) {
		if (data[i] === "(") {
			level++
		}
		if (data[i] === ")") {
			level--
		}

		if (level < 0) {
			return i + 1
		}
	}

	throw new Error("Santa never enters the basement")
}

console.log(`Part 1: ${part1()}`)
console.log(`Part 2: ${part2()}`)
