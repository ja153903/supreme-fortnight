import { expect, test } from "bun:test";
import { removeSubfolders } from "./1233";

test("1233. Remove Sub-Folders from the Filesystem", () => {
	expect(removeSubfolders(["/a", "/a/b", "/c/d", "/c/d/e", "/c/f"])).toEqual([
		"/a",
		"/c/d",
		"/c/f",
	]);
	expect(removeSubfolders(["/a/b/c", "/a/b/ca", "/a/b/d"])).toEqual([
		"/a/b/c",
		"/a/b/ca",
		"/a/b/d",
	]);
});
