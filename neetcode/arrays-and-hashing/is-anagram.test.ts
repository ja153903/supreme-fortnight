import { test, expect } from "bun:test";
import { Solution } from "./is-anagram";

const solution = new Solution();

test("Is Anagram", () => {
  expect(solution.isAnagram("racecar", "carrace")).toBeTrue();
  expect(solution.isAnagram("jar", "jam")).toBeFalse();
});
