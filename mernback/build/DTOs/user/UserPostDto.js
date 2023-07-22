"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPostDto = void 0;
const Role_1 = require("../../enums/Role");
const DtoValidator_1 = require("../../utils/general/DtoValidator");
class UserPostDto extends DtoValidator_1.DtoValidator {
    constructor(dto) {
        super();
        Object.assign(this, dto, {});
        this.validate();
    }
    isValid() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return (((_b = (_a = this.name) === null || _a === void 0 ? void 0 : _a.trim()) === null || _b === void 0 ? void 0 : _b.length) > 0 &&
            ((_d = (_c = this.email) === null || _c === void 0 ? void 0 : _c.trim()) === null || _d === void 0 ? void 0 : _d.length) > 0 &&
            ((_f = (_e = this.password) === null || _e === void 0 ? void 0 : _e.trim()) === null || _f === void 0 ? void 0 : _f.length) > 0 &&
            this.repeatPassword === this.password &&
            ((_h = (_g = this.surname) === null || _g === void 0 ? void 0 : _g.trim()) === null || _h === void 0 ? void 0 : _h.length) > 0 &&
            Object.values(Role_1.Role).includes(this.role));
    }
}
exports.UserPostDto = UserPostDto;
