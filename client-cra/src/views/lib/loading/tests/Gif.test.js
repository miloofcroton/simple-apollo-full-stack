import React from 'react';
import { shallow } from 'enzyme';
import Gif from '../Gif';

describe('<Gif />', () => {

  it('matches Snapshot', () => {

    const wrapper = shallow(
      <Gif />
    );
    expect(wrapper).toMatchSnapshot();
  });

});
