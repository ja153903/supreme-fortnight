import { Counter } from "@lib/data-structures/counter";

export class Solution {
  isAnagram(s: string, t: string): boolean {
    const sCounter = new Counter(s);

    for (const ch of t) {
      if (!sCounter.has(ch)) {
        return false;
      }

      const value = sCounter.get(ch)!;
      if (value <= 0) {
        return false;
      }

      sCounter.set(ch, value - 1);
    }

    for (const value of sCounter.values()) {
      if (value !== 0) {
        return false;
      }
    }

    return true;
  }
}
