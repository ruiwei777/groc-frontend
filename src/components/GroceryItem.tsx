// React & 3rd party
import React from 'react';

// Material UI
import Chip from '@material-ui/core/Chip';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(0.5, 1),
      marginBottom: theme.spacing(1),
    },
    chip: {
      margin: theme.spacing(1),
    },
    form: {
      display: 'inline-block',
      margin: 0,
    },
    formControl: {
      margin: theme.spacing(1),
    },
  }),
);

interface GrocerItemProps {
  _id?: string;
  name: string;
  categories: { name: string }[];
  handleDeleteItem: (_id: string) => (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>) => void;
  handleDeleteTag: (_id: string, tag: string) => (e: Event) => void;
  handleUpdateItemName: (_id: string, newName: string) => void;
  handleTagItem: (_id: string, tag: string) => void;
}

const GroceryItem: React.FC<GrocerItemProps> = (props) => {
  const { name, categories, handleDeleteItem, handleDeleteTag, handleUpdateItemName, _id, handleTagItem } = props;
  const classes = useStyles(props);
  const [editingName, setEditingName] = React.useState(false);
  const [newName, setNewName] = React.useState('');
  const [addingNewTag, setAddingNewTag] = React.useState(false);
  const [newTag, setNewTag] = React.useState('');

  const handleUpdateBegin = async () => {
    if (!editingName) {
      setEditingName(true);
      setNewName('');
    } else {
      await handleUpdateItemName(_id, newName);
      setEditingName(false);
    }
  }

  const handleNewNameChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const newValue = e.target.value;
    setNewName(newValue);
  }

  const handleNewNameSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEditingName(false);
    await handleUpdateItemName(_id, newName);
  }

  const beginAddNewTag = () => {
    setAddingNewTag(true);
  }

  const handleNewTagChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const newValue = e.target.value;
    setNewTag(newValue);
  }

  const handleNewTagSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAddingNewTag(false);
    await handleTagItem(_id, newTag);
  }

  return (
    <Paper className={classes.root}>
      <Typography variant="h5" component="h3">
        {editingName ?
          <form onSubmit={handleNewNameSubmit} className={classes.form}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="component-simple">Name</InputLabel>
              <Input id="component-simple" value={newName} onChange={handleNewNameChange} required autoFocus aria-describedby="Enter new name of the grocery item here" />
            </FormControl>
          </form>

          : name}

        <IconButton aria-label="Edit grocery item" onClick={handleUpdateBegin}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="Remove grocery item" onClick={handleDeleteItem(_id)}>
          <CloseIcon />
        </IconButton>
      </Typography>

      Categories:
      {categories.map(({ name: tag }) => (
        <Chip
          label={tag}
          onDelete={handleDeleteTag(_id, tag)}
          className={classes.chip}
          color="primary"
          key={tag}
        />
      ))}

      {addingNewTag ? <form onSubmit={handleNewTagSubmit} className={classes.form}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="component-simple">New Category Tag</InputLabel>
          <Input id="component-simple" value={newTag} onChange={handleNewTagChange} required autoFocus aria-describedby="Enter new tag of the grocery item here" />
        </FormControl>
      </form> :
        <IconButton aria-label="Add new grocery item" onClick={beginAddNewTag} color="secondary">
          <AddCircleIcon />
        </IconButton>
      }


    </Paper>
  );
}

export default GroceryItem;
