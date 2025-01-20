import { expect, test } from "bun:test";
import { AllOne } from "./432";

test("432. All O`one Data Structure", () => {
	const allOne = new AllOne();

	allOne.inc("hello");
	allOne.inc("hello");

	expect(allOne.getMaxKey()).toBe("hello");
	expect(allOne.getMinKey()).toBe("hello");

	allOne.inc("leet");

	expect(allOne.getMaxKey()).toBe("hello"); // return "hello"
	expect(allOne.getMinKey()).toBe("leet"); // return "leet"
});
