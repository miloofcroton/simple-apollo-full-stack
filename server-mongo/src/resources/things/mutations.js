import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql/type';
import ObjectId from '../../services/graphql/objects/ObjectId';
import prepare from '../../lib/prepare';
import Model from './model';
import { Thing } from './objects';

export default {
  createThing: {
    type: Thing,
    args: {
      title: { type: GraphQLString },
      description: { type: GraphQLString },
    },
    resolve: (parent, args, ctx) => {
      const { title, description } = args;
      if (ctx.me) return Model
        .create({ title, description })
        .then(prepare);

      else return [];
    },
  },
  deleteThing: {
    type: Thing,
    args: { id: { type: GraphQLNonNull(ObjectId) } },
    resolve: (parent, args, ctx) => {
      if (ctx.me) return Model
        .findOneAndDelete({ _id: args.id })
        .then(prepare);

      else return [];
    },
  }
};
