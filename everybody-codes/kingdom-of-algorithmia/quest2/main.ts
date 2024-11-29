import { readInputToArray } from "@utils/advent-of-code";

function parseWords(words: string): string {
	const [_, rawWords] = words.split(":");
	return rawWords.split(",").join("|");
}

async function part1() {
	const lines = await readInputToArray(`${import.meta.dir}/part1.in`);
	let [words, sentence] = lines;
	const runes = parseWords(words.trimEnd());
	sentence = sentence.trimEnd();
	const regex = new RegExp(`(?=(${runes}))`, "g");
	const matches = sentence.matchAll(regex);
	return Array.from(matches).length;
}

console.log(`Part 1: ${await part1()}`);

function mergeIntervals(intervals: [number, number][]): [number, number][] {
	intervals.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));

	const mergedIntervals: [number, number][] = [];

	for (const interval of intervals) {
		if (mergedIntervals.length === 0) {
			mergedIntervals.push(interval);
			continue;
		}

		const last = mergedIntervals[mergedIntervals.length - 1];

		if (last[1] >= interval[0]) {
			mergedIntervals[mergedIntervals.length - 1] = [
				Math.min(last[0], interval[0]),
				Math.max(last[1], interval[1]),
			];
		} else {
			mergedIntervals.push(interval);
		}
	}

	return mergedIntervals;
}

async function part2() {
	const lines = await readInputToArray(`${import.meta.dir}/part2.in`);
	const [words, ...paragraph] = lines;

	let result = 0;

	const [_, rawRunes] = words.split(":");
	const runes = rawRunes.split(",");

	for (const line of paragraph) {
		const intervals: [number, number][] = [];

		for (const rune of runes) {
			const fwdRegex = new RegExp(`(?=(${rune}))`, "g");
			const fwdMatches = line.matchAll(fwdRegex);
			for (const match of fwdMatches) {
				const r = match[1];
				const s = match.index;

				intervals.push([s, s + r.length]);
			}

			const bckRegex = new RegExp(
				`(?=(${rune.split("").reverse().join("")}))`,
				"g",
			);
			const bckMatches = line.matchAll(bckRegex);
			for (const match of bckMatches) {
				const r = match[1];
				const s = match.index;

				intervals.push([s, s + r.length]);
			}
		}

		const mergedIntervals = mergeIntervals(intervals);

		for (const [start, end] of mergedIntervals) {
			result += end - start;
		}
	}

	return result;
}

console.log(`Part 2: ${await part2()}`);
