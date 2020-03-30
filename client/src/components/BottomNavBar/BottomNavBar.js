import React from 'react';
import './BottomNavBar.css'

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HistoryIcon from '@material-ui/icons/History';
import { positions } from '@material-ui/system';


const useStyles = makeStyles(theme => ({
  marginAutoContainer: {
    width: '100 %',
    // height: 80,
    position: 'fixed',
    bottom:0,
    // display: 'flex',
    backgroundColor: 'red',
  },
  marginAutoItem: {
    margin: 'auto'
  },
  alignItemsAndJustifyContent: {
    width: '100 %',
    // // height: 80,
    // display: 'flex',
    position:'fixed',
    bottom:'0',
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'red',
  },
}))

const styles = {
  stickToBottom: {
    width:'100%',
    position:'fixed',
    bottom:0,

},
}

const BottomNavBar = (props) => {

  const classes = useStyles();
  
  const [value, setValue] = React.useState(0);


  return (

    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
  
    >
            <BottomNavigation className = {classes.stickToBottom} position = "fixed" />
      <BottomNavigationAction label="Search" icon={<SearchIcon />} onClick={props.searchOpen}/>
      <BottomNavigationAction label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction label="Add" icon={<AddCircleIcon />} />
      <BottomNavigationAction label="Past" icon={<HistoryIcon />} />

    </BottomNavigation>

  )
}


export default BottomNavBar
