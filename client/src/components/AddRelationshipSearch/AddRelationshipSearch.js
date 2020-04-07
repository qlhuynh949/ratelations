import React from 'react';
import './AddRelationshipSearch.css'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
 
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const AddRelationshipSearch = (props) => {
  const classes = useStyles();
  
  return (
    <>
      
      <Container key="RelationshipSearchContainer">
      <Paper component="form" className={classes.root}>
      <h5>Add A Relationship</h5>&nbsp;
      <InputBase
        className={classes.input}
        placeholder="Search for a partner"
        inputProps={{ 'aria-label': 'Partner Search' }}
        name="searchPartnerText"
        onChange={props.onChangeSearchText}
      />
      <IconButton 
      type="submit" 
      className={classes.iconButton} aria-label="search"
      onClick={props.searchPartner}
      >
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />

      </Paper>
      </Container>
    </>
  )
}

export default AddRelationshipSearch
