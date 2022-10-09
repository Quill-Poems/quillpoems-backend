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
router.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var posts_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma_1["default"].post.findMany({
                        include: {
                            comments: true,
                            likedBy: true
                        }
                    })];
            case 1:
                posts_1 = _a.sent();
                res.json(posts_1);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/:author', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var author, posts_2, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                author = req.params.author;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma_1["default"].post.findMany({
                        where: {
                            authorUsername: author
                        },
                        include: {
                            comments: true,
                            likedBy: true
                        }
                    })];
            case 2:
                posts_2 = _a.sent();
                res.json(posts_2);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.log(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get('/:author/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, authoredPost, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma_1["default"].post.findUnique({
                        where: {
                            id: id
                        },
                        include: {
                            comments: true,
                            likedBy: true
                        }
                    })];
            case 2:
                authoredPost = _a.sent();
                res.json(authoredPost);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.log(error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router["delete"]('/:author/:id', security.requireAuthenticatedUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var author, id, deletedPost, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                author = req.params.author;
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma_1["default"].post["delete"]({
                        where: {
                            id: id
                        }
                    })];
            case 2:
                deletedPost = _a.sent();
                res.json(deletedPost);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                console.log(error_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post('/:author', security.requireAuthenticatedUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var author, data, user, createdPost, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                author = req.params.author;
                data = req.body.data;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prisma_1["default"].user.findUnique({
                        where: {
                            username: author
                        }
                    })];
            case 2:
                user = _a.sent();
                return [4 /*yield*/, prisma_1["default"].post.create({
                        data: {
                            author: {
                                connect: { id: user.id }
                            },
                            content: data.content,
                            title: data.title
                        }
                    })];
            case 3:
                createdPost = _a.sent();
                res.json(createdPost);
                return [3 /*break*/, 5];
            case 4:
                error_5 = _a.sent();
                console.log(error_5);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.post('/like/:username/:postid', security.requireAuthenticatedUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, postid, username, user, interactedPost, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, postid = _a.postid, username = _a.username;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prisma_1["default"].user.findUnique({
                        where: {
                            username: username
                        }
                    })];
            case 2:
                user = _b.sent();
                delete user['password'];
                return [4 /*yield*/, prisma_1["default"].post.update({
                        where: {
                            id: postid
                        },
                        data: {
                            likedBy: {
                                connect: { id: user.id }
                            }
                        },
                        include: {
                            likedBy: true
                        }
                    })];
            case 3:
                interactedPost = _b.sent();
                res.json(interactedPost);
                return [3 /*break*/, 5];
            case 4:
                error_6 = _b.sent();
                console.log(error_6);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.post('/unlike/:username/:postid', security.requireAuthenticatedUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, postid, username, user, interactedPost, error_7;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, postid = _a.postid, username = _a.username;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prisma_1["default"].user.findUnique({
                        where: {
                            username: username
                        }
                    })];
            case 2:
                user = _b.sent();
                delete user['password'];
                return [4 /*yield*/, prisma_1["default"].post.update({
                        where: {
                            id: postid
                        },
                        data: {
                            likedBy: {
                                disconnect: { id: user.id }
                            }
                        },
                        include: {
                            likedBy: true
                        }
                    })];
            case 3:
                interactedPost = _b.sent();
                res.json(interactedPost);
                return [3 /*break*/, 5];
            case 4:
                error_7 = _b.sent();
                console.log(error_7);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.post('/favorite/:username/:postid', security.requireAuthenticatedUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, postid, username, user, interactedPost, error_8;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, postid = _a.postid, username = _a.username;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prisma_1["default"].user.findUnique({
                        where: {
                            username: username
                        }
                    })];
            case 2:
                user = _b.sent();
                delete user['password'];
                return [4 /*yield*/, prisma_1["default"].post.update({
                        where: {
                            id: postid
                        },
                        data: {
                            favoritedBy: {
                                connect: { id: user.id }
                            }
                        },
                        include: {
                            favoritedBy: true
                        }
                    })];
            case 3:
                interactedPost = _b.sent();
                res.json(interactedPost);
                return [3 /*break*/, 5];
            case 4:
                error_8 = _b.sent();
                console.log(error_8);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.post('/unfavorite/:username/:postid', security.requireAuthenticatedUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, postid, username, user, interactedPost, error_9;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, postid = _a.postid, username = _a.username;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prisma_1["default"].user.findUnique({
                        where: {
                            username: username
                        }
                    })];
            case 2:
                user = _b.sent();
                delete user['password'];
                return [4 /*yield*/, prisma_1["default"].post.update({
                        where: {
                            id: postid
                        },
                        data: {
                            favoritedBy: {
                                disconnect: { id: user.id }
                            }
                        },
                        include: {
                            favoritedBy: true
                        }
                    })];
            case 3:
                interactedPost = _b.sent();
                res.json(interactedPost);
                return [3 /*break*/, 5];
            case 4:
                error_9 = _b.sent();
                console.log(error_9);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
module.exports = router;
//# sourceMappingURL=posts.js.map