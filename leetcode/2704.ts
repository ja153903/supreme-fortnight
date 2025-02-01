type ToBeOrNotToBe = {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	toBe: (val: any) => boolean
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	notToBe: (val: any) => boolean
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function expect(val: any): ToBeOrNotToBe {
	const result = val

	return {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		toBe: (val: any) => {
			if (val !== result) {
				throw new Error("Not Equal")
			}

			return true
		},
		// biome-ignore lint/complexity/useArrowFunction: <explanation>
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		notToBe: (val: any) => {
			if (val === result) {
				throw new Error("Equal")
			}

			return true
		},
	}
}

export { expect }
