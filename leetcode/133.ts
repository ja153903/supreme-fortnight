import { _Node } from "@lib/data-structures/leetcode";

function cloneGraph(node: _Node | null): _Node | null {
	if (!node) {
		return null;
	}

	const copies = new Map<number, _Node>();

	const queue = [];
	queue.push(node);

	copies.set(node.val, new _Node(node.val));

	const visited = new Set<number>();

	while (queue.length > 0) {
		const size = queue.length;
		for (let i = 0; i < size; i++) {
			const current = queue.shift();
			if (!current) {
				throw new Error("current is null?");
			}

			if (visited.has(current.val)) {
				continue;
			}

			visited.add(current.val);

			for (const nei of current.neighbors) {
				const neiCopy = copies.get(nei.val) ?? null;
				if (!neiCopy) {
					const _newNei = new _Node(nei.val);
					copies.set(nei.val, _newNei);
					copies.get(current.val)?.neighbors.push(_newNei);
				} else {
					copies.get(current.val)?.neighbors.push(neiCopy);
				}

				queue.push(nei);
			}
		}
	}

	return copies.get(node.val) ?? null;
}

export { cloneGraph };
