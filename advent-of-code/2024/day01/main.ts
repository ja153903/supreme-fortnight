import { Counter } from "@lib/data-structures/counter";
import { readInputToArray } from "@utils/advent-of-code";

const lines = await readInputToArray(`${import.meta.dir}/data.in`);

const lv: number[] = [];
const rv: number[] = [];

for (const line of lines) {
	const [left, right] = line.split(/\s+/g);
	lv.push(Number.parseInt(left, 10));
	rv.push(Number.parseInt(right, 10));
}

lv.sort((a, b) => a - b);
rv.sort((a, b) => a - b);

function part1() {
	let res = 0;

	for (let i = 0; i < lv.length; i++) {
		res += Math.abs(lv[i] - rv[i]);
	}

	return res;
}

function part2() {
	const rvCounter = new Counter(rv);

	let res = 0;

	for (const item of lv) {
		res += (rvCounter.get(item) ?? 0) * item;
	}

	return res;
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
