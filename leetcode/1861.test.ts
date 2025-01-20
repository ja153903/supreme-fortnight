import { expect, test } from "bun:test";
import { rotateTheBox } from "./1861";

test("1861. Rotating the Box", () => {
	expect(rotateTheBox([["#", ".", "#"]])).toEqual([["."], ["#"], ["#"]]);
});
