"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const mongoose_1 = require("mongoose");
const ItemDetails_1 = require("./ItemDetails");
const itemSchema = new mongoose_1.Schema({
    amount: { type: Number, required: true },
    category: { type: Number, required: true },
    description: { type: String, required: true },
    details: { type: [ItemDetails_1.ItemDetailsSchema], required: false },
    name: { type: String, required: true },
});
exports.Item = (0, mongoose_1.model)('Item', itemSchema);
