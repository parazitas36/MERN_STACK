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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUser = exports.RegisterUser = void 0;
const UserPostDto_1 = require("../DTOs/user/UserPostDto");
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserMappers_1 = require("../mappers/UserMappers");
function RegisterUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userDto = req.body;
        yield TryCreateUser(userDto, res);
    });
}
exports.RegisterUser = RegisterUser;
function LoginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userDto = req.body;
        const user = yield User_1.User.findOne({ email: userDto.email }).exec();
        if (user === null) {
            res.send(404).send();
            return;
        }
        const isPasswordCorrect = yield bcrypt_1.default.compare(userDto.password, user.password);
        MakeLoginResponse(isPasswordCorrect, user, res);
    });
}
exports.LoginUser = LoginUser;
function TryCreateUser(userDto, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield CreateUser(new UserPostDto_1.UserPostDto(userDto), res);
        }
        catch (error) {
            HandleCreateUserError(error, res);
        }
    });
}
function CreateUser(user, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield User_1.User.findOne({ email: user.email }).exec();
        if (existingUser !== null) {
            res.status(409).send();
            return;
        }
        yield User_1.User.create(yield PrepareUserDataForCreation(user));
        res.status(201).send();
    });
}
function HandleCreateUserError(error, res) {
    console.log(error.message);
    res.status(409).send();
}
function PrepareUserDataForCreation(user) {
    return __awaiter(this, void 0, void 0, function* () {
        user.password = yield bcrypt_1.default.hash(user.password, 5);
        return (0, UserMappers_1.MapToIUser)(user);
    });
}
function MakeLoginResponse(isPasswordCorrect, user, res) {
    if (isPasswordCorrect) {
        res.status(200).send((0, UserMappers_1.MapToIUserGetDto)(user));
        return;
    }
    res.status(404).send();
}
