import { test, expect } from "bun:test";
import { kthCharacter } from "./3304";

test("3304. Find the K-th character in string game I", () => {
  expect(kthCharacter(5)).toBe("b");
  expect(kthCharacter(10)).toBe("c");
});
