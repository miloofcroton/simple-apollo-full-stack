import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { SignUpLink } from './SignUp';
import { ROUTES } from '../../layout/routes';
import ErrorMessage from '../errors/Message';
import { SIGN_IN } from '../../../data/resources/sessions/mutations';

const SignInPage = ({ history, refetch }) => (
  <div>
    <h1>SignIn</h1>
    <SignInForm history={history} refetch={refetch} />
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  login: '',
  password: '',
};

class SignInForm extends Component {
  state = { ...INITIAL_STATE };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (event, signIn) => {
    signIn().then(async ({ data }) => {
      this.setState({ ...INITIAL_STATE });

      localStorage.setItem('token', data.signIn.token);

      await this.props.refetch();

      this.props.history.push(ROUTES.MESSAGES.linkTo());
    });

    event.preventDefault();
  };

  render() {
    const { login, password } = this.state;

    const isInvalid = password === '' || login === '';

    return (
      <Mutation mutation={SIGN_IN} variables={{ login, password }}>
        {(signIn, { data, loading, error }) => (
          <form onSubmit={event => this.onSubmit(event, signIn)}>
            <input
              name="login"
              value={login}
              onChange={this.onChange}
              type="text"
              placeholder="Email or Username"
            />
            <input
              name="password"
              value={password}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
            />
            <button disabled={isInvalid || loading} type="submit">
              Sign In
            </button>

            {error && <ErrorMessage error={error} />}
          </form>
        )}
      </Mutation>
    );
  }
}

export default withRouter(SignInPage);

export { SignInForm };
