import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType,
} from 'graphql/type';
import ObjectId from '../../services/graphql/objects/ObjectId';

export const Item = new GraphQLObjectType({
  name: 'Item',
  fields: () => ({
    id: { type: GraphQLNonNull(ObjectId) },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
  })
});
