import React from 'react';
import './BottomNavBar.css'

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HistoryIcon from '@material-ui/icons/History';


const useStyles = makeStyles({
  root: {
    width: 500,
  }
});


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
      <BottomNavigationAction label="Search" icon={<SearchIcon />} onClick={props.searchOpen}/>
      <BottomNavigationAction label="Home" icon={<HomeIcon />} onClick={props.homeOpen}/>
      <BottomNavigationAction label="Add" icon={<AddCircleIcon />} onClick={props.addOpen}/>
      <BottomNavigationAction label="Past" icon={<HistoryIcon onClick={props.historyOpen}/>} />

    </BottomNavigation>

  )
}

export default BottomNavBar
