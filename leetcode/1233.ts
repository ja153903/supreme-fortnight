import { Trie } from "@lib/data-structures/trie";

function removeSubfolders(folder: string[]): string[] {
  // one idea i have here to create a trie
  // this way we know the exact path from the root
  // then as we insert the subfolders into the trie
  // we know when there exists a subfolder by checking the trie
  const trie = new Trie();
  const result: string[] = [];

  folder.sort((a, b) => a.length - b.length);

  for (const path of folder) {
    const asCleanPath = path
      .split("/")
      .filter((part) => part.length && part !== "/");
    if (trie.hasAtoms(asCleanPath)) {
      continue;
    }

    trie.insert(asCleanPath);
    result.push(path);
  }

  return result;
}

export { removeSubfolders };
