import React from 'react';
import { shallow } from 'enzyme';
import GroceryItem from '@testco/components/GroceryItem';


describe('GroceryItem', () => {
  test('Should render the item', () => {
    const itemProps = {
      name: 'Dummy item',
      categories: [{ name: 'Entertainment' }],
      handleDeleteItem: (_id: string) => { return (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>) => { } },
      handleDeleteTag: (_id: string, tag: string) => { return (e: Event) => { } },
      handleUpdateItemName: (_id: string, newName: string) => { },
      handleTagItem: (_id: string, tag: string) => { },
    }
    const wrapper = shallow(<GroceryItem {...itemProps} />);

    expect(wrapper).toBeTruthy();
  });
})
