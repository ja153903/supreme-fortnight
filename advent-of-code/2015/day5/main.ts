import { readInputToArray } from "@utils/advent-of-code";
import { isVowel } from "@utils/alphabet";

const lines = await readInputToArray(`${import.meta.dir}/data.in`);

function hasGTEThreeVowels(word: string): boolean {
	let count = 0;

	for (const ch of word) {
		if (isVowel(ch)) {
			count++;
		}

		if (count >= 3) {
			return true;
		}
	}

	return false;
}

function hasRepeatingLetter(word: string): boolean {
	for (let i = 1; i < word.length; i++) {
		if (word[i] === word[i - 1]) {
			return true;
		}
	}

	return false;
}

function hasForbiddenStrings(word: string): boolean {
	for (let i = 1; i < word.length; i++) {
		if (word[i - 1] === "a" && word[i] === "b") {
			return true;
		}
		if (word[i - 1] === "c" && word[i] === "d") {
			return true;
		}
		if (word[i - 1] === "p" && word[i] === "q") {
			return true;
		}
		if (word[i - 1] === "x" && word[i] === "y") {
			return true;
		}
	}

	return false;
}

function isNice(word: string): boolean {
	return (
		hasGTEThreeVowels(word) &&
		hasRepeatingLetter(word) &&
		!hasForbiddenStrings(word)
	);
}

function part1() {
	return lines.filter((line) => isNice(line)).length;
}

function hasStringPairWithoutOverlap(word: string) {
	for (let i = 1; i < word.length; i++) {
		for (let j = i + 1; j < word.length - 1; j++) {
			if (word[i - 1] === word[j] && word[i] === word[j + 1]) {
				return true;
			}
		}
	}

	return false;
}

function hasRepeatingLetterBetweenOne(word: string) {
	for (let i = 1; i < word.length - 1; i++) {
		if (word[i - 1] === word[i + 1]) {
			return true;
		}
	}

	return false;
}

function isNicePt2(word: string): boolean {
	return (
		hasStringPairWithoutOverlap(word) && hasRepeatingLetterBetweenOne(word)
	);
}

function part2() {
	return lines.filter((line) => isNicePt2(line)).length;
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
