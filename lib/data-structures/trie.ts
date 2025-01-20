class Trie {
	hasWord: boolean;
	children: Map<string, this>;

	constructor() {
		this.hasWord = false;
		this.children = new Map();
	}

	insert(word: string | string[]) {
		let current: Trie = this;

		for (let i = 0; i < word.length; i++) {
			const char = word[i];
			if (!current.children.has(char)) {
				current.children.set(char, new Trie());
			}

			const child = current.children.get(char);
			if (!child) {
				throw new Error("This cannot be possible");
			}
			current = child;
		}

		current.hasWord = true;
	}

	has(word: string | string[]): boolean {
		let current: this | undefined = this;

		for (const char of word) {
			if (current === undefined || !current.children.has(char)) {
				return false;
			}

			current = current.children.get(char);
		}

		return current?.hasWord ?? false;
	}

	startsWith(word: string | string[]): boolean {
		let current: this | undefined = this;

		for (const char of word) {
			if (current === undefined || !current.children.has(char)) {
				return false;
			}

			current = current.children.get(char);
		}

		return true;
	}

	/**
	 * Not sure of a better name for this method just yet, but the
	 * idea is to check if a word has its constituent parts within the
	 * trie
	 */
	hasAtoms(word: string | string[]): boolean {
		let current: this | undefined = this;

		for (const item of word) {
			// This means that we don't have the constituent parts as of now
			if (current === undefined || !current.children.has(item)) {
				return false;
			}

			current = current.children.get(item);

			if (current?.hasWord) {
				return true;
			}
		}

		return false;
	}

	/**
	 * `lcp` returns the longest common prefix given some string
	 */
	lcp(prefix: string | string[]): number {
		let current: this | undefined = this;
		let depth = 0;

		for (let i = 0; i < prefix.length; i++) {
			const char = prefix[i];
			if (current === undefined || !current.children.has(char)) {
				return depth;
			}

			depth++;
			current = current.children.get(char);
		}

		return depth;
	}

	find(prefix: string | string[]): this | null {
		let current: this = this;

		for (let i = 0; i < prefix.length; i++) {
			if (!current.children.has(prefix[i])) {
				return null;
			}

			const child = current.children.get(prefix[i]);
			if (!child) {
				throw new Error("This cannot be possible");
			}

			current = child;
		}

		return current;
	}
}

export { Trie };
