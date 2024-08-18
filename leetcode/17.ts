const DIGIT_TO_ALPHA: Record<string, string[]> = {
  "2": ["a", "b", "c"],
  "3": ["d", "e", "f"],
  "4": ["g", "h", "i"],
  "5": ["j", "k", "l"],
  "6": ["m", "n", "o"],
  "7": ["p", "q", "r", "s"],
  "8": ["t", "u", "v"],
  "9": ["w", "x", "y", "z"],
};

function letterCombinations(digits: string): string[] {
  const combinations: string[] = [""];

  for (const digit of digits) {
    const alpha = DIGIT_TO_ALPHA[digit];
    const size = combinations.length;

    for (let i = 0; i < size; i += 1) {
      const front = combinations.shift() ?? "";
      for (const char of alpha) {
        combinations.push(`${front}${char}`);
      }
    }
  }

  return combinations.filter(Boolean);
}

export { letterCombinations };
