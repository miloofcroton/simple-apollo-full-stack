import React from 'react';
import { Query } from 'react-apollo';
import Loading from '../../../lib/loading/Gif';
import ItemList from './List';
import {
  GET_ITEMS
} from '../../../../data/resources/items/queries';

const Items = ({ limit }) => {

  return (
    <Query
      query={GET_ITEMS}
      variables={{ limit }}
    >
      {({ data, loading, error, fetchMore }) => {
        if (!data) {
          return (
            <div> There are no items yet ... Try to create one by yourself.</div>
          );
        }

        const { items } = data;

        if (loading || !items) return <Loading />;

        return (
          <ItemList items={items} />
        );
      }}
    </Query>
  );
};

export default Items;
