import { ForbiddenError } from 'apollo-server';
import { combineResolvers, skip } from 'graphql-resolvers';

export const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError('Not authenticated as user.');

export const isAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, ctx) =>
    ctx.me.role === 'ADMIN'
      ? skip
      : new ForbiddenError('Not authorized as admin.'),
);

export const isMessageOwner = async (parent, args, ctx) => {
  const message = await ctx.models.Message.findById(id);
  const { id } = args;
  if (message.userId != ctx.me.id) {
    throw new ForbiddenError('Not authenticated as owner.');
  }

  return skip;
};
