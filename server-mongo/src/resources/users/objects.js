import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
} from 'graphql/type';
import ObjectId from '../../services/graphql/objects/ObjectId';
import { Message } from '../messages/objects';

export const User = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLNonNull(ObjectId) },
    username: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    role: { type: GraphQLString },
    messages: {
      type: GraphQLList(Message),
      resolve: async (user, args, { models }) => {
        return await models.Message.find({
          userId: user.id,
        });
      },
    }
  })
});
