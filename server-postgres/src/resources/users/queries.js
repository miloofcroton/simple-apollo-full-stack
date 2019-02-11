import {
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
} from 'graphql/type';
import { User } from './objects';

export default {

  user: {
    type: User,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve: async (parent, { id }, { models }) => {
      return await models.User.findById(id);
    },
  },
  users: {
    type: GraphQLList(User),
    resolve: async (parent, args, { models }) => {
      return await models.User.findAll();
    },
  },
  me: {
    type: User,
    resolve: async (parent, args, { models, me }) => {
      if (!me) return null;
      else return await models.User.findById(me.id);
    }
  }

};
