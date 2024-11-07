/**
 * `sum` is a generic function that takes an array of items and a function to apply to each item in the array,
 * and returns the sum of the results.
 */
export function sum<T>(
  items: Array<T>,
  fn: (a: number, b: T) => number,
  defaultValue: number = 0,
): number {
  return items.reduce((a, b) => fn(a, b), defaultValue);
}

/**
 * In cases such as `12 2 3 4 3 5` where I want to turn this string
 * into an array of numbers, `splitStringIntoIntegerArray` helps
 * make that easier for me
 */
export function splitStringIntoIntegerArray(s: string): number[] {
  return s
    .split(/\s+/g)
    .filter(Boolean)
    .map((item) => parseInt(item, 10));
}
