export const resolvers = {
  Query: {
    tasks: async (_parent, args, ctx) => await ctx.prisma.task.findMany(),
  },
};
