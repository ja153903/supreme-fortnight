// a fair pair is defined as lower <= nums[i] + nums[j] <= upper
// note that index matters here
function countFairPairs(nums: number[], lower: number, upper: number): number {
  // the brute force solution to this problem would be to have O(n^2) iteration over the array
  // and check if the pair is fair
  // This solution will timeout depending on how large nums can get

  // we should at least get this down to O(sort)
  let result = 0;

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      const current = nums[i] + nums[j];

      if (lower <= current && current <= upper) {
        result++;
      }
    }
  }

  return result;
}

export { countFairPairs };
