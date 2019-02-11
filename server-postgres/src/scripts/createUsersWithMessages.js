
import { models } from '../resources';

const createUsersWithMessages = async date => {

  await models.User.create(
    {
      username: 'iamroot',
      email: 'admin@example.com',
      password: 'Passw0rd!',
      role: 'ADMIN',
      messages: [
        {
          text: 'I am root, I am root, I am root...',
          createdAt: date.setSeconds(date.getSeconds() + 1),
        },
      ],
    },
    {
      include: [models.Message],
    },
  );

  await models.User.create(
    {
      username: 'thedude',
      email: 'dude@dude.com',
      password: 'duderino',
      messages: [
        {
          text: 'Dude, chill out...',
          createdAt: date.setSeconds(date.getSeconds() + 1),
        },
        {
          text: 'Can you say anything else?',
          createdAt: date.setSeconds(date.getSeconds() + 1),
        },
      ],
    },
    {
      include: [models.Message],
    },
  );
};

export default createUsersWithMessages;
