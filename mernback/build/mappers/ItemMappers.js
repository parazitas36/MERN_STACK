"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapToIItem = void 0;
function MapToIItem(dto) {
    return {
        amount: dto.amount,
        category: dto.category,
        description: dto.description,
        details: dto.details,
        name: dto.name,
    };
}
exports.MapToIItem = MapToIItem;
