import React from 'react';
import withSession from '../../lib/session/withSession';
import Display from './Display';
import Create from './Create';

const Landing = ({ session }) => (
  <div>
    <h2>Messages</h2>

    {session && session.me && <Create />}
    <Display limit={2} />
  </div>
);

export default withSession(Landing);
