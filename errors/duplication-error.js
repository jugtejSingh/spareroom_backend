export default class DuplicationError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidItemError";
  }
}
