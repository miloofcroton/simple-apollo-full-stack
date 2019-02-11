import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLList,
} from 'graphql/type';
import ObjectId from '../../services/graphql/objects/ObjectId';
import { GraphQLDateTime } from 'graphql-iso-date';
import { User } from '../users/objects';

export const Message = new GraphQLObjectType({
  name: 'Message',
  fields: () => ({
    id: { type: GraphQLNonNull(ObjectId) },
    text: { type: GraphQLNonNull(GraphQLString) },
    createdAt: { type: GraphQLNonNull(GraphQLDateTime) },
    user: {
      type: GraphQLNonNull(User),
      resolve: async (message, args, { loaders }) => {
        return await loaders.user.load(message.userId);
      },
    },
  })
});

export const MessageConnection = new GraphQLObjectType({
  name: 'MessageConnection',
  fields: () => ({
    edges: { type: GraphQLList(GraphQLNonNull(Message)) },
    text: { type: GraphQLNonNull(GraphQLString) },
    pageInfo: { type: GraphQLNonNull(PageInfo) },
  })
});

export const MessageCreated = new GraphQLObjectType({
  name: 'MessageCreated',
  fields: () => ({
    message: { type: Message },
  })
});

export const PageInfo = new GraphQLObjectType({
  name: 'PageInfo',
  fields: () => ({
    hasNextPage: { type: GraphQLNonNull(GraphQLBoolean) },
    endCursor: { type: GraphQLNonNull(GraphQLString) },
  })
});
