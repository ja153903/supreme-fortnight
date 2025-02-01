function generateParenthesis(n: number): string[] {
	const result: string[] = []
	const queue: [string, number, number][] = []
	queue.push(["(", n - 1, n])

	while (queue.length > 0) {
		const front = queue.shift()
		if (!front) {
			console.error("This error should never really happen")
			continue
		}

		const [current, left, right] = front

		if (left === 0 && right === 0) {
			result.push(current)
			continue
		}

		if (left > 0) {
			queue.push([`${current}(`, left - 1, right])
		}

		if (right > left) {
			queue.push([`${current})`, left, right - 1])
		}
	}

	return result
}

export { generateParenthesis }
