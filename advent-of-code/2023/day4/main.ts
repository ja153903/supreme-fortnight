import { splitStringIntoIntegerArray } from "@lib/algorithms/array";
import { readInputToArray } from "@utils/advent-of-code";

const lines = await readInputToArray(`${import.meta.dir}/data.in`);

type Card = { index: number; winningNumbers: number[]; ownedNumbers: number[] };

function parseCard(line: string): Card {
  const [cardMetadata, numbersSeparatedByPipe] = line.split(": ");
  const [_, index] = cardMetadata.split(/\s+/g);

  const [winningNumbers, ownedNumbers] = numbersSeparatedByPipe.split(" | ");

  return {
    index: Number.parseInt(index, 10),
    winningNumbers: splitStringIntoIntegerArray(winningNumbers),
    ownedNumbers: splitStringIntoIntegerArray(ownedNumbers),
  };
}

const cards = lines.map((line) => parseCard(line));

function getIntersection(a: number[], b: number[]): number[] {
  const aSet = new Set(a);
  const bSet = new Set(b);

  return Array.from(aSet.intersection(bSet));
}

function getMatchesPerCard(card: Card): number {
  return getIntersection(card.ownedNumbers, card.winningNumbers).length;
}

function getPointsPerCard(card: Card): number {
  const intersection = getIntersection(card.ownedNumbers, card.winningNumbers);
  return intersection.length > 0 ? 2 ** (intersection.length - 1) : 0;
}

function part1() {
  return cards.map((card) => getPointsPerCard(card)).reduce((a, b) => a + b, 0);
}

function part2() {
  const counter = new Map<number, number>();

  for (const card of cards) {
    const matches = getMatchesPerCard(card);
    // increment the count
    counter.set(card.index, (counter.get(card.index) ?? 0) + 1);

    const parentCount = counter.get(card.index);
    if (!parentCount) {
      throw new Error("There should've been a value here");
    }

    // for each value, we also have to eventually update for every copy
    // with the count of the current card.index
    for (let i = 1; i <= matches && card.index + i <= cards.length; i++) {
      const currentCount = counter.get(card.index + i) ?? 0;
      counter.set(card.index + i, currentCount + parentCount);
    }
  }

  return Array.from(counter.values()).reduce((a, b) => a + b, 0);
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
