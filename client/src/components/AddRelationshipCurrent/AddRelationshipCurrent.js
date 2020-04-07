import React from 'react';
import './AddRelationshipCurrent.css'
import { makeStyles } from '@material-ui/core/styles';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

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
          <Grid item xs={8}>
            <Typography>User:{props.userState.firstName} {props.userState.lastName}
            </Typography>
          <Typography>Partner:{props.userState.partnerFirstName} {props.userState.partnerLirstName}
          </Typography>
          </Grid>
          <Grid item xs={4}>
          <Button key="BreakupButton" onClick={props.breakup}><BrokenImageIcon  /></Button>
          </Grid>
        </Grid>        
    </>

  )
}

export default AddRelationshipCurrent
