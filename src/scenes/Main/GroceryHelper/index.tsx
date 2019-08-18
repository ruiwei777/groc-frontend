
// React & 3rd parth
import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { RouteComponentProps } from 'react-router-dom';
import clsx from 'clsx';

// Material UI
import { Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// Test Co
import LinearLoading from '@testco/components/LinearLoading';
import CategoryItem from '@testco/components/GroceryItem';
import GroceryItemForm from '@testco/components/GroceryItemForm';
import {
  DELETE_GROCERY_ITEM,
  UPDATE_ITEM_NAME,
  UNTAG_ITEM,
  TAG_ITEM,
  ADD_ITEM,
} from '@testco/graphql/GroceryItem/mutation';
import { GROCERY_ITEMS } from '@testco/graphql/GroceryItem/query';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '900px',
      margin: '0 auto'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    searchWrapper: {
      textAlign: 'right'
    }
  }),
);


const GroceryHelper: React.FC<RouteComponentProps> = (props) => {
  const classes = useStyles(props)
  const [nameFilter, setNameFilter] = React.useState('');
  const [deleteGroceryItem, { loading: deleteLoading }] = useMutation(DELETE_GROCERY_ITEM, {
    update(cache, { data: { deleteGroceryItem } }) {
      const { groceryItems } = cache.readQuery({ query: GROCERY_ITEMS });
      cache.writeQuery({
        query: GROCERY_ITEMS,
        data: { groceryItems: groceryItems.filter((g: GroceryItem) => g._id !== deleteGroceryItem._id) },
      });
    }
  });

  const [updateGroceryItemName, { loading: updateLoading }] = useMutation(UPDATE_ITEM_NAME, {
    update(cache, { data: { updateGroceryItemName } }) {
      const { groceryItems } = cache.readQuery({ query: GROCERY_ITEMS });
      cache.writeQuery({
        query: GROCERY_ITEMS,
        data: {
          groceryItems: groceryItems.map((g: GroceryItem) => {
            const { _id, name } = updateGroceryItemName;
            if (g._id === _id) g.name = name;
            return g;
          })
        },
      });
    }
  });

  const [unTagGroceryItem, { loading: unTagLoading }] = useMutation(UNTAG_ITEM, {
    update(cache, { data: { unTagGroceryItem } }) {
      const { groceryItems } = cache.readQuery({ query: GROCERY_ITEMS });
      cache.writeQuery({
        query: GROCERY_ITEMS,
        data: {
          groceryItems: groceryItems.map((g: GroceryItem) => {
            const { _id, categories } = unTagGroceryItem;
            if (g._id === _id) g.categories = categories;
            return g;
          })
        },
      });
    }
  });

  const [tagGroceryItem, { loading: tagLoading }] = useMutation(TAG_ITEM, {
    update(cache, { data: { tagGroceryItem } }) {
      const { groceryItems } = cache.readQuery({ query: GROCERY_ITEMS });
      cache.writeQuery({
        query: GROCERY_ITEMS,
        data: {
          groceryItems: groceryItems.map((g: GroceryItem) => {
            const { _id, categories } = tagGroceryItem;
            if (g._id === _id) g.categories = categories;
            return g;
          })
        },
      });
    }
  });

  const [addGroceryItem, { loading: addLoading }] = useMutation(ADD_ITEM, {
    update(cache, { data: { addGroceryItem } }) {
      const { groceryItems } = cache.readQuery({ query: GROCERY_ITEMS });
      cache.writeQuery({
        query: GROCERY_ITEMS,
        data: {
          groceryItems: groceryItems.concat([addGroceryItem]),
        },
      });
    }
  });


  const { loading: getItemsLoading, error, data: groceryItemData } = useQuery(GROCERY_ITEMS);
  const { groceryItems } = groceryItemData;

  const handleDeleteItem = (_id: string) => {
    return async (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>) => {
      await deleteGroceryItem({ variables: { _id } });
    };
  }

  const handleDeleteTag = (_id: string, tag: string) => {
    return async (e: Event) => {
      await unTagGroceryItem({ variables: { _id, tag } });
    }
  }

  const handleUpdateItemName = async (_id: string, newName: string) => {
    await updateGroceryItemName({ variables: { _id, name: newName } });
  }

  const handleTagItem = async (_id: string, tag: string) => {
    await tagGroceryItem({ variables: { _id, tag } });
  }

  const addNewGroceryItem = async (name: string, categories: { name: string }[]) => {
    await addGroceryItem({ variables: { name, categories } });
  }

  const searchItem = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setNameFilter(e.target.value);
  }

  if (error) return <p>Error :(</p>;

  return <div className={classes.root}>
    <div className={classes.searchWrapper}>

    <TextField
        id="standard-dense"
        label="Search item..."
        className={clsx(classes.textField)}
        margin="dense"
        onChange={searchItem}
      />
    </div>

    {(getItemsLoading || deleteLoading || updateLoading || unTagLoading || tagLoading || addLoading) && <LinearLoading />}
    {groceryItems && groceryItems.filter((g: GroceryItem) => {
      if (nameFilter) {
        const nameVal = g.name.toLowerCase();
        return nameVal.indexOf(nameFilter.toLowerCase()) !== -1;
      }
      return true;
    }).map((g: GroceryItem, index: number) => (
      <CategoryItem {...g} key={`${index}-${g.name}`}
        handleDeleteItem={handleDeleteItem}
        handleDeleteTag={handleDeleteTag}
        handleUpdateItemName={handleUpdateItemName}
        handleTagItem={handleTagItem}
      />
    ))}
    {groceryItems && !groceryItems.length && <Typography variant="h6" aria-label="No items found.">No items found.</Typography>}

    <GroceryItemForm addNewGroceryItem={addNewGroceryItem} />
  </div>
}

export default GroceryHelper;
