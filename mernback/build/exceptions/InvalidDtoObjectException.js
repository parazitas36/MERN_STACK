"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidDtoObjectException = void 0;
class InvalidDtoObjectException extends Error {
    constructor(message) {
        super(message);
        this.__proto__ = Error;
        Object.setPrototypeOf(this, InvalidDtoObjectException.prototype);
    }
}
exports.InvalidDtoObjectException = InvalidDtoObjectException;
