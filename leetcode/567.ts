import { Counter } from "@lib/data-structures/counter";

function checkInclusion(s1: string, s2: string): boolean {
  if (s1.length > s2.length) {
    return false;
  }

  const counter = new Counter<string>(s1);

  let target = s1.length;
  let start = 0;
  let end = 0;

  while (end < s2.length) {
    if (counter.get(s2[end]) > 0) {
      target--;
    }

    counter.decrement(s2[end]);

    end++;

    if (target === 0) {
      return true;
    }

    // NOTE: If our window is currently the size of the target length
    // but we haven't returned true from above, this means that we need
    // to update our window
    if (end - start === s1.length) {
      if (counter.get(s2[start]) >= 0) {
        target++;
      }

      counter.increment(s2[start]);

      start++;
    }
  }

  return false;
}

export { checkInclusion };
