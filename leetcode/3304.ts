import { CIRCULAR_ALPHABET } from "@utils/alphabet"

function kthCharacter(k: number): string {
	const word = ["a"]

	while (word.length < k) {
		const size = word.length

		for (let i = 0; i < size; i++) {
			const index = CIRCULAR_ALPHABET.indexOf(word[i])
			const nextIndex = (index + 1) % 26
			word.push(CIRCULAR_ALPHABET[nextIndex])
		}
	}

	return word?.[k - 1] ?? ""
}

export { kthCharacter }
