import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import ErrorMessage from '../../lib/errors/Message';
import {
  GET_THINGS,
} from '../../../data/resources/things/queries';
import {
  CREATE_THING,
} from '../../../data/resources/things/mutations';

class ThingCreate extends Component {
  state = {
    title: '',
    description: '',
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = async (event, createThing) => {
    event.preventDefault();

    try {
      await createThing();
      this.setState({ title: '', description: '' });
    } catch (error) { }
  };

  updateThings = (cache, { data: { createThing } }) => {
    const data = cache.readQuery({
      query: GET_THINGS,
    });

    cache.writeQuery({
      query: GET_THINGS,
      data: {
        ...data,
        things: {
          ...data.things,
          createThing
          // edges: [createThing, ...data.things.edges],
          // pageInfo: data.things.pageInfo,
        },
      },
    });
  };

  render() {
    const { title, description } = this.state;

    return (
      <Mutation
        mutation={CREATE_THING}
        variables={{ title, description }}
        update={this.updateThings}
      >
        {(createThing, { data, loading, error }) => (
          <form
            onSubmit={event => this.onSubmit(event, createThing)}
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
            <button type="submit">Create Thing</button>

            {error && <ErrorMessage error={error} />}
          </form>
        )}
      </Mutation>
    );
  }
}

export default ThingCreate;
