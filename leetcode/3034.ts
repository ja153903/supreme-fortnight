// place all digits of arr1 into a trie
// iterate over every item in arr2 and check if each string matches in the trie

import { Trie } from "@lib/data-structures/trie"

// keep track of how long the depth would be
function longestCommonPrefix(arr1: number[], arr2: number[]): number {
	const trie = new Trie()

	for (const num of arr1) {
		trie.insert(num.toString())
	}

	let res = 0
	for (const num of arr2) {
		res = Math.max(res, trie.lcp(num.toString()))
	}

	return res
}

export { longestCommonPrefix }
