import { test, expect } from "bun:test";
import { sum } from "./array";

test("sum<T>", () => {
  const nums = [1, 2, 3, 4, 5];
  expect(sum<number>(nums, (a, b) => a + b)).toBe(15);

  type Data = { name: string; value: number };
  const items = [
    { name: "Jaime", value: 30 },
    { name: "Jenny", value: 29 },
  ];
  expect(sum<Data>(items, (a, b) => a + b.value)).toBe(59);

  const fib = [1, 2, 3, 5];
  expect(sum<number>(fib, (a, b) => a + b, 1)).toBe(12);
});
