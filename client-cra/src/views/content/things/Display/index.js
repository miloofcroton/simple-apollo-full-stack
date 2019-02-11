import React from 'react';
import { Query } from 'react-apollo';
import Loading from '../../../lib/loading/Gif';
import ThingList from './List';
import {
  GET_THINGS
} from '../../../../data/resources/things/queries';

const Things = ({ limit }) => {

  return (
    <Query
      query={GET_THINGS}
      variables={{ limit }}
    >
      {({ data, loading, error, fetchMore }) => {
        if (!data) {
          return (
            <div> There are no things yet ... Try to create one by yourself.</div>
          );
        }

        const { things } = data;

        if (loading || !things) return <Loading />;

        return (
          <ThingList things={things} />
        );
      }}
    </Query>
  );
};

export default Things;
