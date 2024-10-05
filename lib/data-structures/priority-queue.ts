import { TODO } from "@utils/todo";

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
    throw new TODO("Implement enqueue");
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

    this.percolateDown();

    return value;
  }

  private percolateDown() {
    throw new TODO("Implement percolateDown");
  }

  get empty() {
    return this.queue.length === 0;
  }

  get size(): number {
    return this.queue.length;
  }
}
