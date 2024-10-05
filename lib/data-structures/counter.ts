class Counter<T> extends Map<T, number> {
  constructor(iterable?: Iterable<T>) {
    super();

    if (iterable) {
      this.update(iterable);
    }
  }

  override get(key: T): number {
    return super.get(key) ?? 0;
  }

  update(iterable: Iterable<T>) {
    for (const item of iterable) {
      this.increment(item);
    }
  }

  increment(key: T) {
    if (!this.has(key)) {
      this.set(key, 0);
    }

    this.set(key, this.get(key)! + 1);
  }

  decrement(key: T) {
    if (!this.has(key)) {
      this.set(key, 0);
    }

    this.set(key, this.get(key)! - 1);
  }
}

export { Counter };
