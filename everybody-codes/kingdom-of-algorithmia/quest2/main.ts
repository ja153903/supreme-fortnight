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

function buildRunesRegex(runes: string): RegExp {
	const [_, rawRunes] = runes.split(":");
	const asArray = rawRunes.split(",");
	const all = Array.from(
		new Set([
			...asArray,
			...asArray.map((r) => r.split("").reverse().join("")),
		]),
	);

	return new RegExp(`(?=(${all.join("|")}))`, "g");
}

function mergeIntervals(intervals: [number, number][]): [number, number][] {
	intervals.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));

	const mergedIntervals: [number, number][] = [];

	for (const interval of intervals) {
		if (mergedIntervals.length === 0) {
			mergedIntervals.push(interval);
			continue;
		}

		const last = mergedIntervals[mergedIntervals.length - 1];

		if (last[1] > interval[0]) {
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

	const regex = buildRunesRegex(words.trimEnd());

	let result = 0;

	for (const line of paragraph) {
		const matches = line.trim().matchAll(regex);
		const intervals: [number, number][] = [];

		for (const match of matches) {
			const rune = match[1];
			const start = match.index;

			intervals.push([start, start + rune.length - 1]);
		}

		const mergedIntervals = mergeIntervals(intervals);
		console.log(mergedIntervals, line);

		for (const interval of mergedIntervals) {
			result += interval[1] - interval[0] + 1;
		}
	}

	return result;
}

console.log(`Part 2: ${await part2()}`);
