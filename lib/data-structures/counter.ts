/**
 * `Counter<T>` is a generic Map data structure that keeps track
 * of the count of values.
 */
class Counter<T> extends Map<T, number> {
  constructor(iterable?: Iterable<T>) {
    super();

    if (iterable) {
      this.update(iterable);
    }
  }

  /**
   * `get` is implemented unlike the regular `get` method
   * that exists within a `Map` data structure.
   *
   * @returns Always returns a number; if the key does not exist, then you'll get 0
   */
  override get(key: T): number {
    return super.get(key) ?? 0;
  }

  update(iterable: Iterable<T>) {
    for (const item of iterable) {
      this.increment(item);
    }
  }

  /**
   * `increment` updates the count of the item by 1
   * If the item did not exist before, then we'll set a value
   * for that key and then increment the value to 1
   */
  increment(key: T) {
    this.setIfEmpty(key);
    const current = this.get(key) ?? 0;
    this.set(key, current + 1);
  }

  /**
   * `decrement` updates the count of the item by -1
   * If the item did not exist before, then we set the value to 0
   * and decrement to -1.
   */
  decrement(key: T) {
    this.setIfEmpty(key);
    const current = this.get(key) ?? 0;
    this.set(key, current - 1);
  }

  private setIfEmpty(key: T) {
    if (!this.has(key)) {
      this.set(key, 0);
    }
  }
}

export { Counter };
