import React from 'react'
import './App.css'
import LoginPage from './components/LoginPage'
import BottomNavBar from './components/BottomNavBar'
import TopNavBar from './components/TopNavBar'
import HomePage from './components/HomePage'
import SearchModal from './components/SearchModal'

import { makeStyles } from '@material-ui/core/styles';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

//Styling
const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))


const App = () => {

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [openSearchModal, setOpenSearchModal] = React.useState(false);

  const handleOpenSearchModal = () => {
    setOpenSearchModal(true);
  };

  const handleCloseSearchModal = () => {
    setOpenSearchModal(false);
  };


  return (
    <>
      <Router>
        <div>
          <TopNavBar />
          <Switch>
            <Route exact path="/">
              <LoginPage />
            </Route>
            <Route path="/homepage">
            <HomePage />
            </Route>
          </Switch>
          <SearchModal open={openSearchModal} handleClose={handleCloseSearchModal} classes={classes}
            modalStyle={modalStyle}
          />
          <BottomNavBar searchOpen={handleOpenSearchModal} />

        </div>
      </Router>


    </>
  );
}

export default App;
