// @ts-nocheck
import { enumType, intArg, objectType, stringArg } from 'nexus';
import { extendType } from 'nexus';
import { Post } from './Post';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id');
    t.string('name');
    t.string('email');
    t.string('username')
    t.string('password')
    t.list.field('writtenPosts', {
      type: 'Post',
      async resolve(parent, args, context) {
        return await context.prisma.post.findMany({
          where: {
            authorId: parent.id
          } 
        })
      },
    });
  },
});

// Fetch all Users
export const UserQuery = extendType({
    type: 'Query',
    definition(t) {
     t.nonNull.list.field('users', {
        type: 'User',
        resolve(_parent, _args, context) {
            return context.prisma.user.findMany();
        }
     })
    },
  });


