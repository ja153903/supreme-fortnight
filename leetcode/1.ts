function twoSum(nums: number[], target: number): number[] {
  const seen = new Map<number, number>();

  for (let i = 0; i < nums.length; i += 1) {
    if (seen.has(target - nums[i])) {
      return [seen.get(target - nums[i])!, i];
    }

    seen.set(nums[i], i);
  }

  return [];
}

export { twoSum };
