import * as api from './helpers';
import { connect } from '../../../services/mongo/connection';
import { models } from '../../index';
import createUsersWithMessages from '../../../scripts/createUsersWithMessages';

let db;

beforeAll(async () => {
  db = await connect();
  await Promise.all([
    models.User.deleteMany({}),
    models.Message.deleteMany({}),
  ]);
  await createUsersWithMessages(new Date());
});

afterAll(async () => await db.connection.close());

describe('Messages', () => {



  describe('messages (limit: INT)', () => {

    it('returns a list of messages', async () => {
      const expectedResult = {
        data: {
          messages: {
            edges: [
              {
                text: 'Can you say anything else?',
              },
              {
                text: 'Dude, chill out...',
              },
            ],
          },
        },
      };

      const result = await api.messages();

      expect(result.data).toEqual(expectedResult);
    });

    it('should get messages with the users', async () => {
      const expectedResult = {
        data: {
          messages: {
            edges: [
              {
                text: 'Can you say anything else?',
                user: {
                  username: 'thedude',
                },
              },
              {
                text: 'Dude, chill out...',
                user: {
                  username: 'thedude',
                },
              },
            ],
          },
        },
      };

      const result = await api.messagesInclUsers();

      expect(result.data).toEqual(expectedResult);
    });
  });
});
