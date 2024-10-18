/**
 * when using `matchAllWithOverlap` make sure that your regex has the lookahead operator
 */
export function matchAllWithOverlap(s: string, r: RegExp): string[] {
  return Array.from(s.matchAll(r), (x) => x[1]);
}
