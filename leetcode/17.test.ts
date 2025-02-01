import { expect, test } from "bun:test"
import { letterCombinations } from "./17"

test("leetcode 17. letter combinations of a phone number", () => {
	expect(letterCombinations("")).toEqual([])
	expect(letterCombinations("2")).toEqual(["a", "b", "c"])
	expect(letterCombinations("23")).toEqual([
		"ad",
		"ae",
		"af",
		"bd",
		"be",
		"bf",
		"cd",
		"ce",
		"cf",
	])
})
