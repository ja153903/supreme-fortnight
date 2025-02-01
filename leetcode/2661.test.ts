import { expect, test } from "bun:test"
import { firstCompleteIndex } from "./2661"

test("First Completely Painted Row or Column", () => {
	const result = firstCompleteIndex(
		[1, 4, 5, 2, 6, 3],
		[
			[4, 3, 5],
			[1, 2, 6],
		],
	)
	expect(result).toBe(1)
})
