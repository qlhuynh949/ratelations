import React from 'react';
import './AddRelationshipDisplay.css'
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';

import PartnerCard from '../PartnerCard'
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.primary,
  },
}));
const AddRelationshipDisplay = (props) => {
  const classes = useStyles();
  return (
  <>
      {props.searchPartnerState.searchPartnerResults.map(searchItem => (
        <>
          <Grid container className={classes.root}>
            <Grid item xs={6}>
              <PartnerCard searchItem={searchItem} />
            </Grid>
            <Grid item xs={2}>
              <Button onClick={() => props.addPartner(searchItem)}><AddIcon /></Button>
            </Grid>
          </Grid>
        </>
      ))}
  </>
  )
}

export default AddRelationshipDisplay
