import { readInputToString } from "@utils/advent-of-code";

const data = await readInputToString(`${import.meta.dir}/data.in`);

type Instruction = "^" | "<" | "v" | ">";

const [_grid, _instructions] = data.split("\n\n");

const grid = _grid.split("\n").map((line) => line.split(""));
const instructions = _instructions
	.split("\n")
	.join("")
	.split("") as Instruction[];

function findStartingPosition(grid: string[][]): [number, number] {
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			if (grid[i][j] === "@") {
				return [i, j];
			}
		}
	}

	throw new Error("For some reason we could not find the @ sign");
}

function getInstructionDelta(instruction: Instruction): [number, number] {
	switch (instruction) {
		case "^":
			return [-1, 0];
		case "v":
			return [1, 0];
		case "<":
			return [0, -1];
		case ">":
			return [0, 1];
	}
}

const inBounds = (grid: string[][], row: number, col: number) =>
	0 <= row && row < grid.length && 0 <= col && col < grid[0].length;

function evaluateInstruction(
	grid: string[][],
	row: number,
	col: number,
	instruction: Instruction,
): [number, number] | null {
	const [dr, dc] = getInstructionDelta(instruction);

	const nr = row + dr;
	const nc = col + dc;

	if (!inBounds(grid, nr, nc)) {
		return null;
	}

	if (grid[nr][nc] === ".") {
		[grid[nr][nc], grid[row][col]] = [grid[row][col], grid[nr][nc]];
		return [row, col];
	}

	if (grid[nr][nc] === "O") {
		const bubbledUp = evaluateInstruction(grid, nr, nc, instruction);
		if (bubbledUp) {
			const [fr, fc] = bubbledUp;
			[grid[row][col], grid[fr][fc]] = [grid[fr][fc], grid[row][col]];
			return [row, col];
		}
	}

	return null;
}

function part1() {
	for (const instruction of instructions) {
		const [r, c] = findStartingPosition(grid);
		evaluateInstruction(grid, r, c, instruction);
	}

	let res = 0;

	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			if (grid[i][j] === "O") {
				res += 100 * i + j;
			}
		}
	}

	return res;
}

const grid2 = _grid.split("\n").map((line) => {
	return line
		.split("")
		.map((ch) => {
			switch (ch) {
				case "#":
					return "##";
				case "O":
					return "[]";
				case "@":
					return "@.";
				case ".":
					return "..";
				default:
					return "";
			}
		})
		.flatMap((ch) => ch.split(""));
});

function checkAllPathsAreClearForVerticalMove(
	grid: string[][],
	row: number,
	col: number,
	instruction: Instruction,
): boolean {
	const [dr, dc] = getInstructionDelta(instruction);

	const nr = row + dr;
	const nc = col + dc;

	if (!inBounds(grid, nr, nc) || grid[nr][nc] === "#") {
		return false;
	}

	if (grid[nr][nc] === ".") {
		return true;
	}

	// Below here deals with logic related to instructions going up or down
	const [or, oc] = grid[nr][nc] === "]" ? [nr, nc - 1] : [nr, nc + 1];

	return (
		checkAllPathsAreClearForVerticalMove(grid, or, oc, instruction) &&
		checkAllPathsAreClearForVerticalMove(grid, nr, nc, instruction)
	);
}

function innerEvaluationWithExpandedGrid(
	grid: string[][],
	row: number,
	col: number,
	instruction: Instruction,
): [number, number] | null {
	const [dr, dc] = getInstructionDelta(instruction);

	const nr = row + dr;
	const nc = col + dc;

	if (!inBounds(grid, nr, nc)) {
		return null;
	}

	if (grid[nr][nc] === ".") {
		[grid[nr][nc], grid[row][col]] = [grid[row][col], grid[nr][nc]];
		return [row, col];
	}

	if (grid[nr][nc] === "[" || grid[nr][nc] === "]") {
		const offset = grid[nr][nc] === "[" ? 1 : -1;
		const [or, oc] = [nr, nc + offset];

		// we also have to bubble up the other pair

		const fromFutureStep1 = innerEvaluationWithExpandedGrid(
			grid,
			nr,
			nc,
			instruction,
		);
		const fromFutureStep2 = innerEvaluationWithExpandedGrid(
			grid,
			or,
			oc,
			instruction,
		);

		if (!fromFutureStep1 || !fromFutureStep2) {
			return null;
		}

		[grid[row][col], grid[fromFutureStep1[0]][fromFutureStep1[1]]] = [
			grid[fromFutureStep1[0]][fromFutureStep1[1]],
			grid[row][col],
		];

		return [row, col];
	}

	return null;
}

function evaluateInstructionWithExpandedGrid(
	grid: string[][],
	row: number,
	col: number,
	instruction: Instruction,
): [number, number] | null {
	const [dr, dc] = getInstructionDelta(instruction);

	const nr = row + dr;
	const nc = col + dc;

	if (!inBounds(grid, nr, nc) || grid[nr][nc] === "#") {
		return null;
	}

	if (grid[nr][nc] === ".") {
		[grid[nr][nc], grid[row][col]] = [grid[row][col], grid[nr][nc]];
		return [row, col];
	}

	if (instruction === "<" || instruction === ">") {
		const bubbledUp = evaluateInstructionWithExpandedGrid(
			grid,
			nr,
			nc,
			instruction,
		);

		if (bubbledUp) {
			const [fr, fc] = bubbledUp;
			[grid[row][col], grid[fr][fc]] = [grid[fr][fc], grid[row][col]];
			return [row, col];
		}

		return null;
	}

	const offset = grid[nr][nc] === "[" ? 1 : -1;

	if (
		!checkAllPathsAreClearForVerticalMove(grid, nr, nc, instruction) ||
		!checkAllPathsAreClearForVerticalMove(grid, nr, nc + offset, instruction)
	) {
		return null;
	}

	const bubbleUp = innerEvaluationWithExpandedGrid(grid, nr, nc, instruction);
	const anotherBubbleUp = innerEvaluationWithExpandedGrid(
		grid,
		nr,
		nc + offset,
		instruction,
	);

	if (bubbleUp && anotherBubbleUp) {
		const [fr, fc] = bubbleUp;
		[grid[row][col], grid[fr][fc]] = [grid[fr][fc], grid[row][col]];

		return [row, col];
	}

	return null;
}

function prettyPrint(grid: string[][]) {
	for (const row of grid) {
		console.log(row.join(" "));
	}
}

function part2() {
	// console.log("Original: ");
	// prettyPrint(grid2);

	for (const instruction of instructions) {
		const [r, c] = findStartingPosition(grid2);
		evaluateInstructionWithExpandedGrid(grid2, r, c, instruction);

		// console.log(`Move ${instruction}`);
		// prettyPrint(grid2);
	}

	// prettyPrint(grid2);

	let res = 0;

	for (let i = 0; i < grid2.length; i++) {
		for (let j = 0; j < grid2[i].length; j++) {
			if (grid2[i][j] === "[") {
				res += 100 * i + j;
			}
		}
	}

	return res;
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
