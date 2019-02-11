import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { ROUTES } from '../../layout/routes';
import { history } from '../../layout';

const SignOutButton = () => (
  <ApolloConsumer>
    {client => (
      <button type="button" onClick={() => signOut(client)}>
        Sign Out
      </button>
    )}
  </ApolloConsumer>
);

const signOut = client => {
  localStorage.removeItem('token');
  client.resetStore();
  history.push(ROUTES.SIGN_IN.linkTo());
};

export { signOut };

export default SignOutButton;
