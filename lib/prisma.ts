// @ts-nocheck
import { PrismaClient } from '@prisma/client'
import { NODENV } from '../config'

let prisma = new PrismaClient();

if (NODENV === 'production'){
    prisma = new PrismaClient();
} else {
    if (!global.prisma){
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma
}

export default prisma