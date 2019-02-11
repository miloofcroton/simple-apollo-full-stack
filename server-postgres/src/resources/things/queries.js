import {
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
} from 'graphql/type';
import { Thing } from './objects';

export default {
  thing: {
    type: Thing,
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    resolve: async (parent, { id }, { models, me }) => {
      if (me) return await models.Thing.findById(id);
      else return [];
    },
  },
  things: {
    type: GraphQLList(Thing),
    resolve: async (parent, args, { models, me }) => {
      if (me) return await models.Thing.findAll();
      else return [];
    },
  }
};
