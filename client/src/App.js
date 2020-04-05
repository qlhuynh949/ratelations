import React, { useState} from 'react'
import './App.css'
import LoginPage from './components/LoginPage'
import BottomNavBar from './components/BottomNavBar'
import TopNavBar from './components/TopNavBar'
import HomePage from './components/HomePage'
import SearchModal from './components/SearchModal'
import RelationshipModal from './components/AddRelationship'
import ConnectionsModal from './components/Connections'
import Chart from './components/Chart'
import RegisterPage from './components/Register'
import ForgotPassword from './components/ForgotPassword'
import User from './utils/User'
import Paper from '@material-ui/core/Paper'
import AccountReset from './components/AccountReset'
import RelationshipView from './components/RelationshipView'

import { makeStyles } from '@material-ui/core/styles'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
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
  heightCenterPage: { height:'auto', overflow: 'auto', marginBottom:70 }
}))


const App = () => {


  const [userState, setUserState] = useState({
    users: [],
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    userSnackBar: false,
    userForgotPasswordSnackBar:false,
    token: '',
    currentUser: '',
    isLoggedIn: false,
    uid:0,
    headers: null,
    currentFriends:[]
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



  const [openRelationshipModal, setOpenRelationshipModal] = React.useState(false);

  const handleOpenRelationshipModal = () => {
    setOpenRelationshipModal(true);
  };

  const handleCloseRelationshipModal = () => {
    setOpenRelationshipModal(false);
  };

  const [openConnectionsModal, setOpenConnectionsModal] = React.useState(false);

  const handleOpenConnectionsModal = () => {
    setOpenConnectionsModal(true);
  };

  const handleCloseConnectionsModal = () => {
    setOpenConnectionsModal(false);
  };

  const handleCloseUserSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setUserState({ ...userState, userSnackBar: false })
  };

  const handleCloseForgotPasswordSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setUserState({ ...userState, userForgotPasswordSnackBar: false })
  };

  const handleInputChangeUser = ({ target }) => {
    setUserState({ ...userState, [target.name]: target.value })
  }

  const handleLogin = (event) => {
    event.preventDefault()
    let curUser = {
      username: userState.username,
      password: userState.password
    }
    User.login(curUser)
      .then((response) => {
        if (response.status === 200) {

          localStorage.setItem("token", response.data.token)
          localStorage.setItem("currentUser",response.data.user)
          localStorage.setItem("isLoggedIn", response.data.isLoggedIn)
          localStorage.setItem("uid", response.data.uid)

          let headers
            headers = {
              "Content-Type": "application/json",
              "x-auth-token": response.data.token
            }
            setUserState({ ...userState, token: response.data.token
              , currentUser: response.data.user
              , isLoggedIn: response.data.isLoggedIn
              , uid: response.data.uid
              , headers: headers })
          
          //Cookies.remove("x-auth-cookie"); //delete just that cookie

        }
      })
  }

  const handleSignOut = (event)=>
  {
    event.preventDefault()
    setUserState({ ...userState, token: ''
      , currentUser: ''
      , isLoggedIn: false
      , uid:0
      , headers: null })
      
  }

  const handleCreateAccount = (event)=>{
    event.preventDefault()
    let curUser = {
      username:userState.username,
      firstName:userState.firstname,
      lastName:userState.lastname,
      email:userState.email,
      password:userState.password
    }
    User.register(curUser)
      .then((response) => {
      if (response.status === 200)
      {
        setUserState({ ...userState, userSnackBar: true })
      }
    })
  }

  const handleForgotPassword =(event)=>{
    event.preventDefault()
    let curUserEmail = {
      email: userState.email,
    }
    User.forgotPassword(curUserEmail)
      .then((response) => {
        if (response.status === 200) {
          setUserState({ ...userState, userForgotPasswordSnackBar: true })
        }
      })
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
    { x: new Date("2017- 09- 01"),  y: 89, indexLabel: "\u2191 Break Point", markerColor: "red", markerType: "triangle"  },
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
          <TopNavBar userState={userState}
            handleSignOut = {handleSignOut}
          />
          <Switch>
            <Route exact path="/">
              {userState.isLoggedIn ? <Redirect to="/homepage" /> : 
              <LoginPage handleLogin={handleLogin} 
                handleInputChange={handleInputChangeUser}
            /> }
            </Route>
            <Route path="/resetAccount/:key" exact component={AccountReset}>

            </Route>
            <Route path="/register">              
              <Paper className={classes.heightCenterPage}>
              <RegisterPage handleInputChange={handleInputChangeUser} 
              CreateAccount={handleCreateAccount}
              handleCloseSnackbar={handleCloseUserSnackbar}
              userState={userState}
              />
              </Paper>
            </Route>
            <Route path="/forgotpassword">
              <ForgotPassword handleInputChange={handleInputChangeUser} 
                handleForgotPassword={handleForgotPassword}
                handleCloseForgotPasswordSnackbar={handleCloseForgotPasswordSnackbar}
                userState={userState}
              />
            </Route>
            <Route path="/viewFriendRelationship">
              {!userState.isLoggedIn ? <LoginPage handleLogin={handleLogin}
                handleInputChange={handleInputChangeUser} /> :<RelationshipView />
              }
            </Route>
            <Route path="/homepage">
              {!userState.isLoggedIn ? <LoginPage handleLogin={handleLogin} 
                handleInputChange={handleInputChangeUser} /> :
                <>              
              <Paper className={classes.heightCenterPage}>
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
              <HomePage 
                      userState={userState}
              />
              </Paper>
              <SearchModal 
              open={openSearchModal} 
              handleClose={handleCloseSearchModal} 
              classes={classes}
              modalStyle={modalStyle}
              userState={userState}
              />
              <RelationshipModal 
              open={openRelationshipModal} 
              handleClose={handleCloseRelationshipModal} 
              classes={classes}
              modalStyle={modalStyle}
              userState={userState}
              />
              <ConnectionsModal open={openConnectionsModal} handleClose={handleCloseConnectionsModal} classes={classes}
              modalStyle={modalStyle}
                  />
              <BottomNavBar searchOpen={handleOpenSearchModal}
              addOpen={handleOpenRelationshipModal}
              historyOpen={handleOpenConnectionsModal}
               />
              </>
              }              
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
