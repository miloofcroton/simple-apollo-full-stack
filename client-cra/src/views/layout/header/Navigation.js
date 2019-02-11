import React from 'react';
import styled from 'styled-components';
import { ROUTES } from '../../layout/routes';
import SignOutButton from '../../lib/session/SignOut';

import { StyledLink } from '../../lib/styles/Links';

const StyledList = styled.ul`
  list-style: none;
  padding: 0px;
`;

const Navigation = ({ session }) => (
  <div>
    {session && session.me ? (
      <NavigationAuth session={session} />
    ) : (
      <NavigationNonAuth />
    )}
  </div>
);

const NavigationAuth = ({ session }) => (
  <StyledList>
    <li>
      <StyledLink to={ROUTES.ACCOUNT.linkTo()}>Account ({session.me.username})</StyledLink>
    </li>
    {session &&
      session.me &&
      session.me.role === 'ADMIN' && (
      <li>
        <StyledLink to={ROUTES.ADMIN.linkTo()}>Admin</StyledLink>
      </li>
    )}
    <li>
      <SignOutButton />
    </li>
  </StyledList>
);

const NavigationNonAuth = () => (
  <StyledList>
    <li>
      <StyledLink to={ROUTES.SIGN_IN.linkTo()}>Sign In</StyledLink>
    </li>
  </StyledList>
);

export default Navigation;
