import { TreeNode } from "@lib/data-structures/leetcode"

function constructMaximumBinaryTree(nums: number[]): TreeNode | null {
	if (nums.length === 0) {
		return null
	}

	// find the max value in the array
	let maxIndex = 0
	let maxValue = Number.NEGATIVE_INFINITY

	nums.forEach((num, index) => {
		if (num > maxValue) {
			maxIndex = index
			maxValue = num
		}
	})

	const root = new TreeNode(maxValue)
	root.left = constructMaximumBinaryTree(nums.slice(0, maxIndex))
	root.right = constructMaximumBinaryTree(nums.slice(maxIndex + 1))

	return root
}

export { constructMaximumBinaryTree }
