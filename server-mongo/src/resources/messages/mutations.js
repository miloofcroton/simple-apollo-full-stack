import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql/type';
import ObjectId from '../../services/graphql/objects/ObjectId';
import Model from './model';
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
      async (parent, args, ctx) => {
        const message = await Model.create({
          text: args.text,
          userId: ctx.me.id,
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
    args: { id: { type: GraphQLNonNull(ObjectId) } },
    resolve: combineResolvers(
      isAuthenticated,
      isMessageOwner,
      async (parent, args, ctx) => {
        const message = await Model.findById(args.id);

        if (message) {
          await message.remove();
          return true;
        } else {
          return false;
        }
      },
    ),
  }
};
