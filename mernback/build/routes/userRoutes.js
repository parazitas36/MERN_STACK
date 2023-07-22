"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRouter = void 0;
const express_1 = require("express");
const UserPostDto_1 = require("../DTOs/user/UserPostDto");
const InvalidDtoObjectException_1 = require("../utils/exceptions/InvalidDtoObjectException");
const userEndpoints_1 = require("./routeEnums/userEndpoints");
const router = (0, express_1.Router)();
router.post(userEndpoints_1.UserEndpoints.Base, (req, res) => {
    const userDto = req.body;
    try {
        new UserPostDto_1.UserPostDto(userDto);
        res.status(201).send();
    }
    catch (error) {
        if (error instanceof InvalidDtoObjectException_1.InvalidDtoObjectException) {
            console.log(error.message);
        }
        res.status(409).send();
    }
});
exports.UsersRouter = router;
