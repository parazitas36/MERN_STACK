"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DtoValidator = void 0;
const InvalidDtoObjectException_1 = require("../exceptions/InvalidDtoObjectException");
class DtoValidator {
    validate() {
        if (!this.isValid()) {
            throw new InvalidDtoObjectException_1.InvalidDtoObjectException(`${this.constructor.name} is not valid!`);
        }
    }
}
exports.DtoValidator = DtoValidator;
