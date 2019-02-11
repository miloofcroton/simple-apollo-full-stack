import React from 'react';
import styled from 'styled-components';

import logo from '../../../assets/icons/logo.png';

const LogoWrapper = styled.img`
  width: 50px;
  padding-top: 10px;
`;

const Logo = () => {
  return (
    <LogoWrapper
      alt="logo"
      src={logo}
    />
  );
};

export default Logo;
