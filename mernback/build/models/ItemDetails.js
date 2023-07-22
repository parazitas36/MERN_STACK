"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemDetailsSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ItemDetailsSchema = new mongoose_1.Schema({
    description: { type: String, required: true },
    name: { type: String, required: true },
});
