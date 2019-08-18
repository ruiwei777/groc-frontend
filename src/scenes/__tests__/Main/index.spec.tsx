import React from 'react';
import { shallow } from 'enzyme';
import Main from '@testco/scenes/Main/index';


describe('Main', () => {
  test('Should render Main scene', () => {
    // supress missing router props warning
    //@ts-ignore
    const wrapper = shallow(<Main />);

    expect(wrapper).toBeTruthy();
  });
})
