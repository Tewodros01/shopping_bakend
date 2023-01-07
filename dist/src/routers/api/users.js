"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var users_1 = __importDefault(require("../../handlers/users"));
var userRouter = (0, express_1.Router)();
(0, users_1.default)(userRouter);
exports.default = userRouter;
