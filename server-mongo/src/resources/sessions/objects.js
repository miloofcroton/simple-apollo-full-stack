import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType,
} from 'graphql/type';


export const Token = new GraphQLObjectType({
  name: 'Token',
  fields: () => ({
    token: { type: GraphQLNonNull(GraphQLString) },
  })
});
