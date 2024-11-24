export class Solution {
  twoSum(nums: number[], target: number): number[] {
    const seen = new Map<number, number>();

    for (let i = 0; i < nums.length; i++) {
      if (seen.has(target - nums[i])) {
        const value = seen.get(target - nums[i]);
        if (value === undefined) {
          throw new Error("This shouldn't be possible");
        }
        return [value, i];
      }

      seen.set(nums[i], i);
    }

    return [];
  }
}
