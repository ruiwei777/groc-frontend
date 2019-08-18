import React from 'react';
import { shallow } from 'enzyme';
import App from '@testco/App';


describe('App', () => {
  test('Should render App', () => {
    // supress missing router props warning
    //@ts-ignore
    const wrapper = shallow(<App />);

    expect(wrapper).toBeTruthy();
  });
})
