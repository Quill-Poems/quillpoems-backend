"use strict";
exports.__esModule = true;
exports.DeleteLinkMutation = exports.UpdatePostMutation = exports.PostByUsernameQuery = exports.PostsQuery = exports.Post = void 0;
// @ts-nocheck
var nexus_1 = require("nexus");
exports.Post = (0, nexus_1.objectType)({
    name: 'Post',
    definition: function (t) {
        t.string('id');
        t.float('rating');
        t.int('likes');
        t.string('title');
        t.string('content');
        t.string('authorId');
        t.string('authorUsername');
    }
});
// Fetch all Posts
exports.PostsQuery = (0, nexus_1.extendType)({
    type: 'Query',
    definition: function (t) {
        t.nonNull.list.field('posts', {
            type: 'Post',
            resolve: function (_parent, _args, context) {
                return context.prisma.post.findMany();
            }
        });
    }
});
// Get Unique Post by Username
exports.PostByUsernameQuery = (0, nexus_1.extendType)({
    type: 'Query',
    definition: function (t) {
        t.nonNull.list.field('posts', {
            type: 'Post',
            args: { username: (0, nexus_1.stringArg)() },
            resolve: function (_parent, args, context) {
                return context.prisma.post.findMany({
                    where: {
                        authorUsername: args.username
                    }
                });
            }
        });
    }
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
exports.UpdatePostMutation = (0, nexus_1.extendType)({
    type: 'Mutation',
    definition: function (t) {
        t.nonNull.field('updatePost', {
            type: 'Post',
            args: {
                id: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                title: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                content: (0, nexus_1.nonNull)((0, nexus_1.stringArg)())
            },
            resolve: function (_parent, args, ctx) {
                return ctx.prisma.post.update({
                    where: { id: args.id },
                    data: {
                        title: args.title,
                        content: args.content
                    }
                });
            }
        });
    }
});
// Delete Post
exports.DeleteLinkMutation = (0, nexus_1.extendType)({
    type: 'Mutation',
    definition: function (t) {
        t.nonNull.field('deletePost', {
            type: 'Post',
            args: {
                id: (0, nexus_1.nonNull)((0, nexus_1.stringArg)())
            },
            resolve: function (_parent, args, ctx) {
                return ctx.prisma.post["delete"]({
                    where: { id: args.id }
                });
            }
        });
    }
});
//# sourceMappingURL=Post.js.map