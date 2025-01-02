function isVowel(ch: string) {
	return ch === "a" || ch === "e" || ch === "i" || ch === "o" || ch === "u";
}

function vowelStrings(words: string[], queries: number[][]): number[] {
	const ans = [];
	const prefix = new Array<number>(words.length).fill(0);

	for (let i = 0; i < words.length; i++) {
		if (isVowel(words[i][0]) && isVowel(words[i][words[i].length - 1])) {
			prefix[i] += 1;
		}

		if (i > 0) {
			prefix[i] += prefix[i - 1];
		}
	}

	for (const [l, r] of queries) {
		if (l === 0) {
			ans.push(prefix[r]);
		} else {
			ans.push(prefix[r] - prefix[l - 1]);
		}
	}

	return ans;
}

export { vowelStrings };
