import { isDigit } from "@utils/alphabet";

const FILE = Bun.file(`${import.meta.dir}/data.in`);
const DATA = await FILE.text();

function part1() {
  const lines = DATA.split("\n").filter(Boolean);

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

function part2() {}

function main() {
  console.log("Part 1: ", part1());
}

main();
