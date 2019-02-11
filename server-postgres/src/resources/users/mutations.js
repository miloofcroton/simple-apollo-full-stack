import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
} from 'graphql/type';
import { combineResolvers } from 'graphql-resolvers';
import { AuthenticationError, UserInputError } from 'apollo-server';
import { isAdmin } from '../sessions/queries';
import { createToken } from '../sessions/methods';
import { Token } from '../sessions/objects';
import { User } from './objects';

export default {
  signUp: {
    type: GraphQLNonNull(Token),
    args: {
      username: { type: GraphQLNonNull(GraphQLString) },
      email: { type: GraphQLNonNull(GraphQLString) },
      password: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (
      parent,
      { username, email, password },
      { models, secret },
    ) => {
      const user = await models.User.create({
        username,
        email,
        password,
      });

      return { token: createToken(user, secret, '30m') };
    },
  },
  signIn: {
    type: GraphQLNonNull(Token),
    args: {
      login: { type: GraphQLNonNull(GraphQLString) },
      password: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (
      parent,
      { login, password },
      { models, secret },
    ) => {
      const user = await models.User.findByLogin(login);

      if (!user) {
        throw new UserInputError(
          'No user found with this login credentials.',
        );
      }

      const isValid = await user.validatePassword(password);

      if (!isValid) {
        throw new AuthenticationError('Invalid password.');
      }

      return { token: createToken(user, secret, '30m') };
    },
  },
  updateUser: {
    type: GraphQLNonNull(User),
    args: {
      username: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (
      parent,
      { login, password },
      { models, secret },
    ) => {
      const user = await models.User.findByLogin(login);



      return { token: createToken(user, secret, '30m') };
    },
  },
  deleteUser: {
    type: GraphQLNonNull(GraphQLBoolean),
    args: {
      id: { type: GraphQLNonNull(GraphQLID), },
    },
    resolve: combineResolvers(
      isAdmin,
      async (parent, { id }, { models }) => {
        const user = await models.User.findById(id);

        if (user) {
          await user.remove();
          return true;
        } else {
          return false;
        }
      },
    ),
  },
};
