// @ts-nocheck
import { nonNull, objectType, stringArg, extendType, arg } from 'nexus';

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.string('id');
    t.float('rating');
    t.int('likes');
    t.string('title');
    t.string('content');
    t.string('authorId');
    t.string('authorUsername')
  },
});


// Fetch all Posts
export const PostsQuery = extendType({
    type: 'Query',
    definition(t) {
     t.nonNull.list.field('posts', {
        type: 'Post',
        resolve(_parent, _args, context) {
            return context.prisma.post.findMany();
        }
     })
    },
  });

// Get Unique Post by Username
export const PostByUsernameQuery = extendType({
  type: 'Query',
  definition(t) {
   t.nonNull.list.field('posts', {
      type: 'Post',
      args: { username: stringArg()},
      resolve(_parent, args, context) {
          return context.prisma.post.findMany({
            where: {
              authorUsername: args.username,
            }
          });
      }
   })
  },
});

// // Create post
// export const CreatePostMutation = extendType({
//   type: 'Mutation',
//   definition(t) {
//     t.nonNull.field('createPost', {
//       type: 'Post',
//       args: {
//         title: nonNull(stringArg()),
//         content: nonNull(stringArg()),
//         username: nonNull(stringArg()),
//       },
//       async resolve(_parent, args, context) {

//         const newPost = {
//           title: args.title,
//           content: args.content,
//           rating: 0,
//           author:
//         };

//         return await context.prisma.post.create({
//           data: newPost,
//         });
//       },
//     });
//   },
// });

// Update Post
export const UpdatePostMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('updatePost', {
      type: 'Post',
      args: {
        id: nonNull(stringArg()),
        title: nonNull(stringArg()),
        content: nonNull(stringArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.post.update({
          where: { id: args.id },
          data: {
            title: args.title,
            content: args.content
          },
        });
      },
    });
  },
});

// Delete Post
export const DeleteLinkMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('deletePost', {
      type: 'Post',
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.post.delete({
          where: { id: args.id },
        });
      },
    });
  },
});