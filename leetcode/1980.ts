function findDifferentBinaryString(nums: string[]): string {
	const owned = new Set(nums)

	function* iter() {
		const queue = ["0", "1"]

		while (queue.length > 0) {
			const front = queue.shift()
			if (!front) {
				throw new Error("Nullish value from queue")
			}

			if (front.length === nums.length) {
				yield front
			}

			queue.push(`${front}1`)
			queue.push(`${front}0`)
		}

		return ""
	}

	for (const item of iter()) {
		if (!owned.has(item)) {
			return item
		}
	}

	return ""
}

export { findDifferentBinaryString }
