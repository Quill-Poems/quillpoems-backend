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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
// @ts-nocheck
var express = require('express');
var router = express.Router();
var prisma_1 = __importDefault(require("../lib/prisma"));
var security = require('../middleware/security');
router.post('/follow/:username/:receptor', security.requireAuthenticatedUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, receptor, followerUser, followedUser, exchange, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, username = _a.username, receptor = _a.receptor;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                if (username == receptor) {
                    res.json({ cant: "execute" });
                }
                return [4 /*yield*/, prisma_1["default"].user.findUnique({
                        where: {
                            username: username
                        }
                    })];
            case 2:
                followerUser = _b.sent();
                return [4 /*yield*/, prisma_1["default"].user.findUnique({
                        where: {
                            username: receptor
                        }
                    })];
            case 3:
                followedUser = _b.sent();
                return [4 /*yield*/, prisma_1["default"].user.update({
                        where: {
                            username: followerUser === null || followerUser === void 0 ? void 0 : followerUser.username
                        },
                        data: {
                            following: {
                                connect: { id: followedUser.id }
                            }
                        },
                        include: {
                            followedBy: true,
                            following: true
                        }
                    })];
            case 4:
                exchange = _b.sent();
                delete followedUser['password'];
                if (exchange) {
                    res.json({ followedUser: followedUser });
                }
                return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                console.log(error_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
router.post('/unfollow/:username/:receptor', security.requireAuthenticatedUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, receptor, followerUser, followedUser, exchange, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, username = _a.username, receptor = _a.receptor;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, prisma_1["default"].user.findUnique({
                        where: {
                            username: username
                        }
                    })];
            case 2:
                followerUser = _b.sent();
                return [4 /*yield*/, prisma_1["default"].user.findUnique({
                        where: {
                            username: receptor
                        }
                    })];
            case 3:
                followedUser = _b.sent();
                delete followedUser['password'];
                return [4 /*yield*/, prisma_1["default"].user.update({
                        where: {
                            username: followerUser === null || followerUser === void 0 ? void 0 : followerUser.username
                        },
                        data: {
                            following: {
                                disconnect: { id: followedUser.id }
                            }
                        }
                    })];
            case 4:
                exchange = _b.sent();
                if (exchange) {
                    res.json({ successful: "exchange" });
                }
                return [3 /*break*/, 6];
            case 5:
                error_2 = _b.sent();
                console.log(error_2);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
module.exports = router;
//# sourceMappingURL=social.js.map