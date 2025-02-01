import { readInputToArray } from "@utils/advent-of-code"

const lines = await readInputToArray(`${import.meta.dir}/data.in`)
const data = lines.map((line) => {
	return line.split("x").map((x) => Number.parseInt(x))
})

function part1() {
	return data.reduce(
		(acc, [l, w, h]) =>
			acc + 2 * l * w + 2 * l * h + 2 * w * h + Math.min(l * w, l * h, w * h),
		0,
	)
}

function part2() {
	return data.reduce(
		(acc, [l, w, h]) =>
			acc + l * w * h + Math.min(2 * l + 2 * w, 2 * l + 2 * h, 2 * w + 2 * h),
		0,
	)
}

console.log(`Part 1: ${part1()}`)
console.log(`Part 2: ${part2()}`)
