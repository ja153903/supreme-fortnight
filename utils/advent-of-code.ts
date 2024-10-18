export async function readInputToArray(filepath: string): Promise<string[]> {
  const file = Bun.file(filepath);
  const data = await file.text();
  return data.split("\n").filter(Boolean);
}

export async function readInputToString(filepath: string): Promise<string> {
  const file = Bun.file(filepath);
  return await file.text();
}
