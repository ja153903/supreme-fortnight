// NOTE: This problem ends up being trivial if done with TS
//       since arrays can trivially simulate a double-ended queue
class MyCircularDeque {
	private _deque: number[];
	private limit: number;

	constructor(k: number) {
		this._deque = [];
		this.limit = k;
	}

	insertFront(value: number): boolean {
		if (this.isFull()) {
			return false;
		}

		this._deque.unshift(value);
		return true;
	}

	insertLast(value: number): boolean {
		if (this.isFull()) {
			return false;
		}

		this._deque.push(value);
		return true;
	}

	deleteFront(): boolean {
		if (this.isEmpty()) {
			return false;
		}

		this._deque.shift();

		return true;
	}

	deleteLast(): boolean {
		if (this.isEmpty()) {
			return false;
		}

		this._deque.pop();

		return true;
	}

	getFront(): number {
		return this._deque.at(0) ?? -1;
	}

	getRear(): number {
		return this._deque.at(-1) ?? -1;
	}

	isEmpty(): boolean {
		return this._deque.length === 0;
	}

	isFull(): boolean {
		return this._deque.length === this.limit;
	}
}

export { MyCircularDeque };
