class Trie {
  hasWord: boolean;
  children: Map<string, this>;

  constructor() {
    this.hasWord = false;
    this.children = new Map();
  }

  insert(word: string) {
    let current: Trie = this;

    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!current.children.has(char)) {
        current.children.set(char, new Trie());
      }

      current = current.children.get(char)!;
    }

    current.hasWord = true;
  }

  has(word: string): boolean {
    let current: this | undefined = this;

    for (const char of word) {
      if (current === undefined || !current.children.has(char)) {
        return false;
      }

      current = current.children.get(char);
    }

    return current?.hasWord ?? false;
  }

  /**
   * `lcp` returns the longest common prefix given some string
   */
  lcp(prefix: string): number {
    let current: this | undefined = this;
    let depth = 0;

    for (let i = 0; i < prefix.length; i++) {
      const char = prefix[i];
      if (current === undefined || !current.children.has(char)) {
        return depth;
      }

      depth++;
      current = current.children.get(char);
    }

    return depth;
  }

  find(prefix: string): this | null {
    let current: this = this;

    for (let i = 0; i < prefix.length; i++) {
      if (!current.children.has(prefix[i])) {
        return null;
      }

      current = current.children.get(prefix[i])!;
    }

    return current;
  }
}

export { Trie };
