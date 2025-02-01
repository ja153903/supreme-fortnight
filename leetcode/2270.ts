function waysToSplitArray(nums: number[]): number {
	const prefix = new Array<number>(nums.length).fill(0)

	for (let i = 0; i < nums.length; i++) {
		if (i > 0) {
			prefix[i] += prefix[i - 1]
		}

		prefix[i] += nums[i]
	}

	let res = 0

	for (let i = 0; i < prefix.length - 1; i++) {
		if (prefix[i] >= prefix[prefix.length - 1] - prefix[i]) {
			res++
		}
	}

	return res
}

export { waysToSplitArray }
