import { isDigit } from "@utils/alphabet";
import { matchAllWithOverlap } from "@utils/regex";

const file = Bun.file(`${import.meta.dir}/data.in`);
const data = await file.text();
const lines = data.split("\n").filter(Boolean);

function part1() {
  let result = 0;

  for (const line of lines) {
    let first = null;
    let last = null;

    for (let i = 0; i < line.length; i++) {
      if (isDigit(line[i])) {
        if (first === null) {
          first = line[i];
        }
        last = line[i];
      }
    }

    result += parseInt(`${first}${last}`, 10);
  }

  return result;
}

const DIGIT_RECORD: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

function part2() {
  // NOTE: Need to use lookahead operator here because we want to capture
  // the overlap
  const regex = /(?=([1-9]|one|two|three|four|five|six|seven|eight|nine))/g;

  let result = 0;

  for (const line of lines) {
    const matches = matchAllWithOverlap(line, regex);
    let first = null;
    let last = null;

    if (matches === null) {
      throw new Error("Could not find a match");
    }

    for (const match of matches) {
      if (first === null) {
        first = match;
      }

      last = match;
    }

    let firstAsNum = null;

    if (first && first in DIGIT_RECORD) {
      firstAsNum = DIGIT_RECORD[first];
    } else if (first) {
      firstAsNum = parseInt(first, 10);
    }

    let lastAsNum = null;

    if (last && last in DIGIT_RECORD) {
      lastAsNum = DIGIT_RECORD[last];
    } else if (last) {
      lastAsNum = parseInt(last, 10);
    }

    if (!firstAsNum || !lastAsNum) {
      throw new Error("Could not parse string to number somehow");
    }

    const value = firstAsNum * 10 + lastAsNum;
    result += value;
  }

  return result;
}

console.log("Part 1: ", part1());
console.log("Part 2: ", part2());
