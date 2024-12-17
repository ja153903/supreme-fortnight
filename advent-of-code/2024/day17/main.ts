import { readInputToString } from "@utils/advent-of-code";

const data = await readInputToString(`${import.meta.dir}/data.in`);

function parseInput() {
	const [rawRegisters, rawProgram] = data.split("\n\n");

	const registers = rawRegisters
		.split("\n")
		.map((register) => {
			const [_key, value] = register.split(": ");
			const [_, key] = _key.split(" ");
			return { key, value: Number.parseInt(value) };
		})
		.reduce(
			(acc, item) => {
				acc[item.key] = item.value;
				return acc;
			},
			{} as Record<string, number>,
		);

	const [_, _program] = rawProgram.split(": ");

	const program = _program.split(",").map((item) => Number.parseInt(item));

	return {
		registers,
		program,
	};
}

function getComboOperand(registers: Record<string, number>, operand: number) {
	if (0 <= operand && operand <= 3) {
		return operand;
	}

	if (operand === 4) {
		return registers.A;
	}

	if (operand === 5) {
		return registers.B;
	}

	if (operand === 6) {
		return registers.C;
	}

	throw new Error("Not a valid program if 7 was passed as an operand");
}

function evalOpcode(
	registers: Record<string, number>,
	operand: number,
	opcode: number,
): { jumpDestination: number | null; output: number | null } {
	let mutableInstructionPointer = null;
	let mutableOutput = null;

	switch (opcode) {
		case 0: {
			registers.A = Math.trunc(
				registers.A / 2 ** getComboOperand(registers, operand),
			);
			break;
		}
		case 1: {
			registers.B ^= operand;
			break;
		}
		case 2: {
			registers.B = getComboOperand(registers, operand) % 8;
			break;
		}
		case 3: {
			if (registers.A === 0) {
				break;
			}
			mutableInstructionPointer = operand;
			break;
		}
		case 4: {
			registers.B ^= registers.C;
			break;
		}
		case 5: {
			mutableOutput = getComboOperand(registers, operand) % 8;
			break;
		}
		case 6: {
			registers.B = Math.trunc(
				registers.A / 2 ** getComboOperand(registers, operand),
			);
			break;
		}
		case 7: {
			registers.C = Math.trunc(
				registers.A / 2 ** getComboOperand(registers, operand),
			);
			break;
		}
	}

	return {
		jumpDestination: mutableInstructionPointer,
		output: mutableOutput,
	};
}

function getProgramOutput(
	registers: Record<string, number>,
	program: number[],
): string {
	const result: number[] = [];
	let instructionPointer = 0;

	while (instructionPointer < program.length - 1) {
		const opcode = program[instructionPointer];
		const operand = program[instructionPointer + 1];

		const { jumpDestination, output } = evalOpcode(registers, operand, opcode);

		if (jumpDestination !== null) {
			instructionPointer = jumpDestination;
			continue;
		}

		if (output !== null) {
			result.push(output);
		}

		instructionPointer += 2;
	}

	return result.map((item) => item.toString()).join(",");
}

function part1() {
	const { registers, program } = parseInput();

	return getProgramOutput(registers, program);
}

function part2() {
	// TODO: I don't have the intuition for part 2. GGs AoC 2024
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
