function getSneakyNumbers(nums: number[]): number[] {
	const result: number[] = [];
	const counter = new Map<number, number>();

	for (const num of nums) {
		counter.set(num, (counter.get(num) || 0) + 1);
	}

	for (const [num, count] of counter.entries()) {
		if (count === 2) {
			result.push(num);
		}
	}

	return result;
}

export { getSneakyNumbers };
