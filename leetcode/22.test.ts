import { expect, test } from "bun:test"
import { generateParenthesis } from "./22"

test("leetcode 22. generate parenthesis", () => {
	expect(generateParenthesis(1)).toEqual(["()"])
	expect(generateParenthesis(3)).toEqual([
		"((()))",
		"(()())",
		"(())()",
		"()(())",
		"()()()",
	])
})
