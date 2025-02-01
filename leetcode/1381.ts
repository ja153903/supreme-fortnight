class CustomStack {
	private stack: number[]
	private maxSize: number

	constructor(maxSize: number) {
		this.stack = []
		this.maxSize = maxSize
	}

	push(x: number): void {
		if (this.length + 1 > this.maxSize) {
			return
		}

		this.stack.push(x)
	}

	pop(): number {
		return this.stack.pop() ?? -1
	}

	increment(k: number, val: number): void {
		const end = Math.min(this.length, k)
		for (let i = 0; i < end; i++) {
			this.stack[i] += val
		}
	}

	get length(): number {
		return this.stack.length
	}
}

export { CustomStack }
