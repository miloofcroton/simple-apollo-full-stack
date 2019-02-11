import 'dotenv/config';

import { models } from '../resources';

const createUsersWithMessages = async date => {

  const user1 = new models.User({
    username: 'iamroot',
    email: 'admin@example.com',
    password: 'Passw0rd!',
    role: 'ADMIN',
  });

  const user2 = new models.User({
    username: 'thedude',
    email: 'dude@dude.com',
    password: 'duderino',
  });

  const message1 = new models.Message({
    text: 'I am root, I am root, I am root...',
    createdAt: date.setSeconds(date.getSeconds() + 1),
    userId: user1.id,
  });

  const message2 = new models.Message({
    text: 'Dude, chill out...',
    createdAt: date.setSeconds(date.getSeconds() + 1),
    userId: user2.id,
  });

  const message3 = new models.Message({
    text: 'Can you say anything else?',
    createdAt: date.setSeconds(date.getSeconds() + 1),
    userId: user2.id,
  });

  await message1.save();
  await message2.save();
  await message3.save();

  await user1.save();
  await user2.save();
};

export default createUsersWithMessages;
