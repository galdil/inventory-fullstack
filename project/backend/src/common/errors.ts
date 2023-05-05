export class ProductCreationException extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}
