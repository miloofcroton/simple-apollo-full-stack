import { pubsub, EVENTS } from '../index';
import { MessageCreated } from './objects';

export const MESSAGE_EVENTS = {
  CREATED: 'CREATED',
};

export default {

  messageCreated: {
    type: MessageCreated,
    subscribe: () => pubsub.asyncIterator(EVENTS.MESSAGE.CREATED),
  }

};
