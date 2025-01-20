import { readInputToArray } from "@utils/advent-of-code";
import type { Required } from "utility-types";

const lines = await readInputToArray(`${import.meta.dir}/data.in`);

type Color = { red?: number; blue?: number; green?: number };
type Game = { index: number; colors: Color[] };

function buildGame(line: string): Game {
	const [index, colors] = line.split(": ");
	const [_gameCopy, gameIndexAsStr] = index.split(" ");

	const colorsBySemicolon = colors.split("; ").map((round) => {
		return Object.fromEntries(
			round.split(", ").map((color) => {
				const [value, key] = color.split(" ");
				return [key, Number.parseInt(value, 10)] as [Color, number];
			}),
		) as Color;
	});

	return {
		index: Number.parseInt(gameIndexAsStr, 10),
		colors: colorsBySemicolon,
	};
}

const games = lines.map((line) => buildGame(line));

const PART1_GAME_LIMIT: Required<Color> = { red: 12, green: 13, blue: 14 };

function isGamePossible(game: Game) {
	for (const { red = 0, green = 0, blue = 0 } of game.colors) {
		if (
			red > PART1_GAME_LIMIT.red ||
			green > PART1_GAME_LIMIT.green ||
			blue > PART1_GAME_LIMIT.blue
		) {
			return false;
		}
	}

	return true;
}

function getMaxPerGame(game: Game): Required<Color> {
	const max = { red: 0, green: 0, blue: 0 };

	for (const { red = 0, green = 0, blue = 0 } of game.colors) {
		max.red = Math.max(max.red, red);
		max.green = Math.max(max.green, green);
		max.blue = Math.max(max.blue, blue);
	}

	return max;
}

function part1(): number {
	return games
		.filter((game) => isGamePossible(game))
		.reduce((acc, { index }) => acc + index, 0);
}

function part2(): number {
	return games
		.map((game) => getMaxPerGame(game))
		.reduce((acc, { red, blue, green }) => acc + red * blue * green, 0);
}

console.log("Part 1: ", part1());
console.log("Part 2: ", part2());
