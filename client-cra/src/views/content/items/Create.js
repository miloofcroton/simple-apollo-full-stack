import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import ErrorMessage from '../../lib/errors/Message';
import {
  GET_ITEMS,
} from '../../../data/resources/items/queries';
import {
  CREATE_ITEM,
} from '../../../data/resources/items/mutations';

class ItemCreate extends Component {
  state = {
    title: '',
    description: '',
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = async (event, createItem) => {
    event.preventDefault();

    try {
      await createItem();
      this.setState({ title: '', description: '' });
    } catch (error) { }
  };

  updateItems = (cache, { data: { createItem } }) => {
    const data = cache.readQuery({
      query: GET_ITEMS,
    });

    cache.writeQuery({
      query: GET_ITEMS,
      data: {
        ...data,
        items: {
          ...data.items,
          createItem
          // edges: [createItem, ...data.items.edges],
          // pageInfo: data.items.pageInfo,
        },
      },
    });
  };

  render() {
    const { title, description } = this.state;

    return (
      <Mutation
        mutation={CREATE_ITEM}
        variables={{ title, description }}
        update={this.updateItems}
      >
        {(createItem, { data, loading, error }) => (
          <form
            onSubmit={event => this.onSubmit(event, createItem)}
          >
            <input
              name="title"
              value={title}
              onChange={this.onChange}
              type="text"
              placeholder="The title ..."
            />
            <input
              name="description"
              value={description}
              onChange={this.onChange}
              type="text"
              placeholder="The description ..."
            />
            <button type="submit">Create Item</button>

            {error && <ErrorMessage error={error} />}
          </form>
        )}
      </Mutation>
    );
  }
}

export default ItemCreate;
