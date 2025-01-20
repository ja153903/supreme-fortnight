import { expect, test } from "bun:test";
import { Counter } from "./counter";

test("Counter", () => {
	const numberCounter = new Counter([1, 2, 1, 2, 3]);

	expect(numberCounter.get(1)).toBe(2);
	expect(numberCounter.get(2)).toBe(2);
	expect(numberCounter.get(3)).toBe(1);

	numberCounter.update([1, 1]);
	expect(numberCounter.get(1)).toBe(4);

	expect(numberCounter.get(1000)).toBeUndefined();

	numberCounter.increment(1);

	expect(numberCounter.get(1)).toBe(5);

	numberCounter.decrement(1);

	expect(numberCounter.get(1)).toBe(4);
});
