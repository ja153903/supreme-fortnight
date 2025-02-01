import { splitStringIntoIntegerArray } from "@lib/algorithms/array"
import { readInputToString } from "@utils/advent-of-code"

const rawData = await readInputToString(`${import.meta.dir}/data.test.in`)

type Mapping = [number, number, number]

function parseSection(section: string): Mapping[] {
	const mappings = section.split("\n")
	mappings.shift()

	return mappings
		.filter((mapping) => mapping.split(" ").length === 3)
		.map((mapping) =>
			mapping.split(" ").map((item) => Number.parseInt(item, 10)),
		) as Mapping[]
}

function parseSeed(seed: string): number[] {
	const parts = seed.split(": ")
	parts.shift()

	const item = parts.shift() ?? null
	if (item === null) {
		throw new Error("Something happened here")
	}

	return splitStringIntoIntegerArray(item)
}

const sections = rawData.split("\n\n").map((section, index) => {
	if (index === 0) {
		return parseSeed(section)
	}
	return parseSection(section)
})

// for each section that are not the seeds
// the tuple contains the following mappings
// destination range start, source range start, range length

const seeds = (sections.shift() ?? []) as number[]
const mappings = sections as Mapping[][]

function evaluateSeed(seed: number): number {
	let current = seed

	for (const mapping of mappings) {
		for (const [destinationStart, sourceStart, range] of mapping) {
			if (sourceStart <= current && current < sourceStart + range) {
				current = destinationStart + current - sourceStart
				break
			}
		}
	}

	return current
}

function part1() {
	let result = Number.POSITIVE_INFINITY

	for (const seed of seeds) {
		result = Math.min(result, evaluateSeed(seed))
	}

	return result
}

function evaluateSeedByRange(range: [number, number]): number {
	let lowestLocation = Number.POSITIVE_INFINITY
	const queue: [[number, number], number][] = [[[...range], 0]]

	while (queue.length > 0) {
		const front = queue.shift()
		if (!front) {
			throw new Error("Why is this empty?")
		}

		const [r, i] = front

		if (i === mappings.length) {
			lowestLocation = Math.min(lowestLocation, r[0])
			continue
		}

		let hasIncludedNewEntries = false

		for (const [destination, source, length] of mappings[i]) {
			if (r[0] >= source + length || r[1] < source) {
				continue
			}

			const entry: [number, number] = [
				Math.max(r[0], source),
				Math.min(r[1], source + length),
			]

			const startDiff = entry[0] - source
			const endDiff = source + length - entry[1]

			const nextEntry: [number, number] = [
				destination + startDiff,
				destination + length - endDiff,
			]

			queue.push([[...nextEntry], i + 1])

			hasIncludedNewEntries = true
		}

		if (!hasIncludedNewEntries) {
			queue.push([r, i + 1])
		}
	}

	return lowestLocation
}

function part2() {
	let result = Number.POSITIVE_INFINITY

	for (let i = 1; i < seeds.length; i += 2) {
		const rangeStart = seeds[i - 1]
		const rangeLength = seeds[i]

		const tuple: [number, number] = [rangeStart, rangeStart + rangeLength]
		result = Math.min(result, evaluateSeedByRange(tuple))
	}

	return result
}

console.log(`Part 1: ${part1()}`)
console.log(`Part 2: ${part2()}`)
