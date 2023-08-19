import { InvalidDtoObjectException } from '../exceptions/InvalidDtoObjectException';

export abstract class DtoValidator {
  protected abstract isValid(): boolean;

  protected validate(): void {
    if (!this.isValid()) {
      throw new InvalidDtoObjectException(`${this.constructor.name} is not valid!`);
    }
  }
}