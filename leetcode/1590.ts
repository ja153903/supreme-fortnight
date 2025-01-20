import { sum } from "@lib/algorithms/array";
import { TODO } from "@utils/todo";

function minSubarray(nums: number[], p: number): number {
	// TODO: This needs to be implemented
	const res = Number.POSITIVE_INFINITY;

	const currentSum = sum<number>(nums, (a, b) => a + b);
	if (currentSum % p === 0) {
		return 0;
	}

	// currentSum % p gives us the distance away from the multiple of p
	// so for example if p = 6 and currentSum = 10
	// We first get that 10 % 6 = 4, if 4 exists in nums, then we can remove it
	throw new TODO("Finish the implementation here");

	// return res === Infinity ? -1 : res;
}

export { minSubarray };
