export type PriorityQueueComparator<T> = (a: T, b: T) => number;

/**
 * Our implementation of a priority queue requires a comparator
 * so that we know whether we have a min heap or a max heap
 *
 * We also implement our priority queue using a binary heap
 */
export class PriorityQueue<T> {
  private queue: T[];
  private comparator: PriorityQueueComparator<T>;

  constructor(comparator: PriorityQueueComparator<T>) {
    this.queue = [];
    this.comparator = comparator;
  }

  enqueue(item: T) {
    this.queue.push(item);
    let i = this.queue.length - 1;

    while (
      i !== 0 &&
      this.comparator(this.queue[i], this.queue[this.parent(i)]) < 0
    ) {
      [this.queue[i], this.queue[this.parent(i)]] = [
        this.queue[this.parent(i)],
        this.queue[i],
      ];
      i = this.parent(i);
    }
  }

  private parent(i: number): number {
    return Math.floor((i - 1) / 2);
  }

  private left(i: number): number {
    return 2 * i + 1;
  }

  private right(i: number): number {
    return 2 * i + 2;
  }

  /**
   * This function returns the item with the highest priority
   * and does not remove it from the priority queue
   */
  peek(): T | null {
    return this.queue?.[0] ?? null;
  }

  /**
   * This function returns the item with
   * the highest priority and removes it from the priority queue
   */
  poll(): T | null {
    if (this.empty) {
      return null;
    }

    const value = this.queue.shift();

    if (value === undefined) {
      return null;
    }

    this.heapify(0);

    return value;
  }

  private heapify(i: number) {
    const left = this.left(i);
    const right = this.right(i);

    let highestPriority = i;
    if (
      left < this.size &&
      this.comparator(this.queue[left], this.queue[i]) < 0
    ) {
      highestPriority = left;
    }

    if (
      right < this.size &&
      this.comparator(this.queue[right], this.queue[highestPriority]) < 0
    ) {
      highestPriority = right;
    }

    if (highestPriority !== i) {
      [this.queue[highestPriority], this.queue[i]] = [
        this.queue[i],
        this.queue[highestPriority],
      ];
      this.heapify(highestPriority);
    }
  }

  get empty() {
    return this.queue.length === 0;
  }

  get size(): number {
    return this.queue.length;
  }
}
