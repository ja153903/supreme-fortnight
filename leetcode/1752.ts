function check(nums: number[]): boolean {
	function rotate(ns: number[]): number[] {
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		ns.unshift(ns.pop()!)

		return ns
	}

	let count = 0

	const sns = [...nums].sort((a, b) => a - b)
	let ns = [...nums]
	while (count < ns.length) {
		let isSame = true
		for (let i = 0; i < nums.length; i++) {
			if (ns[i] !== sns[i]) {
				isSame = false
				break
			}
		}

		if (isSame) {
			return true
		}

		count++

		ns = rotate(ns)
	}

	return false
}

export { check }
