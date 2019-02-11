import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
} from 'graphql/type';
import { Item } from './objects';

export default {
  createItem: {
    type: Item,
    args: {
      title: { type: GraphQLNonNull(GraphQLString) },
      description: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, { title, description }, { models }) => {
      const item = await models.Item.create({
        title,
        description,
      });

      return item;
    },
  },
  deleteItem: {
    type: Item,
    args: { id: { type: GraphQLNonNull(GraphQLID) } },
    resolve: async (parent, { id }, { models }) => {
      return await models.Item.destroy({ where: { id } });
    },
  }
};
