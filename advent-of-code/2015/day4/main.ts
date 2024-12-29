const input = "iwrupvqb";

const md5Hasher = new Bun.CryptoHasher("md5");

function part1() {
	let i = 1;
	while (true) {
		const current = `${input}${i}`;
		md5Hasher.update(current);
		const hash = md5Hasher.digest("hex").toString();
		if (hash.startsWith("00000")) {
			return i;
		}

		i++;
	}
}

function part2() {
	// Use the solution from part 1 just to save a little bit more time
	let i = 3463486;
	while (true) {
		const current = `${input}${i}`;
		md5Hasher.update(current);
		const hash = md5Hasher.digest("hex").toString();
		if (hash.startsWith("000000")) {
			return i;
		}

		i++;
	}
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
