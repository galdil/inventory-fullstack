export class ProductCreationException extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

export class ProductStatsException extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

export class ProductByTypeException extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}
