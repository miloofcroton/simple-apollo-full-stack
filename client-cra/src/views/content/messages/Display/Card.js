import React from 'react';
import MessageDelete from './Delete';
import withSession from '../../../lib/session/withSession';

const MessageCardBase = ({ message, session }) => {

  return (
    <div>
      <h3>{message.user.username}</h3>
      <small>{message.createdAt}</small>
      <p>{message.text}</p>

      {session &&
        session.me &&
        message.user.id === session.me.id && (
        <MessageDelete message={message} />
      )}
    </div>
  );
};

const MessageCard = withSession(MessageCardBase);

export default MessageCard;
