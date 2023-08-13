export class InvalidDtoObjectException extends Error {
  __proto__: ErrorConstructor = Error;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, InvalidDtoObjectException.prototype);
  }
}