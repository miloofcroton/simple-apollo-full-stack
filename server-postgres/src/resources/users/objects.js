import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
} from 'graphql/type';
import { Message } from '../messages/objects';

export const User = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    username: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    role: { type: GraphQLString },
    messages: {
      type: GraphQLList(Message),
      resolve: async (user, args, { models }) => {
        return await models.Message.findAll({
          where: {
            userId: user.id,
          },
        });
      },
    }
  })
});

export const Token = new GraphQLObjectType({
  name: 'Token',
  fields: () => ({
    token: { type: GraphQLNonNull(GraphQLString) },
  })
});
