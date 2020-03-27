import React from 'react';
import './TopNavBar.css'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';

import {
  Link
} from 'react-router-dom'


import HomeIcon from '@material-ui/icons/Home';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const TopNavBar = (props) => {
  
  const classes = useStyles();

  return (

    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Ratelations
          </Typography>
          <Link to="/homepage">
          <IconButton>
            <HomeIcon />
          </IconButton>
          </Link>
          <Link exact to="/">
          <IconButton>
            <PersonIcon />
          </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
    
  )
}

export default TopNavBar
