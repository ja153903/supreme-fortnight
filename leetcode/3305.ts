import { getConsonantCount, hasEveryVowel } from "@utils/alphabet"

function countOfSubstrings(word: string, k: number): number {
	// return the number of substrings that contain every vowel at least once
	// and exactly k consonants
	let result = 0
	for (let i = 0; i < word.length; i++) {
		for (let j = i; j < word.length; j++) {
			// we should just check the strings that
			// are at least 5 + k (5 vowels and k consonants)
			if (j - i + 1 >= 5 + k) {
				const substr = word.substring(i, j + 1)
				if (hasEveryVowel(substr) && getConsonantCount(substr) === k) {
					result++
				}
			}
		}
	}

	return result
}

export { countOfSubstrings }
