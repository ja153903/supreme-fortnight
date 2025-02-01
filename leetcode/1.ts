function twoSum(nums: number[], target: number): number[] {
	const seen = new Map<number, number>()

	for (let i = 0; i < nums.length; i += 1) {
		if (seen.has(target - nums[i])) {
			const value = seen.get(target - nums[i])
			if (value === undefined) {
				throw new Error("Value should not be undefined")
			}

			return [value, i]
		}

		seen.set(nums[i], i)
	}

	return []
}

export { twoSum }
