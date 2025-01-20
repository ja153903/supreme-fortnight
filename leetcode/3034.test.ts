import { expect, test } from "bun:test";
import { longestCommonPrefix } from "./3034";

test("3034. Find the length of the Longest Common Prefix", () => {
	expect(longestCommonPrefix([1, 10, 100], [1000])).toBe(3);
	expect(longestCommonPrefix([1, 10, 1000], [1000])).toBe(4);
	expect(longestCommonPrefix([1, 2, 3], [4, 4, 4])).toBe(0);
});
