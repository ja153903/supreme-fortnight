function arrayRankTransform(arr: number[]): number[] {
  const result = new Array(arr.length).fill(1);
  const ss = [...arr].sort((a, b) => a - b);
  const hash = new Map<number, number>();

  let rank = 1;

  for (let i = 0; i < ss.length; i++) {
    if (!hash.has(ss[i])) {
      hash.set(ss[i], rank);
      rank++;
    }
  }

  for (let i = 0; i < arr.length; i++) {
    result[i] = hash.get(arr[i])!;
  }

  return result;
}

export { arrayRankTransform };
