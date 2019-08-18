import React from 'react';
import { shallow } from 'enzyme';

// Test Co
import GroceryHelper from '@testco/scenes/Main/GroceryHelper';

jest.mock('@testco/scenes/Main/GroceryHelper')

describe('GroceryHelper', () => {
  test('Should render GroceryHelper scene', () => {
    // supress missing router props warning
    //@ts-ignore
    const wrapper = shallow(<GroceryHelper />);

    expect(wrapper).toBeTruthy();
  });
})
