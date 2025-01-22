import { expect, test } from "bun:test";
import { gridGame } from "./2017";

test("2017. Grid Game", () => {
	expect(
		gridGame([
			[2, 5, 4],
			[1, 5, 1],
		]),
	).toBe(4);
});
