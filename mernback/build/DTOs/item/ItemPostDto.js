"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemPostDto = void 0;
const ItemCategory_1 = require("../../enums/ItemCategory");
const DtoValidator_1 = require("../../utils/general/DtoValidator");
class ItemPostDto extends DtoValidator_1.DtoValidator {
    constructor(dto) {
        super();
        Object.assign(this, dto, {});
        this.amount = dto.amount | 0;
        this.validate();
    }
    isValid() {
        var _a, _b, _c, _d;
        return (((_b = (_a = this.name) === null || _a === void 0 ? void 0 : _a.trim()) === null || _b === void 0 ? void 0 : _b.length) > 0 && ((_d = (_c = this.description) === null || _c === void 0 ? void 0 : _c.trim()) === null || _d === void 0 ? void 0 : _d.length) > 0 && this.amount >= 0,
            Object.values(ItemCategory_1.ItemCategory).includes(this.category));
    }
}
exports.ItemPostDto = ItemPostDto;
