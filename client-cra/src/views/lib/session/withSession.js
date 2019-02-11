import React from 'react';
import { Query } from 'react-apollo';
import { CHECK_TOKEN } from './../../../data/resources/sessions/queries';

const withSession = Component => props => (
  <Query query={CHECK_TOKEN}>
    {({ data, refetch }) => (
      <Component {...props} session={data} refetch={refetch} />
    )}
  </Query>
);

export default withSession;
