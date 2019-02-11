import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
} from 'graphql/type';
import { Message } from './objects';
import { combineResolvers } from 'graphql-resolvers';
import { pubsub, EVENTS } from '../index';
import { isAuthenticated, isMessageOwner } from '../sessions/queries';


export default {
  createMessage: {
    type: GraphQLNonNull(Message),
    args: {
      text: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: combineResolvers(
      isAuthenticated,
      async (parent, { text }, { models, me }) => {
        const message = await models.Message.create({
          text,
          userId: me.id,
        });

        pubsub.publish(EVENTS.MESSAGE.CREATED, {
          messageCreated: { message },
        });

        return message;
      },
    ),
  },
  deleteMessage: {
    type: Message,
    args: { id: { type: GraphQLNonNull(GraphQLID) } },
    resolve: combineResolvers(
      isAuthenticated,
      isMessageOwner,
      async (parent, { id }, { models }) => {
        return await models.Message.destroy({ where: { id } });
      },
    ),
  }
};
