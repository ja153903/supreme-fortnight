import { Trie } from "@lib/data-structures/trie"

class VisitedTrie extends Trie {
	visited: number

	constructor() {
		super()
		this.visited = 0
	}

	override insert(word: string) {
		let current: VisitedTrie = this

		for (let i = 0; i < word.length; i++) {
			if (!current.children.has(word[i])) {
				current.children.set(word[i], new VisitedTrie())
			}

			const child = current.children.get(word[i])
			if (!child) {
				throw new Error("This should exist")
			}

			current = child
			current.visited++
		}

		current.hasWord = true
	}

	override find(prefix: string) {
		let current: this = this

		for (let i = 0; i < prefix.length; i++) {
			if (!current.children.has(prefix[i])) {
				return null
			}

			const child = current.children.get(prefix[i])
			if (!child) {
				throw new Error("This cannot be possible")
			}
			current = child
		}

		return current
	}
}

function sumPrefixScores(words: string[]): number[] {
	const result = new Array(words.length).fill(0)
	const trie = new VisitedTrie()

	for (const word of words) {
		trie.insert(word)
	}

	for (let i = 0; i < words.length; i++) {
		let count = 0
		let currentTrieNode = trie

		for (let j = 0; j < words[i].length; j++) {
			const nextTrieNode = currentTrieNode.children.get(words[i][j])
			if (nextTrieNode) {
				count += nextTrieNode.visited
				currentTrieNode = nextTrieNode
			} else {
				throw new Error("Something happened with the trie node")
			}
		}

		result[i] = count
	}

	return result
}

export { sumPrefixScores }
