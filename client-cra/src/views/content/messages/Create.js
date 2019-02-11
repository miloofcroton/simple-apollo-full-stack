import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import ErrorMessage from '../../lib/errors/Message';
import {
  CREATE_MESSAGE
} from '../../../data/resources/messages/mutations';

class MessageCreate extends Component {
  state = {
    text: '',
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = async (event, createMessage) => {
    event.preventDefault();

    try {
      await createMessage();
      this.setState({ text: '' });
    } catch (error) {}
  };

  render() {
    const { text } = this.state;

    return (
      <Mutation
        mutation={CREATE_MESSAGE}
        variables={{ text }}
      >
        {(createMessage, { data, loading, error }) => (
          <form
            onSubmit={event => this.onSubmit(event, createMessage)}
          >
            <textarea
              name="text"
              value={text}
              onChange={this.onChange}
              type="text"
              placeholder="Your message ..."
            />
            <button type="submit">Send</button>

            {error && <ErrorMessage error={error} />}
          </form>
        )}
      </Mutation>
    );
  }
}

export default MessageCreate;
