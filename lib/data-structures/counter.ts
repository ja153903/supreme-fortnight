/**
 * `Counter` tracks non-negative counts of various keys
 */
export class Counter<T> extends Map<T, number> {
  constructor(iterable?: Iterable<T>) {
    super();

    if (iterable) {
      this.update(iterable);
    }
  }

  update(iterable: Iterable<T>) {
    for (const item of iterable) {
      this.increment(item);
    }
  }

  increment(key: T) {
    if (!this.has(key)) {
      this.set(key, 1);
      return;
    }

    this.set(key, this.get(key)! + 1);
  }

  decrement(key: T) {
    if (!this.has(key)) {
      this.set(key, 0);
      return;
    }

    this.set(key, this.get(key)! - 1);
  }
}
