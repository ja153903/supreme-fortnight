/**
 * `ssort` sorts strings in TypeScript by splitting the string by character
 * sorting each character and then joining everything back
 */
export function ssort(s: string): string {
  return s
    .split("")
    .sort((a, b) => a.localeCompare(b))
    .join("");
}
