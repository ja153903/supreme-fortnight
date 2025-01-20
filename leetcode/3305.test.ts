import { expect, test } from "bun:test";
import { countOfSubstrings } from "./3305";

test("3305. Count of Substrings Containing Every Vowel and K Consonants I", () => {
	expect(countOfSubstrings("aeioqq", 1)).toBe(0);
	expect(countOfSubstrings("aeiou", 0)).toBe(1);
	expect(countOfSubstrings("ieaouqqieaouqq", 1)).toBe(3);
});
