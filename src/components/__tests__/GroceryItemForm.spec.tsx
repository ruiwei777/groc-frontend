import React from 'react';
import { shallow } from 'enzyme';
import GroceryItemForm from '@testco/components/GroceryItemForm';


describe('GroceryItemForm', () => {
  test('Should render the form', () => {
    const itemProps = {
      addNewGroceryItem: (name: string, categories: { name: string }[]) => {},
    }
    const wrapper = shallow(<GroceryItemForm {...itemProps} />);

    expect(wrapper).toBeTruthy();
  });
})
