import React, { useState } from 'react'
import './App.css'
import LoginPage from './components/LoginPage'
import BottomNavBar from './components/BottomNavBar'
import TopNavBar from './components/TopNavBar'
import HomePage from './components/HomePage'
import SearchModal from './components/SearchModal'
import Chart from './components/Chart'
import RegisterPage from './components/Register'

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

  const [itemState, setItemState] = useState({
    items: [],
    searchText: '',
    searchDisplayItems: [],
    itemSnackBar: false
  })


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

  const handleInputChange = ({ target }) => {
    setItemState({ ...itemState, [target.name]: target.value })
  }

  //Sample Person Data
  let Person1Data = [
    { x: new Date("2017- 01- 01"), y: 84.927 },
    { x: new Date("2017- 02- 01"), y: 82.609 },
    { x: new Date("2017- 03- 01"), y: 81.428 },
    { x: new Date("2017- 04- 01"), y: 83.259 },
    { x: new Date("2017- 05- 01"), y: 83.153 },
    { x: new Date("2017- 06- 01"), y: 84.180 },
    { x: new Date("2017- 07- 01"), y: 84.840 },
    { x: new Date("2017- 08- 01"), y: 82.671 },
    { x: new Date("2017- 09- 01"), y: 87.496 },
    { x: new Date("2017- 10- 01"), y: 86.007 },
    { x: new Date("2017- 11- 01"), y: 87.233 },
    { x: new Date("2017- 12- 01"), y: 86.276 }
  ]

  let Person2Data = [
    { x: new Date("2017- 01- 01"), y: 67.515 },
    { x: new Date("2017- 02- 01"), y: 66.725 },
    { x: new Date("2017- 03- 01"), y: 64.86 },
    { x: new Date("2017- 04- 01"), y: 64.29 },
    { x: new Date("2017- 05- 01"), y: 64.51 },
    { x: new Date("2017- 06- 01"), y: 64.62 },
    { x: new Date("2017- 07- 01"), y: 64.2 },
    { x: new Date("2017- 08- 01"), y: 63.935 },
    { x: new Date("2017- 09- 01"), y: 65.31 },
    { x: new Date("2017- 10- 01"), y: 64.75 },
    { x: new Date("2017- 11- 01"), y: 64.49 },
    { x: new Date("2017- 12- 01"), y: 63.84 }
  ]

  return (
    <>
      <Router>
        <div>
          <TopNavBar />
          <Switch>
            <Route exact path="/">
              <LoginPage />
            </Route>
            <Route path="/register">
              <RegisterPage handleInputChange={handleInputChange} />
            </Route>
            <Route path="/homepage">            
              <Chart ChartTitle='Relationship' ChartSubtitles='Jack and Jane' 
              Person1Name='Jack'
              Person1Data = {Person1Data}
              Person1xValueFormatString="MMM YYYY"
              Person1yValueFormatString="#,##0.##"
              Person2Name='Jane'
              Person2Data = {Person2Data}
              Person2xValueFormatString="MMM YYYY"
              Person2yValueFormatString="#,##0.##"
              />
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
