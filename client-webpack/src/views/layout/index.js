import React from 'react';
import { Router, Route } from 'react-router-dom';

import Navigation from '../lib/Navigation';
import LandingPage from '../content/Landing';
import SignUpPage from '../lib/Session/SignUp';
import SignInPage from '../lib/Session/SignIn';
import SignOutPage from '../lib/Session/SignOut';
import AccountPage from '../content/Account';
import AdminPage from '../content/Admin';
import withSession from '../lib/Session/withSession';

import * as routes from '../routes';
import history from '../routes/history';

const App = ({ session, refetch }) => (
  <Router history={history}>
    <div>
      <Navigation session={session} />

      <hr />

      <Route
        exact
        path={routes.LANDING}
        component={() => <LandingPage />}
      />
      <Route
        exact
        path={routes.SIGN_UP}
        component={() => <SignUpPage refetch={refetch} />}
      />
      <Route
        exact
        path={routes.SIGN_IN}
        component={() => <SignInPage refetch={refetch} />}
      />
      <Route
        exact
        path={routes.SIGN_OUT}
        component={() => <SignOutPage refetch={refetch} />}
      />
      <Route
        exact
        path={routes.ACCOUNT}
        component={() => <AccountPage />}
      />
      <Route
        exact
        path={routes.ADMIN}
        component={() => <AdminPage />}
      />
    </div>
  </Router>
);

export default withSession(App);
