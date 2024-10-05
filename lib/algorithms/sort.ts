export function ssort(s: string): string {
  return s
    .split("")
    .sort((a, b) => a.localeCompare(b))
    .join("");
}
