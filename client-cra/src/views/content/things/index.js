import React, { Fragment } from 'react';
import Create from './Create';
import Display from './Display';
import styled from 'styled-components';
import withSession from '../../lib/session/withSession';

const ThingsSection = styled.section`
  /* add style */
`;

const Things = ({ session }) => {
  return (
    <ThingsSection>
      <h2>Things</h2>
      {session && session.me &&
        <Fragment>
          <Create />
          <Display limit={3} />
        </Fragment>
      }

    </ThingsSection>
  );
};

export default withSession(Things);
