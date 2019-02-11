import {
  GraphQLNonNull,
  GraphQLList,
} from 'graphql/type';
import ObjectId from '../../services/graphql/objects/ObjectId';
import prepare from '../../lib/prepare';
import Model from './model';
import { Thing } from './objects';

export default {
  thing: {
    type: Thing,
    args: { id: { type: new GraphQLNonNull(ObjectId) } },
    resolve: (parent, args, ctx) => {
      if (ctx.me) return Model
        .findOne({ _id: args.id })
        .then(prepare);
      else return [];
    },
  },
  things: {
    type: new GraphQLList(Thing),
    resolve: (parent, args, ctx) => {
      if (ctx.me) return Model
        .find()
        .then(prepare);
      else return [];
    },
  }
};
