import mongoose from 'mongoose';
import * as api from './helpers';
import { connect } from '../../../services/mongo/connection';
import { models } from '../../index';

let db;
let expectedUsers;
let expectedUser;
let expectedAdminUser;

beforeAll(async () => {
  db = await connect();

  expectedUsers = await models.User.find();

  expectedUser = expectedUsers.filter(
    user => user.role !== 'ADMIN',
  )[0];

  expectedAdminUser = expectedUsers.filter(
    user => user.role === 'ADMIN',
  )[0];
});

afterAll(async () => {
  await db.connection.close();
});

describe('users', () => {

  describe('user(id: String!): User', () => {
    it('returns a user when user can be found', async () => {
      const expectedResult = {
        data: {
          user: {
            id: expectedUser.id,
            username: expectedUser.username,
            email: expectedUser.email,
            role: null,
          },
        },
      };

      const result = await api.user({ id: expectedUser.id });

      expect(result.data).toEqual(expectedResult);
    });

    it('returns null when user cannot be found', async () => {
      const expectedResult = {
        data: {
          user: null,
        },
      };

      const result = await api.user({
        id: new mongoose.Types.ObjectId(),
      });

      expect(result.data).toEqual(expectedResult);
    });
  });

  describe('users: [User!]', () => {
    it('returns a list of users', async () => {
      const expectedResult = {
        data: {
          users: [
            {
              id: expectedAdminUser.id,
              username: expectedAdminUser.username,
              email: expectedAdminUser.email,
              role: expectedAdminUser.role,
            },
            {
              id: expectedUser.id,
              username: expectedUser.username,
              email: expectedUser.email,
              role: null,
            },
          ],
        },
      };

      const result = await api.users();

      expect(result.data).toEqual(expectedResult);
    });
  });

  describe('me: User', () => {
    it('returns null when no user is signed in', async () => {
      const expectedResult = {
        data: {
          me: null,
        },
      };

      const { data } = await api.me();

      expect(data).toEqual(expectedResult);
    });

    it('returns me when me is signed in', async () => {
      const expectedResult = {
        data: {
          me: {
            id: expectedAdminUser.id,
            username: expectedAdminUser.username,
            email: expectedAdminUser.email,
          },
        },
      };

      const {
        data: {
          data: {
            signIn: { token },
          },
        },
      } = await api.signIn({
        login: 'iamroot',
        password: 'Passw0rd!',
      });

      const { data } = await api.me(token);

      expect(data).toEqual(expectedResult);
    });
  });

  describe('signUp, updateUser, deleteUser', () => {
    it('signs up a user, updates a user and deletes the user as admin', async () => {
      // sign up

      let {
        data: {
          data: {
            signUp: { token },
          },
        },
      } = await api.signUp({
        username: 'Zorro',
        email: 'zorro@oldwest.com',
        password: 'testtest',
      });

      const expectedNewUser = await models.User.findByLogin(
        'zorro@oldwest.com',
      );

      const {
        data: {
          data: { me },
        },
      } = await api.me(token);

      expect(me).toEqual({
        id: expectedNewUser.id,
        username: expectedNewUser.username,
        email: expectedNewUser.email,
      });

      // update as user

      const {
        data: {
          data: { updateUser },
        },
      } = await api.updateUser({ username: 'Zorro' }, token);

      expect(updateUser.username).toEqual('Zorro');

      // delete as admin

      const {
        data: {
          data: {
            signIn: { token: adminToken },
          },
        },
      } = await api.signIn({
        login: 'iamroot',
        password: 'Passw0rd!',
      });

      const {
        data: {
          data: { deleteUser },
        },
      } = await api.deleteUser({ id: me.id }, adminToken);

      expect(deleteUser).toEqual(true);
    });
  });

  describe('deleteUser(id: String!): Boolean!', () => {
    it('returns an error because only admins can delete a user', async () => {
      const {
        data: {
          data: {
            signIn: { token },
          },
        },
      } = await api.signIn({
        login: 'thedude',
        password: 'duderino',
      });

      const {
        data: { errors },
      } = await api.deleteUser({ id: expectedAdminUser.id }, token);

      expect(errors[0].message).toEqual('Not authorized as admin.');
    });
  });

  describe('updateUser(username: String!): User!', () => {
    it('returns an error because only authenticated users can update a user', async () => {
      const {
        data: { errors },
      } = await api.updateUser({ username: 'Zorro' });

      expect(errors[0].message).toEqual('Not authenticated as user.');
    });
  });

  describe('signIn(login: String!, password: String!): Token!', () => {
    it('returns a token when a user signs in with username', async () => {
      const {
        data: {
          data: {
            signIn: { token },
          },
        },
      } = await api.signIn({
        login: 'thedude',
        password: 'duderino',
      });

      expect(typeof token).toBe('string');
    });

    it('returns a token when a user signs in with email', async () => {
      const {
        data: {
          data: {
            signIn: { token },
          },
        },
      } = await api.signIn({
        login: 'dude@dude.com',
        password: 'duderino',
      });

      expect(typeof token).toBe('string');
    });

    it('returns an error when a user provides a wrong password', async () => {
      const {
        data: { errors },
      } = await api.signIn({
        login: 'thedude',
        password: 'dontknow',
      });

      expect(errors[0].message).toEqual('Invalid password.');
    });
  });

  it('returns an error when a user is not found', async () => {
    const {
      data: { errors },
    } = await api.signIn({
      login: 'dontknow',
      password: 'duderino',
    });

    expect(errors[0].message).toEqual(
      'No user found with this login credentials.',
    );
  });
});
