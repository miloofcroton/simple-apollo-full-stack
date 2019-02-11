import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} from 'graphql/type';
import ObjectId from '../../services/graphql/objects/ObjectId';
import Model from './model';
import { Message, MessageConnection } from './objects';
import { toCursorHash, fromCursorHash } from './methods';

export default {

  message: {
    type: Message,
    args: {
      id: { type: new GraphQLNonNull(ObjectId) }
    },
    resolve: async (parent, args, ctx) => {
      return await ctx.models.Message.findById(args.id);
    },
  },

  messages: {
    type: MessageConnection,
    args: {
      cursor: { type: GraphQLString },
      limit: { type: GraphQLInt },
    },
    resolve: async (parent, { cursor, limit = 100 }, ctx) => {
      const cursorOptions = cursor
        ? {
          createdAt: {
            $lt: fromCursorHash(cursor),
          },
        }
        : {};
      const messages = await Model.find(
        cursorOptions,
        null,
        {
          sort: { createdAt: -1 },
          limit: limit + 1,
        },
      );

      const hasNextPage = messages.length > limit;
      const edges = hasNextPage ? messages.slice(0, -1) : messages;

      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor: toCursorHash(
            edges[edges.length - 1].createdAt.toString(),
          ),
        },
      };
    },
  }
};
