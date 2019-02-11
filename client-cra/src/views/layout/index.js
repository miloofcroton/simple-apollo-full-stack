import React, { Fragment } from 'react';
import { Router, Switch } from 'react-router-dom';
import Switches from './switches';

import { ThemeProvider } from 'styled-components';
import constants from './theme/constants';
import GlobalStyle from './theme/style';

import Head from './head';
import Header from './header';
import Footer from './footer';

import withSession from '../lib/session/withSession';

import createHistory from 'history/createBrowserHistory';
export const history =  createHistory();

const App = ({ session, refetch }) => (
  <ThemeProvider theme={constants}>
    <Router history={history}>
      <Fragment>
        <Head />
        <GlobalStyle />
        <Header session={session} />
        <Switch>{Switches(refetch)}</Switch>
        <Footer />
      </Fragment>
    </Router>
  </ThemeProvider>
);

export default withSession(App);
