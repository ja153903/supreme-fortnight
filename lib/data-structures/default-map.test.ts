import { test, expect } from "bun:test";
import { DefaultMap } from "./default-map.ts";

test("DefaultMap<number>", () => {
	const mapWithNumbers = new DefaultMap<number>(0);

	expect(mapWithNumbers.get("a")).toBe(0);
	expect(mapWithNumbers.get("b")).toBe(0);
	mapWithNumbers.set("a", 1);
	expect(mapWithNumbers.get("a")).toBe(1);
});
