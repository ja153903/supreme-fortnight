import { expect, test } from "bun:test"
import { MyCircularDeque } from "./641"

test("641. Design Circular Deque", () => {
	const deque = new MyCircularDeque(3)
	expect(deque.insertLast(1)).toBeTrue()
	expect(deque.insertLast(2)).toBeTrue()
	expect(deque.insertFront(3)).toBeTrue()
	expect(deque.insertFront(4)).toBeFalse()
	expect(deque.getRear()).toBe(2)
	expect(deque.getFront()).toBe(3)
	expect(deque.deleteLast()).toBeTrue()
	expect(deque.insertFront(4)).toBeTrue()
	expect(deque.getFront()).toBe(4)
})
