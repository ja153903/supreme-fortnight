import { readInputToString } from "@utils/advent-of-code"

const data = await readInputToString(`${import.meta.dir}/data.in`)

const matches = data.matchAll(/mul\((?<l>\d+),(?<r>\d+)\)/g)

function part1() {
	let res = 0
	for (const { groups } of matches) {
		if (groups?.l && groups?.r) {
			res += Number.parseInt(groups.l) * Number.parseInt(groups.r)
		}
	}

	return res
}

const matches2 = data.matchAll(
	/mul\((?<l>\d+),(?<r>\d+)\)|(?<do>do)\(\)|(?<dont>don't)\(\)/g,
)

function part2() {
	let res = 0
	let shouldCalc = true

	for (const { groups } of matches2) {
		if (groups?.do) {
			shouldCalc = true
		}

		if (groups?.dont) {
			shouldCalc = false
		}

		if (shouldCalc && groups?.l && groups?.r) {
			res += Number.parseInt(groups.l) * Number.parseInt(groups.r)
		}
	}

	return res
}

console.log(`Part 1: ${part1()}`)
console.log(`Part 2: ${part2()}`)
