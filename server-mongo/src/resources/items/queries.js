import {
  GraphQLNonNull,
  GraphQLList,
} from 'graphql/type';
import ObjectId from '../../services/graphql/objects/ObjectId';
import prepare from '../../lib/prepare';
import Model from './model';
import { Item } from './objects';

export default {
  item: {
    type: Item,
    args: { id: { type: new GraphQLNonNull(ObjectId) } },
    resolve: (parent, args, ctx) => {
      return Model
        .findOne({ _id: args.id })
        .then(prepare);
    },
  },
  items: {
    type: new GraphQLList(Item),
    resolve: (parent, args, ctx) => {
      return Model
        .find()
        .then(prepare);
    },
  }
};
