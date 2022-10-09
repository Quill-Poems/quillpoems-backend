
import { PrismaClient } from "@prisma/client";
import { posts } from '../data/posts'
import { users } from "../data/users";

const prisma = new PrismaClient()

async function main(){
    await prisma.user.createMany({
        data: users
    })

    // await prisma.post.createMany({
    //     data: posts,
    // })
}

main()
    .catch((e) =>{
        console.log(e)
        process.exit(1);
    })
        .finally(async () => {
        await prisma.$disconnect();
    })