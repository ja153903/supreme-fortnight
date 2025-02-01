type Counter = {
	increment: () => number
	decrement: () => number
	reset: () => number
}

function createCounter(init: number): Counter {
	let state = init
	return {
		increment: () => ++state,
		decrement: () => --state,
		reset: () => {
			state = init
			return state
		},
	}
}

export { createCounter }
