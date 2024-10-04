function canArrange(arr: number[], k: number): boolean {
  const counts = new Array(k).fill(0);

  for (let num of arr) {
    num %= k;
    if (num < 0) {
      num += k;
    }

    counts[num]++;
  }

  // counts[0] denotes the count of all elements divisible by k
  // therefore, this number should be even
  if (counts[0] % 2 !== 0) {
    return false;
  }

  for (let i = 1; i <= Math.floor(k / 2); i++) {
    if (counts[i] !== counts[k - i]) {
      return false;
    }
  }

  return true;
}

export { canArrange };
