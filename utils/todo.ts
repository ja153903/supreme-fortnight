export class TODO extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TODO";
  }
}
