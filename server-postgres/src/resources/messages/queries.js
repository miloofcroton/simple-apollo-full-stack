import Sequelize from 'sequelize';
import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
} from 'graphql/type';
import { toCursorHash, fromCursorHash } from './methods';
import { Message, MessageConnection } from './objects';

export default {

  message: {
    type: Message,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve: async (parent, { id }, { models }) => {
      return await models.Message.findById(id);
    },
  },

  messages: {
    type: MessageConnection,
    args: {
      cursor: { type: GraphQLString },
      limit: { type: GraphQLInt },
    },
    resolve: async (parent, { cursor, limit = 100 }, { models }) => {
      const cursorOptions = cursor
        ? {
          where: {
            createdAt: {
              [Sequelize.Op.lt]: fromCursorHash(cursor),
            },
          },
        }
        : {};

      const messages = await models.Message.findAll({
        order: [['createdAt', 'DESC']],
        limit: limit + 1,
        ...cursorOptions,
      });

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
