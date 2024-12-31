import { readInputToArray } from "@utils/advent-of-code";

const lines = await readInputToArray(`${import.meta.dir}/data.in`);

type Instruction = {
	operation: "RSHIFT" | "LSHIFT" | "AND" | "OR" | "NOT" | "ASSIGN";
	lhs: string;
	rhs?: string;
	register: string;
};

const MATCH_REGULAR_OPERATION_RE =
	/(\w+) (RSHIFT|LSHIFT|AND|OR) (\w+) -> (\w+)/g;
const MATCH_NOT_OPERATION_RE = /NOT (\w+) -> (\w+)/g;
const MATCH_ASSIGN_OPERATION_RE = /(\w+) -> (\w+)/g;

function parseInstruction(line: string): Instruction {
	if (line.match(MATCH_REGULAR_OPERATION_RE)) {
		const [lhs, operation, rhs, register] = line
			.split(MATCH_REGULAR_OPERATION_RE)
			.filter(Boolean);
		return {
			operation: operation as Instruction["operation"],
			lhs,
			rhs,
			register,
		};
	}

	if (line.match(MATCH_NOT_OPERATION_RE)) {
		const [lhs, register] = line.split(MATCH_NOT_OPERATION_RE).filter(Boolean);
		return {
			operation: "NOT",
			lhs,
			register,
		};
	}

	if (line.match(MATCH_ASSIGN_OPERATION_RE)) {
		const [lhs, register] = line
			.split(MATCH_ASSIGN_OPERATION_RE)
			.filter(Boolean);
		return {
			operation: "ASSIGN",
			lhs,
			register,
		};
	}

	throw new Error("Invalid instruction being parsed");
}

const instructions = lines.map((line) => parseInstruction(line));

function part1() {
	const dd = new Map<string, number>();

	const queue = structuredClone(instructions);

	while (queue.length > 0) {
		const front = queue.shift();
		if (!front) {
			throw new Error("Something went wrong with our queue");
		}

		const { operation, lhs, rhs, register } = front;

		switch (operation) {
			case "ASSIGN": {
				// check if the lhs is a number
				const asNumber = Number.parseInt(lhs);
				if (Number.isNaN(asNumber)) {
					const existingValue = dd.get(lhs);
					if (existingValue == null) {
						queue.push(front);
					} else {
						dd.set(register, existingValue);
					}
				} else {
					dd.set(register, asNumber);
				}

				break;
			}
			case "NOT": {
				// check if the lhs is a number
				const asNumber = Number.parseInt(lhs);
				if (Number.isNaN(asNumber)) {
					const existingValue = dd.get(lhs);
					if (existingValue == null) {
						queue.push(front);
					} else {
						dd.set(register, ~existingValue);
					}
				} else {
					dd.set(register, ~asNumber);
				}

				break;
			}
			case "AND": {
				let lhsAsNumber = Number.parseInt(lhs);
				if (Number.isNaN(lhsAsNumber)) {
					const existingValue = dd.get(lhs);
					if (existingValue == null) {
						queue.push(front);
						break;
					}

					lhsAsNumber = existingValue;
				}

				// biome-ignore lint/style/noNonNullAssertion: <explanation>
				let rhsAsNumber = Number.parseInt(rhs!);
				if (Number.isNaN(rhsAsNumber)) {
					// biome-ignore lint/style/noNonNullAssertion: <explanation>
					const existingValue = dd.get(rhs!);
					if (existingValue == null) {
						queue.push(front);
						break;
					}

					rhsAsNumber = existingValue;
				}

				dd.set(register, lhsAsNumber & rhsAsNumber);

				break;
			}
			case "OR": {
				let lhsAsNumber = Number.parseInt(lhs);
				if (Number.isNaN(lhsAsNumber)) {
					const existingValue = dd.get(lhs);
					if (existingValue == null) {
						queue.push(front);
						break;
					}

					lhsAsNumber = existingValue;
				}

				// biome-ignore lint/style/noNonNullAssertion: <explanation>
				let rhsAsNumber = Number.parseInt(rhs!);
				if (Number.isNaN(rhsAsNumber)) {
					// biome-ignore lint/style/noNonNullAssertion: <explanation>
					const existingValue = dd.get(rhs!);
					if (existingValue == null) {
						queue.push(front);
						break;
					}

					rhsAsNumber = existingValue;
				}

				dd.set(register, lhsAsNumber | rhsAsNumber);

				break;
			}
			case "RSHIFT": {
				let lhsAsNumber = Number.parseInt(lhs);
				if (Number.isNaN(lhsAsNumber)) {
					const existingValue = dd.get(lhs);
					if (existingValue == null) {
						queue.push(front);
						break;
					}

					lhsAsNumber = existingValue;
				}

				// biome-ignore lint/style/noNonNullAssertion: <explanation>
				let rhsAsNumber = Number.parseInt(rhs!);
				if (Number.isNaN(rhsAsNumber)) {
					// biome-ignore lint/style/noNonNullAssertion: <explanation>
					const existingValue = dd.get(rhs!);
					if (existingValue == null) {
						queue.push(front);
						break;
					}

					rhsAsNumber = existingValue;
				}

				dd.set(register, lhsAsNumber >> rhsAsNumber);

				break;
			}
			case "LSHIFT": {
				let lhsAsNumber = Number.parseInt(lhs);
				if (Number.isNaN(lhsAsNumber)) {
					const existingValue = dd.get(lhs);
					if (existingValue == null) {
						queue.push(front);
						break;
					}

					lhsAsNumber = existingValue;
				}

				// biome-ignore lint/style/noNonNullAssertion: <explanation>
				let rhsAsNumber = Number.parseInt(rhs!);
				if (Number.isNaN(rhsAsNumber)) {
					// biome-ignore lint/style/noNonNullAssertion: <explanation>
					const existingValue = dd.get(rhs!);
					if (existingValue == null) {
						queue.push(front);
						break;
					}

					rhsAsNumber = existingValue;
				}

				dd.set(register, lhsAsNumber << rhsAsNumber);
				break;
			}
		}
	}

	return dd.get("a");
}

function part2() {
	const dd = new Map<string, number>();

	const indexToModify = instructions.findIndex(
		({ register }) => register === "b",
	);

	const queue = structuredClone(instructions);

	queue[indexToModify] = {
		...queue[indexToModify],
		lhs: "46065",
	};

	while (queue.length > 0) {
		const front = queue.shift();
		if (!front) {
			throw new Error("Something went wrong with our queue");
		}

		const { operation, lhs, rhs, register } = front;

		// TODO: Finish solving this problem
		switch (operation) {
			case "ASSIGN": {
				// check if the lhs is a number
				const asNumber = Number.parseInt(lhs);
				if (Number.isNaN(asNumber)) {
					const existingValue = dd.get(lhs);
					if (existingValue == null) {
						queue.push(front);
					} else {
						dd.set(register, existingValue);
					}
				} else {
					dd.set(register, asNumber);
				}

				break;
			}
			case "NOT": {
				// check if the lhs is a number
				const asNumber = Number.parseInt(lhs);
				if (Number.isNaN(asNumber)) {
					const existingValue = dd.get(lhs);
					if (existingValue == null) {
						queue.push(front);
					} else {
						dd.set(register, ~existingValue);
					}
				} else {
					dd.set(register, ~asNumber);
				}

				break;
			}
			case "AND": {
				let lhsAsNumber = Number.parseInt(lhs);
				if (Number.isNaN(lhsAsNumber)) {
					const existingValue = dd.get(lhs);
					if (existingValue == null) {
						queue.push(front);
						break;
					}

					lhsAsNumber = existingValue;
				}

				// biome-ignore lint/style/noNonNullAssertion: <explanation>
				let rhsAsNumber = Number.parseInt(rhs!);
				if (Number.isNaN(rhsAsNumber)) {
					// biome-ignore lint/style/noNonNullAssertion: <explanation>
					const existingValue = dd.get(rhs!);
					if (existingValue == null) {
						queue.push(front);
						break;
					}

					rhsAsNumber = existingValue;
				}

				dd.set(register, lhsAsNumber & rhsAsNumber);

				break;
			}
			case "OR": {
				let lhsAsNumber = Number.parseInt(lhs);
				if (Number.isNaN(lhsAsNumber)) {
					const existingValue = dd.get(lhs);
					if (existingValue == null) {
						queue.push(front);
						break;
					}

					lhsAsNumber = existingValue;
				}

				// biome-ignore lint/style/noNonNullAssertion: <explanation>
				let rhsAsNumber = Number.parseInt(rhs!);
				if (Number.isNaN(rhsAsNumber)) {
					// biome-ignore lint/style/noNonNullAssertion: <explanation>
					const existingValue = dd.get(rhs!);
					if (existingValue == null) {
						queue.push(front);
						break;
					}

					rhsAsNumber = existingValue;
				}

				dd.set(register, lhsAsNumber | rhsAsNumber);

				break;
			}
			case "RSHIFT": {
				let lhsAsNumber = Number.parseInt(lhs);
				if (Number.isNaN(lhsAsNumber)) {
					const existingValue = dd.get(lhs);
					if (existingValue == null) {
						queue.push(front);
						break;
					}

					lhsAsNumber = existingValue;
				}

				// biome-ignore lint/style/noNonNullAssertion: <explanation>
				let rhsAsNumber = Number.parseInt(rhs!);
				if (Number.isNaN(rhsAsNumber)) {
					// biome-ignore lint/style/noNonNullAssertion: <explanation>
					const existingValue = dd.get(rhs!);
					if (existingValue == null) {
						queue.push(front);
						break;
					}

					rhsAsNumber = existingValue;
				}

				dd.set(register, lhsAsNumber >> rhsAsNumber);

				break;
			}
			case "LSHIFT": {
				let lhsAsNumber = Number.parseInt(lhs);
				if (Number.isNaN(lhsAsNumber)) {
					const existingValue = dd.get(lhs);
					if (existingValue == null) {
						queue.push(front);
						break;
					}

					lhsAsNumber = existingValue;
				}

				// biome-ignore lint/style/noNonNullAssertion: <explanation>
				let rhsAsNumber = Number.parseInt(rhs!);
				if (Number.isNaN(rhsAsNumber)) {
					// biome-ignore lint/style/noNonNullAssertion: <explanation>
					const existingValue = dd.get(rhs!);
					if (existingValue == null) {
						queue.push(front);
						break;
					}

					rhsAsNumber = existingValue;
				}

				dd.set(register, lhsAsNumber << rhsAsNumber);
				break;
			}
		}
	}

	return dd.get("a");
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
