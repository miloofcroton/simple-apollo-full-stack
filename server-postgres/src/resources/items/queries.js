import {
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
} from 'graphql/type';
import { Item } from './objects';

export default {
  item: {
    type: Item,
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    resolve: async (parent, { id }, { models }) => {
      return await models.Item.findById(id);
    },
  },
  items: {
    type: GraphQLList(Item),
    resolve: async (parent, args, { models }) => {
      return await models.Item.findAll();
    },
  }
};
