import { test, expect } from "bun:test";
import { PriorityQueue } from "./priority-queue";

test("PriorityQueue<number> - MaxHeap Implementation", () => {
  const maxHeap = new PriorityQueue<number>((a, b) => b - a);
  maxHeap.enqueue(2);
  maxHeap.enqueue(1);

  expect(maxHeap.peek()).toBe(2);

  maxHeap.enqueue(3);

  expect(maxHeap.peek()).toBe(3);

  expect(maxHeap.poll()).toBe(3);
  expect(maxHeap.peek()).toBe(2);
});

test("PriorityQueue<number> - MinHeap Implementation", () => {
  const minHeap = new PriorityQueue<number>((a, b) => a - b);
  minHeap.enqueue(2);
  minHeap.enqueue(1);

  expect(minHeap.peek()).toBe(1);

  minHeap.enqueue(-1);

  expect(minHeap.peek()).toBe(-1);

  expect(minHeap.poll()).toBe(-1);
  expect(minHeap.peek()).toBe(1);
});

test("PriorityQueue<CustomData> - Heap Implementation", () => {
  type CustomData = { firstName: string; lastName: string; age: number };
  const customHeap = new PriorityQueue<CustomData>((a, b) => {
    if (a.lastName === b.lastName) {
      return b.age - a.age;
    }

    return a.lastName.toLowerCase().localeCompare(b.lastName.toLowerCase());
  });

  const dataPoints = [
    { firstName: "Jaime", lastName: "Abbariao", age: 29 },
    { firstName: "Jenny", lastName: "Chen", age: 30 },
  ];

  for (const dataPoint of dataPoints) {
    customHeap.enqueue(dataPoint);
  }

  dataPoints.push({
    firstName: "lksjdflsdkfj",
    lastName: "Abbariao",
    age: 40,
  });

  expect(customHeap.peek()).toEqual(dataPoints[0]);

  customHeap.enqueue(dataPoints[dataPoints.length - 1]);

  expect(customHeap.peek()).toEqual(dataPoints[dataPoints.length - 1]);
});
