export default class InvalidItemError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidItemError";
  }
}
