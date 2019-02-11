import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLBoolean,
} from 'graphql';

// MODELS
import sequelize from '../services/postgres/connection';

export const models = {
  User: sequelize.import('./users/model'),
  Message: sequelize.import('./messages/model'),
  Item: sequelize.import('./items/model'),
  Thing: sequelize.import('./things/model'),
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});


// LOADERS
import * as userLoaders from './users/loaders';
export const loaders = {
  user: userLoaders,
};


// QUERIES
import itemQueries from './items/queries';
import thingQueries from './things/queries';
import userQueries from './users/queries';
import messageQueries from './messages/queries';
const queries = new GraphQLObjectType({
  name: 'RootQueries',
  description: 'Root queries',
  fields: () => ({
    _: { name: '_', type: GraphQLBoolean },
    ...itemQueries,
    ...thingQueries,
    ...userQueries,
    ...messageQueries,
  })
});

// MUTATIONS
import itemMutations from './items/mutations';
import thingMutations from './things/mutations';
import userMutations from './users/mutations';
import messageMutations from './messages/mutations';
const mutations = new GraphQLObjectType({
  name: 'RootMutations',
  description: 'Root mutations',
  fields: () => ({
    _: { name: '_', type: GraphQLBoolean },
    ...itemMutations,
    ...thingMutations,
    ...userMutations,
    ...messageMutations,
  })
});

// SUBSCRIPTIONS
import { PubSub } from 'apollo-server';
import messageSubscriptions from './messages/subscriptions';
const subscriptions = new GraphQLObjectType({
  name: 'RootSubscriptions',
  description: 'Root subscriptions',
  fields: () => ({
    _: { name: '_', type: GraphQLBoolean },
    ...messageSubscriptions,
  })
});
export const pubsub = new PubSub();


// EVENTS (ACTION TYPES)
import { MESSAGE_EVENTS } from './messages/subscriptions';
export const EVENTS = {
  MESSAGE: MESSAGE_EVENTS,
};

// SCHEMA
export const schema = new GraphQLSchema({
  query: queries,
  mutation: mutations,
  subscription: subscriptions,
});
