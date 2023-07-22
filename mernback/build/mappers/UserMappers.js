"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapToIUserGetDto = exports.MapToIUser = void 0;
const Role_1 = require("../enums/Role");
function MapToIUser(user) {
    return {
        email: user.email,
        name: user.name,
        password: user.password,
        role: user.role,
        surname: user.email,
    };
}
exports.MapToIUser = MapToIUser;
function MapToIUserGetDto(user) {
    return {
        email: user.email,
        id: user.id,
        name: user.name,
        role: Role_1.Role[user.role],
        surname: user.surname,
    };
}
exports.MapToIUserGetDto = MapToIUserGetDto;
