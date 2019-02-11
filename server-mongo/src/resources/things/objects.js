import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType,
} from 'graphql/type';
import ObjectId from '../../services/graphql/objects/ObjectId';

export const Thing = new GraphQLObjectType({
  name: 'Thing',
  fields: () => ({
    id: { type: GraphQLNonNull(ObjectId) },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
  })
});
