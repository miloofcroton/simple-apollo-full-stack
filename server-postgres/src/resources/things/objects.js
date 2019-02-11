import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType,
  GraphQLID,
} from 'graphql/type';

export const Thing = new GraphQLObjectType({
  name: 'Thing',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLNonNull(GraphQLString) },
  })
});
