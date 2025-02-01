import { expect, test } from "bun:test"
import { maxMatrixSum } from "./1975"

test("1975. Maximum Matrix Sum", () => {
	expect(
		maxMatrixSum([
			[1, -1],
			[-1, 1],
		]),
	).toBe(4)
	expect(
		maxMatrixSum([
			[1, 2, 3],
			[-1, -2, -3],
			[1, 2, 3],
		]),
	).toBe(16)
})
