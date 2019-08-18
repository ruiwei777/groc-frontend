// React & 3rd party
import React from 'react';

// Material UI
import Chip from '@material-ui/core/Chip';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(0.5, 1),
      marginBottom: theme.spacing(1),
      maxWidth: '500px',
      margin: '0 auto',
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
      display: 'block',
      width: '100%'
    },
    button: {
      margin: theme.spacing(1),
    },
    input: {
      width: '97%',
    },
    buttonWrapper: {
      textAlign: 'center'
    }
  }),
);

interface GroceryItemFormProps {
  addNewGroceryItem: (name: string, categories: { name: string }[]) => void;
}


const GroceryItemForm: React.FC<GroceryItemFormProps> = (props) => {
  const { addNewGroceryItem } = props;
  const classes = useStyles(props);
  const [name, setName] = React.useState('');
  const [tag, setTag] = React.useState('');
  const [categories, setCategories] = React.useState([]);

  const handleSubmit = async (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (name && categories.length) {
      await addNewGroceryItem(name, categories);

      setName('');
      setCategories([]);
    }
  }



  const handleNameChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const newValue = e.target.value;
    setName(newValue);
  }

  const handleTagChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const newValue = e.target.value;
    setTag(newValue);
  }

  const beginAddNewTag = () => {
    if (tag) {
      categories.push({ name: tag });
      setTag('');
    }
  }

  const handleDeleteTag = (tag: string) => {
    return (e: Event) => {
      const newCategories = categories.filter(c => c.name !== tag);
      setCategories(newCategories);
    }
  }

  return <Paper className={classes.root}>
    <FormControl className={classes.formControl} fullWidth>
      <InputLabel htmlFor="name">New item name</InputLabel>
      <Input id="name" value={name} onChange={handleNameChange} required autoFocus aria-describedby="Enter the new item's name here" className={classes.input}/>
    </FormControl>

    Categories:
      {categories.map(({ name: tag }) => (
      <Chip
        label={tag}
        onDelete={handleDeleteTag(tag)}
        className={classes.chip}
        color="primary"
        key={tag}
      />
    ))}
    <FormControl className={classes.formControl} fullWidth>
      <InputLabel htmlFor="name">New tag</InputLabel>
      <Input id="name" value={tag} onChange={handleTagChange} aria-describedby="Enter the new item's tag here" className={classes.input}/>
      {tag && <IconButton aria-label="Add new grocery item" onClick={beginAddNewTag} color="secondary">
        <AddCircleIcon />
      </IconButton>}
    </FormControl>

    <div className={classes.buttonWrapper}>
      <Button aria-label="Add new grocery item" variant="contained" color="primary" className={classes.button} onClick={handleSubmit} disabled={!name || !categories.length}>
        Add New
      </Button>
    </div>

  </Paper>
}

export default GroceryItemForm;
