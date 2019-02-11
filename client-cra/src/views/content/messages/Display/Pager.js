import React from 'react';

const MessagePager = ({ limit, pageInfo, fetchMore, children }) => {

  const handleClick = () => {
    fetchMore({
      variables: {
        cursor: pageInfo.endCursor,
        limit,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }

        return {
          messages: {
            ...fetchMoreResult.messages,
            edges: [
              ...previousResult.messages.edges,
              ...fetchMoreResult.messages.edges,
            ],
          },
        };
      },
    });
  };

  return (
    <button type="button" onClick={handleClick}>
      {children}
    </button>
  );
};

export default MessagePager;
