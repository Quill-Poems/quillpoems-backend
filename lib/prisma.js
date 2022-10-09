// @ts-nocheck
const { PrismaClient } = require('@prisma/client')
const NODENV = require('../config')

let prisma = new PrismaClient();

if (NODENV === 'production'){
    prisma = new PrismaClient();
} else {
    if (!global.prisma){
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma
}

module.exports = prisma;