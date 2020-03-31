import React from 'react';
import './TopNavBar.css'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'

import red from '@material-ui/core/colors/red'
import LockIcon from '@material-ui/icons/Lock'
import HomeIcon from '@material-ui/icons/Home';

import {
  Link
} from 'react-router-dom'


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
  bar: {
    backgroundColor: red[900] 
  }
}));


const TopNavBar = (props) => {
  
  const classes = useStyles();

  return (

    <div className={classes.root}>
      <AppBar className={classes.bar} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Ratelations
          </Typography>
          {props.userState.isLoggedIn && (
            <Link to="/">          
              <IconButton onClick={props.handleSignOut}>
                <LockIcon />
              </IconButton>
            </Link>
          )}          
          <Link to="/internal">
            <IconButton>
              <HomeIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
    
  )
}

export default TopNavBar
