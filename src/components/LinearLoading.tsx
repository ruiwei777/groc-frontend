import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    position: 'fixed',
    width: '98%',
    top: '67px',
  },
});

const LinearIndeterminate: React.FC<{}> = (props) => {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <LinearProgress />
    </div>
  );
}

export default LinearIndeterminate;