function countPalindromicSubsequence(s: string): number {
	const dd = new Map<string, number[]>()

	for (let i = 0; i < s.length; i++) {
		if (!dd.has(s[i])) {
			dd.set(s[i], [])
		}

		dd.get(s[i])?.push(i)
	}

	let res = 0

	for (const values of dd.values()) {
		if (values.length > 1) {
			const first = values[0]
			const last = values[values.length - 1]

			res += new Set(s.slice(first + 1, last).split("")).size
		}
	}

	return res
}

export { countPalindromicSubsequence }
