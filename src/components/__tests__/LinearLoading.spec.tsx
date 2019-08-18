import React from 'react';
import { shallow } from 'enzyme';
import LinearLoading from '@testco/components/LinearLoading';


describe('LinearLoading', () => {
  test('Should render the loading item', () => {
    const wrapper = shallow(<LinearLoading />);

    expect(wrapper).toBeTruthy();
  });
})
