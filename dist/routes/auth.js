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
var createUser = require('../utils/tokens').createUser;
var security = require('../middleware/security');
var _a = require('../lib/fields'), loginFields = _a.loginFields, registerFields = _a.registerFields, emailRegex = _a.emailRegex;
var _b = require('../utils/errors'), BadRequestError = _b.BadRequestError, UnauthorizedError = _b.UnauthorizedError;
var bcrypt = require('bcrypt');
var BCRYPT_WORK_FACTOR = require('../config').BCRYPT_WORK_FACTOR;
router.post('/register', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    function validateEmaiL(email) {
        return String(email).toLowerCase().match(emailRegex);
    }
    var userData_1, existingUser, hashedPassword, formattedEmail, formattedBirthday, newUser, token, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                userData_1 = req.body.userData;
                // Validating if provided required information.
                registerFields.forEach(function (property) {
                    if (!userData_1.hasOwnProperty(property)) {
                        throw new BadRequestError("Missing ".concat(property, " in request body"));
                    }
                });
                // Validating user email.
                if (!validateEmaiL(userData_1.email)) {
                    throw new BadRequestError("Invalid email");
                }
                return [4 /*yield*/, prisma_1["default"].user.findUnique({
                        where: {
                            email: userData_1.email
                        }
                    })
                    // Check existingUser const is populated means user already exists => Throw error .
                ];
            case 1:
                existingUser = _a.sent();
                // Check existingUser const is populated means user already exists => Throw error .
                if (existingUser) {
                    throw new BadRequestError("A user already exists with the email ".concat(userData_1.email));
                }
                return [4 /*yield*/, bcrypt.hash(userData_1.password, BCRYPT_WORK_FACTOR)
                    // Formatting fields 
                ];
            case 2:
                hashedPassword = _a.sent();
                formattedEmail = userData_1.email.toLowerCase();
                formattedBirthday = new Date(userData_1.birthday.toString());
                return [4 /*yield*/, prisma_1["default"].user.create({
                        data: {
                            firstName: userData_1.firstName,
                            lastName: userData_1.lastName,
                            username: userData_1.username,
                            email: formattedEmail,
                            password: hashedPassword,
                            birthday: formattedBirthday,
                            isAdmin: false
                        }
                    })
                    // Generating token, storing res.locals, deleting password from object to be returned
                ];
            case 3:
                newUser = _a.sent();
                token = createUser(newUser);
                res.locals.token = token;
                res.locals.user = newUser;
                delete newUser['password'];
                res.status(201).json({ newUser: newUser, token: token });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.post('/login', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userData_2, existingUser, validPassword, token, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                userData_2 = req.body.userData;
                // Validating if provided required information.
                loginFields.forEach(function (property) {
                    if (!userData_2.hasOwnProperty(property)) {
                        throw new BadRequestError("Missing ".concat(property, " in request body"));
                    }
                });
                return [4 /*yield*/, prisma_1["default"].user.findUnique({
                        where: {
                            email: userData_2.email
                        }
                    })
                    // If user doesnt exist -> error else continue user validation
                ];
            case 1:
                existingUser = _a.sent();
                if (!!existingUser) return [3 /*break*/, 2];
                throw new BadRequestError("Could not find user matching the credentials provided.");
            case 2: return [4 /*yield*/, bcrypt.compare(userData_2.password, existingUser.password)
                // Storing locals, and returning user object with token.
            ];
            case 3:
                validPassword = _a.sent();
                // Storing locals, and returning user object with token.
                if (validPassword) {
                    delete existingUser['password'];
                    token = createUser(existingUser);
                    res.locals.token = token;
                    res.locals.user = existingUser;
                    res.status(201).json({ existingUser: existingUser, token: token });
                }
                else {
                    throw new BadRequestError("Could not find user matching the credentials provided.");
                }
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
router.get('/me', security.requireAuthenticatedUser, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, existingUser, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = res.locals.user;
                return [4 /*yield*/, prisma_1["default"].user.findUnique({
                        where: {
                            email: user.email
                        }
                    })];
            case 1:
                existingUser = _a.sent();
                delete existingUser['password'];
                res.locals.user = existingUser;
                res.status(200).json({ existingUser: existingUser });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                next(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
module.exports = router;
//# sourceMappingURL=auth.js.map