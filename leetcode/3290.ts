import { createMemoTable } from "@lib/data-structures/dp";

function maxScore(a: number[], b: number[]): number {
  const memo: number[][] = createMemoTable<number>(a.length, b.length, -1);

  function rec(a: number[], b: number[], i: number, j: number): number {
    if (i === a.length) {
      return 0;
    }

    if (j >= b.length) {
      return -Infinity;
    }

    if (memo[i][j] !== -1) {
      return memo[i][j]!;
    }

    memo[i][j] = Math.max(
      // Don't take the current index
      rec(a, b, i, j + 1),
      // Take the current index
      a[i] * b[j] + rec(a, b, i + 1, j + 1)
    );

    return memo[i][j];
  }

  return rec(a, b, 0, 0);
}

export { maxScore };
