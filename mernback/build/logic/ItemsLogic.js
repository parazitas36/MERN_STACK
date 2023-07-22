"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostItem = exports.GetItemById = exports.GetAllItemsByCategory = exports.GetAllItems = void 0;
const ItemPostDto_1 = require("../DTOs/item/ItemPostDto");
const Item_1 = require("../models/Item");
const ItemMappers_1 = require("../mappers/ItemMappers");
function GetAllItems(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const items = yield Item_1.Item.find({});
        res.status(200).send(items);
    });
}
exports.GetAllItems = GetAllItems;
function GetAllItemsByCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const items = yield Item_1.Item.find({ category: req.params['category'] });
        res.status(200).send(items);
    });
}
exports.GetAllItemsByCategory = GetAllItemsByCategory;
function GetItemById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const item = yield Item_1.Item.findById(req.params['id']);
        res.status(item !== null ? 200 : 404).send(item);
    });
}
exports.GetItemById = GetItemById;
function PostItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const itemDto = req.body;
        TryCreateItem(itemDto, res);
    });
}
exports.PostItem = PostItem;
function TryCreateItem(itemDto, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield CreateItem(new ItemPostDto_1.ItemPostDto(itemDto), res);
        }
        catch (error) {
            HandleError(error, res);
        }
    });
}
function CreateItem(itemDto, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const existing = yield Item_1.Item.findOne({ name: itemDto.name }).exec();
        if (existing !== null) {
            res.status(409).send();
            return;
        }
        yield Item_1.Item.create((0, ItemMappers_1.MapToIItem)(itemDto));
        res.status(201).send();
    });
}
function HandleError(error, res) {
    console.log(error);
    res.status(409).send();
}
