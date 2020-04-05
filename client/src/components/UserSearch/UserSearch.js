import React from 'react';
import './UserSearch.css'
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

const UserSearch = (props) => {
  const classes = useStyles();
  
  return (
    <>
    <Container>
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Friends Search"
        inputProps={{ 'aria-label': 'Friends Search' }}
        name="searchText"
        onChange={props.onChangeSearchText}
      />
      <IconButton 
      type="submit" 
      className={classes.iconButton} aria-label="search"
      onClick={props.searchClick}
      >
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />

    </Paper>
      </Container>
    </>
  )
}

export default UserSearch
