import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType,
  GraphQLID,
} from 'graphql/type';

export const Item = new GraphQLObjectType({
  name: 'Item',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
  })
});
