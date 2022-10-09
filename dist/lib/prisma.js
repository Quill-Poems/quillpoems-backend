"use strict";
exports.__esModule = true;
// @ts-nocheck
var client_1 = require("@prisma/client");
var config_1 = require("../config");
var prisma = new client_1.PrismaClient();
if (config_1.NODENV === 'production') {
    prisma = new client_1.PrismaClient();
}
else {
    if (!global.prisma) {
        global.prisma = new client_1.PrismaClient();
    }
    prisma = global.prisma;
}
exports["default"] = prisma;
//# sourceMappingURL=prisma.js.map