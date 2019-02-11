import React from 'react';
import Create from './Create';
import Display from './Display';
import styled from 'styled-components';

const ItemsSection = styled.section`
  /* add style */
`;


/*
*/


const Items = () => {
  return (
    <ItemsSection>
      <Create />
      <Display limit={3} />
    </ItemsSection>
  );
};

export default Items;
