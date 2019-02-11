import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLID,
} from 'graphql/type';
import ObjectId from './objects/ObjectId';

export default {
  object: GraphQLObjectType,
  nonNull: GraphQLNonNull,
  string: GraphQLString,
  nonNullString: GraphQLNonNull(GraphQLString),
  list: GraphQLList,
  nonNullList: GraphQLNonNull(GraphQLList),
  id: GraphQLID,
  nonNullId: GraphQLNonNull(GraphQLID),
  objectId: ObjectId,
  nonNullObjectId: GraphQLNonNull(ObjectId),
};
