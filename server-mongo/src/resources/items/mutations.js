import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql/type';
import ObjectId from '../../services/graphql/objects/ObjectId';
import prepare from '../../lib/prepare';
import Model from './model';
import { Item } from './objects';

export default {
  createItem: {
    type: Item,
    args: {
      title: { type: GraphQLString },
      description: { type: GraphQLString },
    },
    resolve: (parent, args, ctx) => {
      const { title, description } = args;
      return Model
        .create({ title, description })
        .then(prepare);
    },
  },
  deleteItem: {
    type: Item,
    args: { id: { type: GraphQLNonNull(ObjectId) } },
    resolve: (parent, args, ctx) => {
      return Model
        .findOneAndDelete({ _id: args.id })
        .then(prepare);

      // A couple alternative patterns:

      // const item = await ctx.models.Item.findById(id);
      // if (item) {
      //   await item.remove();
      //   return true;
      // } else {
      //   return false;
      // }
    },
  }
};
