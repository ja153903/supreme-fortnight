import { readInputToString } from "@utils/advent-of-code"

type Creature = "A" | "B" | "C" | "D"

const CREATURE_KV: Record<Creature, number> = {
	A: 0,
	B: 1,
	C: 3,
	D: 5,
}

async function part1() {
	const input = await readInputToString(`${import.meta.dir}/part1.in`)
	return input
		.split("")
		.map((creature) => CREATURE_KV?.[creature as Creature] ?? 0)
		.reduce((a: number, b: number) => a + b, 0)
}

console.log(`Part 1: ${await part1()}`)

async function part2() {
	// NOTE: Trimming end here to make sure that we don't take the newline character
	//       into consideration
	const input = (
		await readInputToString(`${import.meta.dir}/part2.in`)
	).trimEnd()
	let result = 0

	for (let i = 0; i < input.length - 1; i += 2) {
		const a = CREATURE_KV[input[i] as Creature] ?? null
		const b = CREATURE_KV[input[i + 1] as Creature] ?? null

		if (a === null || b === null) {
			result += a === null ? b : a
		} else {
			result += a + b + 2
		}
	}

	return result
}

console.log(`Part 2: ${await part2()}`)

async function part3() {
	const input = (
		await readInputToString(`${import.meta.dir}/part3.in`)
	).trimEnd()
	let result = 0

	for (let i = 0; i < input.length - 2; i += 3) {
		const a = CREATURE_KV[input[i] as Creature] ?? null
		const b = CREATURE_KV[input[i + 1] as Creature] ?? null
		const c = CREATURE_KV[input[i + 2] as Creature] ?? null

		if (
			(a === null && b === null && c !== null) ||
			(a !== null && b === null && c === null) ||
			(a === null && b !== null && c === null)
		) {
			result += a !== null ? a : b !== null ? b : c
		} else if (
			(a === null && b !== null && c !== null) ||
			(a !== null && b === null && c !== null) ||
			(a !== null && b !== null && c === null)
		) {
			result +=
				a !== null && b !== null
					? a + b + 2
					: a !== null && c !== null
						? a + c + 2
						: b + c + 2
		} else if (a !== null && b !== null && c !== null) {
			result += a + b + c + 6
		}
	}

	return result
}

console.log(`Part 3: ${await part3()}`)
