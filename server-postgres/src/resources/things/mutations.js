import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
} from 'graphql/type';
import { Thing } from './objects';

export default {
  createThing: {
    type: Thing,
    args: {
      title: { type: GraphQLNonNull(GraphQLString) },
      description: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, { title, description }, { models, me }) => {
      if (me) {
        const thing = await models.Thing.create({
          title,
          description,
        });
        return thing;
      }
      else return [];
    },
  },
  deleteThing: {
    type: Thing,
    args: { id: { type: GraphQLNonNull(GraphQLID) } },
    resolve: async (parent, { id }, { models, me }) => {
      if (me) return await models.Thing.destroy({ where: { id } });
      else return [];
    },
  }
};
