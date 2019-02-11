import React from 'react';
import styled from 'styled-components';

import Logo from './Logo';
import Statements from './Statements';

const StyledFooter = styled.footer`
  color: black;
  p {
    margin: 5px auto;
  }
`;

const Footer = () => {

  return (
    <StyledFooter>
      <Logo/>
      <Statements/>
    </StyledFooter>
  );
};

export default Footer;
