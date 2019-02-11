import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import Loading from '../../../lib/loading/Gif';
import MessageList from './List';
import MessagePager from './Pager';
import {
  GET_PAGINATED_MESSAGES_WITH_USERS
} from '../../../../data/resources/messages/queries';

const Messages = ({ limit }) => {

  return (
    <Query
      query={GET_PAGINATED_MESSAGES_WITH_USERS}
      variables={{ limit }}
    >
      {({ data, loading, error, fetchMore, subscribeToMore }) => {
        if (!data) {
          return (
            <div> There are no messages yet ... Try to create one by yourself.</div>
          );
        }

        const { messages } = data;

        if (loading || !messages) return <Loading />;

        const { edges, pageInfo } = messages;

        return (
          <Fragment>
            <MessageList
              messages={edges}
              subscribeToMore={subscribeToMore}
            />

            {pageInfo.hasNextPage && (
              <MessagePager
                limit={limit}
                pageInfo={pageInfo}
                fetchMore={fetchMore}
              >
                More
              </MessagePager>
            )}
          </Fragment>
        );
      }}
    </Query>
  );
};

export default Messages;
