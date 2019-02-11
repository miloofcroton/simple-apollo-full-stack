import React from 'react';
import { shallow } from 'enzyme';
import Paragraph from '../Paragraph';

describe('<Paragraph />', () => {

  it('matches Snapshot', () => {

    const wrapper = shallow(
      <Paragraph />
    );
    expect(wrapper).toMatchSnapshot();
  });

});
