import { splitStringIntoIntegerArray } from "@lib/algorithms/array";
import { readInputToString } from "@utils/advent-of-code";

const rawData = await readInputToString(`${import.meta.dir}/data.in`);

type Mapping = [number, number, number];

function parseSection(section: string): Mapping[] {
  const mappings = section.split("\n");
  mappings.shift();

  return mappings
    .filter((mapping) => mapping.split(" ").length === 3)
    .map((mapping) =>
      mapping.split(" ").map((item) => parseInt(item, 10)),
    ) as Mapping[];
}

function parseSeed(seed: string): number[] {
  const parts = seed.split(": ");
  parts.shift();

  return splitStringIntoIntegerArray(parts.shift()!);
}

const sections = rawData.split("\n\n").map((section, index) => {
  if (index === 0) {
    return parseSeed(section);
  } else {
    return parseSection(section);
  }
});

// for each section that are not the seeds
// the tuple contains the following mappings
// destination range start, source range start, range length

const seeds = sections.shift()! as number[];
const mappings = sections as Mapping[][];

function evaluateSeed(seed: number): number {
  let current = seed;

  for (const mapping of mappings) {
    for (const [destinationStart, sourceStart, range] of mapping) {
      if (sourceStart <= current && current < sourceStart + range) {
        current = destinationStart + current - sourceStart;
        break;
      }
    }
  }

  return current;
}

function part1() {
  let result = Infinity;

  for (const seed of seeds) {
    result = Math.min(result, evaluateSeed(seed));
  }

  return result;
}

// TODO: Find a more efficient way of solving this problem without having to
// calculate all possible paths. it might be better to start from the end and work our way up
function part2() {
  let result = Infinity;

  for (let i = 1; i < seeds.length; i += 2) {
    const rangeStart = seeds[i - 1];
    const rangeLength = seeds[i];

    for (let seed = rangeStart; seed <= rangeStart + rangeLength; seed++) {
      result = Math.min(result, evaluateSeed(seed));
    }
  }

  return result;
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
