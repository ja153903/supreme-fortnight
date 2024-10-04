/**
 * `sum` is a generic function that takes an array of items and a function to apply to each item in the array,
 * and returns the sum of the results.
 */
export function sum<T>(
  items: Array<T>,
  fn: (a: number, b: T) => number,
  defaultValue: number = 0
): number {
  return items.reduce((a, b) => fn(a, b), defaultValue);
}
