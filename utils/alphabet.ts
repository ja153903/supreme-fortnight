import { Counter } from "@lib/data-structures/counter";

export const CIRCULAR_ALPHABET = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

export function isVowel(char: string): boolean {
  return (
    char === "a" || char === "e" || char === "i" || char === "o" || char === "u"
  );
}

export function isConsonant(char: string): boolean {
  return !isVowel(char);
}

export function hasAtLeastOneVowel(word: string): boolean {
  for (const char of word) {
    if (isVowel(char)) {
      return true;
    }
  }

  return false;
}

export function hasEveryVowel(word: string): boolean {
  const counter = new Counter<string>("aeiou");

  for (const char of word) {
    if (counter.has(char)) {
      counter.decrement(char);
    }
  }

  for (const count of counter.values()) {
    if (count > 0) {
      return false;
    }
  }

  return true;
}

export function getConsonantCount(word: string): number {
  let count = 0;

  for (const char of word) {
    if (isConsonant(char)) {
      count++;
    }
  }

  return count;
}

export function isDigit(ch: string): boolean {
  return !Number.isNaN(Number.parseInt(ch, 10));
}
