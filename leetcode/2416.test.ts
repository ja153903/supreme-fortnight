import { expect, test } from "bun:test"
import { sumPrefixScores } from "./2416"

test("2416. Sum of Prefix Scores of Strings", () => {
	expect(sumPrefixScores(["abc", "ab", "bc", "b"])).toEqual([5, 4, 3, 2])
	expect(sumPrefixScores(["abcd"])).toEqual([4])
	expect(
		sumPrefixScores([
			"qtcqcmwcin",
			"vkjotbrbzn",
			"eoorlyfche",
			"eoorlyhn",
			"eoorlyfcxk",
			"qfnmjilcom",
			"eoorlyfche",
			"qtcqcmwcnl",
			"qtcqcrpjr",
		]),
	).toEqual([24, 10, 34, 26, 32, 13, 34, 24, 20])
})
