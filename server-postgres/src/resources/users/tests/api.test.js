
import * as api from './helpers';

describe('users', () => {
  describe('user(id: String!): User', () => {
    it('returns a user when user can be found', async () => {
      const expectedResult = {
        data: {
          user: {
            id: '1',
            username: 'rwieruch',
            email: 'hello@robin.com',
            role: 'ADMIN',
          },
        },
      };

      const result = await api.user({ id: '1' });

      expect(result.data).toEqual(expectedResult);
    });

    it('returns null when user cannot be found', async () => {
      const expectedResult = {
        data: {
          user: null,
        },
      };

      const result = await api.user({ id: '42' });

      expect(result.data).toEqual(expectedResult);
    });
  });

  describe('users: [User!]', () => {
    it('returns a list of users', async () => {
      const expectedResult = {
        data: {
          users: [
            {
              id: '1',
              username: 'rwieruch',
              email: 'hello@robin.com',
              role: 'ADMIN',
            },
            {
              id: '2',
              username: 'ddavids',
              email: 'hello@david.com',
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
            id: '1',
            username: 'rwieruch',
            email: 'hello@robin.com',
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
        login: 'rwieruch',
        password: 'rwieruch',
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
        username: 'Mark',
        email: 'mark@gmule.com',
        password: 'asdasdasd',
      });

      const {
        data: {
          data: { me },
        },
      } = await api.me(token);

      expect(me).toEqual({
        id: '3',
        username: 'Mark',
        email: 'mark@gmule.com',
      });

      // update as user

      const {
        data: {
          data: { updateUser },
        },
      } = await api.updateUser({ username: 'Mark' }, token);

      expect(updateUser.username).toEqual('Mark');

      // delete as admin

      const {
        data: {
          data: {
            signIn: { token: adminToken },
          },
        },
      } = await api.signIn({
        login: 'rwieruch',
        password: 'rwieruch',
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
        login: 'ddavids',
        password: 'ddavids',
      });

      const {
        data: { errors },
      } = await api.deleteUser({ id: '1' }, token);

      expect(errors[0].message).toEqual('Not authorized as admin.');
    });
  });

  describe('updateUser(username: String!): User!', () => {
    it('returns an error because only authenticated users can update a user', async () => {
      const {
        data: { errors },
      } = await api.updateUser({ username: 'Mark' });

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
        login: 'ddavids',
        password: 'ddavids',
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
        login: 'hello@david.com',
        password: 'ddavids',
      });

      expect(typeof token).toBe('string');
    });

    it('returns an error when a user provides a wrong password', async () => {
      const {
        data: { errors },
      } = await api.signIn({
        login: 'ddavids',
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
      password: 'ddavids',
    });

    expect(errors[0].message).toEqual(
      'No user found with this login credentials.',
    );
  });
});
