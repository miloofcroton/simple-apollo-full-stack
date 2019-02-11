import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledLink = styled(Link)`
  box-sizing: border-box;
  margin: 5px;
  padding: 8px;
  text-decoration: none;
  font-size: 18px;
  color: black;
  background-color: ${ ({ theme }) => theme.primary};
  border: 1px solid ${ ({ theme }) => theme.black};

  &:hover {
    background-color: ${ ({ theme }) => theme.secondary};
  }
`;
