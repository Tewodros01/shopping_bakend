"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var routers_1 = __importDefault(require("./routers"));
var app = (0, express_1.default)();
var port = process.env.PORT || 3600;
app.use(body_parser_1.default.json());
app.use("/api", routers_1.default);
app.listen(port, function () {
    console.log("Server starting on ".concat(port));
});
