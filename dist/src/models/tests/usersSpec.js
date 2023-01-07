"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var users_1 = require("../users");
var store = new users_1.UserStore();
describe("User Model ", function () {
    it("Should have an read method", function () {
        expect(store.create).toBeDefined();
    });
});
