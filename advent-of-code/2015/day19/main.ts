import { readInputToString } from "@utils/advent-of-code";

const data = await readInputToString(`${import.meta.dir}/data.in`);

let [mappings, input] = data.split("\n\n");

input = input.trim();

function getReplacementMap(mappings: string[]): Map<string, Set<string>> {
	const result = new Map<string, Set<string>>();

	for (const mapping of mappings) {
		const [lhs, rhs] = mapping.split(" => ");
		if (!result.has(lhs)) {
			result.set(lhs, new Set());
		}

		result.get(lhs)?.add(rhs);
	}

	return result;
}

const replacementMap = getReplacementMap(mappings.split("\n"));

function findAllIndices(s: string, target: string): number[] {
	const result = [];
	let i = 0;

	while (i < s.length) {
		const index = s.indexOf(target, i);

		if (index === -1) break;

		result.push(index);
		i = index + target.length;
	}

	return result;
}

function part1() {
	const molecules = new Set<string>();

	// for each key in replacement map, find instances within the string that we can replace
	for (const [target, replacements] of replacementMap.entries()) {
		// find all indices where we have original
		const indices = findAllIndices(input, target);

		for (const index of indices) {
			const start = index;
			const end = index + target.length;

			for (const replacement of replacements) {
				molecules.add(
					`${input.substring(0, start)}${replacement}${input.substring(end)}`,
				);
			}
		}
	}

	return molecules.size;
}

function* generateMolecule(
	current: string,
	target: string,
	replacement: string,
) {
	const pattern = new RegExp(target, "g");

	let o: RegExpExecArray | null;
	// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
	while ((o = pattern.exec(current))) {
		yield current.substring(0, o.index) +
			replacement +
			current.substring(o.index + target.length);
	}
}

function part2() {
	// NOTE: Doing this forwards might not be the optimal way to do this
	// We should probably try going backwards until we get "e"
	// But now that we're going backwards, how do we end up walking towards the solution?
	// Is there a greedy strategy we can use here?
	// Greedy strategy won't work for my input unlike other people

	let current = input;
	let result = 0;

	const mappingArr = mappings
		.split("\n")
		.map((item) => item.split(" => "))
		.sort((a, b) => {
			return b[1].length - a[1].length;
		});

	while (current !== "e") {
		for (const [replacement, target] of mappingArr) {
			for (const nextMolecule of generateMolecule(
				current,
				target,
				replacement,
			)) {
				current = nextMolecule;
				result++;
				break;
			}
		}
	}

	return result;
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
