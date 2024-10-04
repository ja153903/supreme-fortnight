// TODO: The optimal solution for this problem requires us to use a doubly linked list
class AllOne {
  private _count: Map<string, number>;

  constructor() {
    this._count = new Map();
  }

  inc(key: string): void {
    const current = this._count.get(key) ?? 0;
    this._count.set(key, current + 1);
  }

  dec(key: string): void {
    const current = this._count.get(key) ?? 0;
    if (current - 1 === 0) {
      this._count.delete(key);
    } else {
      this._count.set(key, current - 1);
    }
  }

  // FIXME: While this works, we want a solution with an average runtime of O(1)
  getMaxKey(): string {
    return (
      [...this._count.entries()].sort((a, b) => b[1] - a[1]).at(0)?.[0] ?? ""
    );
  }

  // FIXME: While this works, we want a solution with an average runtime of O(1)
  getMinKey(): string {
    return (
      [...this._count.entries()].sort((a, b) => a[1] - b[1]).at(0)?.[0] ?? ""
    );
  }
}

export { AllOne };
