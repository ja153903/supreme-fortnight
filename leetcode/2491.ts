import { sum } from "@lib/algorithms/array";
import { Counter } from "@lib/data-structures/counter";

function dividePlayers(skill: number[]): number {
	const expectedSkill = Math.floor(
		(2 * sum<number>(skill, (a, b) => a + b)) / skill.length,
	);
	let chemistry = 0;
	const counter = new Counter<number>(skill);

	for (const [key, count] of counter.entries()) {
		if (count !== counter.get(expectedSkill - key)) {
			return -1;
		}

		chemistry += count * key * (expectedSkill - key);
	}

	return Math.floor(chemistry / 2);
}

export { dividePlayers };
