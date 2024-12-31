import type { TreeNode } from "@lib/data-structures/leetcode";

function levelOrder(root: TreeNode | null): number[][] {
	if (!root) {
		return [];
	}

	const result: number[][] = [];
	const queue = [];
	queue.push(root);

	while (queue.length > 0) {
		const size = queue.length;
		const level: number[] = [];

		for (let i = 0; i < size; i++) {
			const front = queue.shift();
			if (!front) {
				throw new Error("front is null?");
			}

			level.push(front.val);

			if (front.left) {
				queue.push(front.left);
			}

			if (front.right) {
				queue.push(front.right);
			}
		}

		result.push(level);
	}

	return result;
}

export { levelOrder };
