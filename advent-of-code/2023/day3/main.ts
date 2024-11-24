import { sum } from "@lib/algorithms/array";
import { readInputToArray } from "@utils/advent-of-code";
import { isDigit } from "@utils/alphabet";

const lines = await readInputToArray(`${import.meta.dir}/data.in`);

function isSymbol(char: string, isGearDefined = false) {
  if (isGearDefined) {
    return char === "*";
  }

  return !isDigit(char) && char !== ".";
}

function enqueueSymbols(data: string[], isGearDefined = false) {
  const queue: [number, number][] = [];

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (isSymbol(data[i][j], isGearDefined)) {
        queue.push([i, j]);
      }
    }
  }

  return queue;
}

const DIRECTIONS = [
  [1, 0],
  [1, -1],
  [1, 1],
  [0, 1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
];

function buildDigit(
  data: string[],
  start: [number, number],
  visited: Set<string>,
) {
  const dq: string[] = [];
  dq.push(data[start[0]][start[1]]);

  visited.add(`${start[0]},${start[1]}`);

  let posCol = start[1] + 1;
  let negCol = start[1] - 1;

  while (
    negCol >= 0 &&
    isDigit(data[start[0]][negCol]) &&
    !visited.has(`${start[0]},${negCol}`)
  ) {
    visited.add(`${start[0]},${negCol}`);
    dq.unshift(data[start[0]][negCol]);
    negCol--;
  }

  while (
    posCol < data[0].length &&
    isDigit(data[start[0]][posCol]) &&
    !visited.has(`${start[0]},${posCol}`)
  ) {
    visited.add(`${start[0]},${posCol}`);
    dq.push(data[start[0]][posCol]);
    posCol++;
  }

  let res = 0;

  while (dq.length > 0) {
    const front = dq.shift();
    if (front === undefined) {
      throw new Error("Empty item for some reason");
    }

    res = res * 10 + Number.parseInt(front, 10);
  }

  return res;
}

function findDigits(data: string[], coord: [number, number]) {
  const digits: number[] = [];

  const visited = new Set<string>();

  for (const [dr, dc] of DIRECTIONS) {
    const nr = coord[0] + dr;
    const nc = coord[1] + dc;

    if (
      nr < 0 ||
      nc < 0 ||
      nr >= data.length ||
      nc >= data[0].length ||
      visited.has(`${nr},${nc}`) ||
      !isDigit(data[nr][nc])
    ) {
      continue;
    }

    const digit = buildDigit(data, [nr, nc], visited);
    digits.push(digit);
  }

  return digits;
}

function part1() {
  const symbols = enqueueSymbols(lines);

  let result = 0;

  while (symbols.length > 0) {
    const front = symbols.shift();
    if (front === undefined) {
      throw new Error("Front is empty for some reason");
    }

    result += sum(findDigits(lines, front), (a, b) => a + b);
  }

  return result;
}

function part2() {
  const symbols = enqueueSymbols(lines, true);

  let result = 0;

  while (symbols.length > 0) {
    const front = symbols.shift();
    if (front === undefined) {
      throw new Error("Front is undefined for some reason");
    }

    const digits = findDigits(lines, front);
    if (digits.length === 2) {
      result += digits[0] * digits[1];
    }
  }

  return result;
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
