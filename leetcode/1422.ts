function maxScore(s: string): number {
	let res = 0;
	for (let i = 1; i < s.length; i++) {
		const left = s.slice(0, i);
		const right = s.slice(i);

		let zeros = 0;
		let ones = 0;

		for (let l = 0; l < left.length; l++) {
			if (left[l] === "0") {
				zeros++;
			}
		}

		for (let r = 0; r < right.length; r++) {
			if (right[r] === "1") {
				ones++;
			}
		}

		res = Math.max(res, zeros + ones);
	}

	return res;
}

export { maxScore };
