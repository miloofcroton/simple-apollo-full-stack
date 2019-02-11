import {
  GraphQLNonNull,
  GraphQLList,
} from 'graphql/type';
import ObjectId from '../../services/graphql/objects/ObjectId';
import { User } from './objects';

export default {

  user: {
    type: User,
    args: {
      id: { type: new GraphQLNonNull(ObjectId) }
    },
    resolve: async (parent, args, ctx) => {
      return await ctx.models.User.findById(args.id);
    },
  },
  users: {
    type: GraphQLList(GraphQLNonNull(User)),
    resolve: async (parent, args, ctx) => {
      return await ctx.models.User.find();
    },
  },
  me: {
    type: User,
    resolve: async (parent, args, ctx) => {
      if (!ctx.me) return null;
      else return await ctx.models.User.findById(ctx.me.id);
    }
  }

};
