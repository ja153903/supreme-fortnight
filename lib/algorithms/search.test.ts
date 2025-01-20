import { expect, test } from "bun:test";
import { binarySearch } from "./search";

test("binarySearch", () => {
	expect(binarySearch([1, 2, 3, 4], 2)).toBe(1);
	expect(binarySearch([1, 2, 3, 4], 10)).toBe(-1);
});
