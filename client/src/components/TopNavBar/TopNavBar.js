import React from 'react';
import './TopNavBar.css'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import logo from './logo.png'
import red from '@material-ui/core/colors/red'
import LockIcon from '@material-ui/icons/Lock'
import PersonIcon from '@material-ui/icons/Person';
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
  imageCenter:{
  verticalAlign:'middle',
  paddingBottom: '3px',
  paddingTop: '3px'
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
            
              <img src={logo} className={classes.imageCenter} alt="logo" width="80px" height="80px" />
                     
          </Typography>
          {props.userState.isLoggedIn? (            
            <Link to="/">          
              <IconButton onClick={props.handleSignOut}>
                <LockIcon />
              </IconButton>
              <IconButton>
                <HomeIcon />
              </IconButton>
            </Link>             
          ) : <Link to="/">
              <IconButton>
                <PersonIcon />
              </IconButton>
            </Link>
          }          
        </Toolbar>
      </AppBar>
    </div>
    
  )
}

export default TopNavBar
