import { ssort } from "@lib/algorithms/sort";

export class Solution {
	groupAnagrams(strs: string[]): string[][] {
		const groups = new Map<string, string[]>();

		for (const str of strs) {
			const ss = ssort(str);

			if (!groups.has(ss)) {
				groups.set(ss, []);
			}

			groups.get(ss)?.push(str);
		}

		return Array.from(groups.values());
	}
}
