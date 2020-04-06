import React from 'react';
import './AddRelationshipCurrent.css'
import { makeStyles } from '@material-ui/core/styles';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.primary,
  },
}));
const AddRelationshipCurrent = (props) => {
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={4}>
          <Typography>Edge-cases</Typography>
        </Grid>
        <Grid item xs={8}>
          <BrokenImageIcon />
        </Grid>
      </Grid>
    </>

  )
}

export default AddRelationshipCurrent
