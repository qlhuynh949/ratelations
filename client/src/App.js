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
  const top = 50;
  const left = 50;

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
    width: '95%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  heightCenterPage: { height:'auto', overflow: 'auto', marginBottom:70 }
  ,
  heightModalPage: {
    position: 'absolute',
    width: '95%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }
}))


const App = () => {

  const [RelationshipFollowedState, setRelationshipFollowedState] = useState({
    friends: []
  })

  const [FriendsFollowingState, setFriendsFollowingState] = useState({
    friends: []
  })


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
    currentFriends:[],
    currentRelationship:[],
    currentViewRelationshipID:'',
    userRelationshipID: '',
    userRelationshipStatusID:0,
    inRelationship:false,
    partnerFirstName: '',
    partnerLastName: '',
    partnerUserName: '',
    partnerEmail: '',
    partnerId: '',
    requestingPartnerId: ''
  })


  
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  
  const [openSearchModal, setOpenSearchModal] = React.useState(false);
  
  const handleOpenSearchModal = () => {
    getRelationshipUserInfo()
    setOpenSearchModal(true)
    
  };

  const changeCurrentViewRelationshipId=(id)=>
  {
    setUserState({ ...userState, currentViewRelationshipID: id })
  }

  const handleCloseSearchModal = () => {
    setOpenSearchModal(false)
  };



  const [openRelationshipModal, setOpenRelationshipModal] = React.useState(false);

  const handleOpenRelationshipModal = () => {
    getRelationshipUserInfo()
    setOpenRelationshipModal(true)
  }

  const handleCloseRelationshipModal = () => {

    setOpenRelationshipModal(false)
  }

  const getRelationshipUserInfo = () => {
    //userRelationship
    let inRelationship = false
    let relationshipId = 0
    let relationshipStatus = 0
    let couples
    User.userRelationship(userState.uid)
      .then((response) => {
        
        if (response.status === 200) {
          let result = []
          if (response.data !== null) {
            result.push(response.data.relationshipId)
            relationshipId = response.data.relationshipID
            if (relationshipId) {
              inRelationship=true
            }
            relationshipStatus = response.data.status
            couples=response.data.couples
            
            setUserState({
              ...userState,
              inRelationship: inRelationship,
              currentViewRelationshipID: relationshipId,
              userRelationshipID: relationshipId,
              userRelationshipStatusID: relationshipStatus,
              currentRelationship: couples,
              partnerFirstName: response.data.partnerFirstName,
              partnerLastName: response.data.partnerLastName,
              partnerUserName: response.data.partnerUserName,
              partnerEmail: response.data.partnerEmail,
              partnerId: response.data.partnerId,
              requestingPartnerId: response.data.requestingPartnerId
            })
          }
          
        }
      })
  }

  
  const [openConnectionsModal, setOpenConnectionsModal] = React.useState(false)

  const handleOpenConnectionsModal = () => {
    getRelationshipUserInfo()
    setOpenConnectionsModal(true)
  }

  const handleCloseConnectionsModal = () => {
    setOpenConnectionsModal(false)
  }

  const handleCloseUserSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setUserState({ ...userState, userSnackBar: false })
  }

  const handleCloseForgotPasswordSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setUserState({ ...userState, userForgotPasswordSnackBar: false })
  }

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
              , firstName: response.data.firstName
              , lastName: response.data.lastName
              , email: response.data.email
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

  const RefreshFriendsFollowingState = () => {
    User.userRelationshipFollowingMe(userState.uid)
      .then((response) => {
        if (response.status === 200) {
          //setState(response)
          let result = []
          if (response.data !== null) {
            if (response.data.length > 0) {
              response.data.forEach(element => {
                result.push(element)
              })
            }
          }
          setFriendsFollowingState({ ...FriendsFollowingState, friends: result })
          //FriendsFollowing
        }
      })
  }

  const RefreshRelationshipFollowedState = () => {
    User.userRelationshipFollowingFollower(userState.uid)
      .then((response) => {
        if (response.status === 200) {
          //setState(response)
          let result = []
          if (response.data !== null) {
            if (response.data.length > 0) {
              response.data.forEach(element => {
                result.push(element)
              })
            }
          }
          setRelationshipFollowedState({ ...RelationshipFollowedState, friends: result })
          //RelationshipFollowedState
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
    { x: new Date("2020- 03- 14"), y: 20 },
    { x: new Date("2020- 03- 15"), y: 22 },
    { x: new Date("2020- 03- 16"), y: 24 },
    { x: new Date("2020- 03- 17"), y: 26 },
    { x: new Date("2020- 03- 18"), y: 24 },
    { x: new Date("2020- 03- 19"), y: 26 },
    { x: new Date("2020- 03- 20"), y: 24 },
    { x: new Date("2020- 03- 21"), y: 26 },
    { x: new Date("2020- 03- 22"), y: 24 }, 
    { x: new Date("2020- 03- 23"), y: 26 },
    { x: new Date("2020- 03- 24"), y: 28 },
    { x: new Date("2020- 03- 25"), y: 30 },
    { x: new Date("2020- 03- 26"), y: 32 },
    { x: new Date("2020- 03- 27"), y: 34 },
    { x: new Date("2020- 03- 28"), y: 36 },
    { x: new Date("2020- 03- 29"), y: 34 },
    { x: new Date("2020- 03- 30"), y: 36 },
    { x: new Date("2020- 03- 31"), y: 38 },
    { x: new Date("2020- 04- 01"), y: 40 },
    { x: new Date("2020- 04- 02"), y: 42 },
    { x: new Date("2020- 04- 03"), y: 44 },
    { x: new Date("2020- 04- 04"), y: 46 },
    { x: new Date("2020- 04- 05"), y: 44 },
    { x: new Date("2020- 04- 06"), y: 42 },
    { x: new Date("2020- 04- 07"), y: 44 }
  ]

  let Person2Data = [   
{ x: new Date("2020- 03- 14"), y: 18 },
{ x: new Date("2020- 03- 15"), y: 20 },
{ x: new Date("2020- 03- 16"), y: 18 },
{ x: new Date("2020- 03- 17"), y: 18 },
{ x: new Date("2020- 03- 18"), y: 20 },
{ x: new Date("2020- 03- 19"), y: 22 },
{ x: new Date("2020- 03- 20"), y: 24 },
{ x: new Date("2020- 03- 21"), y: 26 },
{ x: new Date("2020- 03- 22"),  y: 26},
{ x: new Date("2020- 03- 23"), y: 28 },
{ x: new Date("2020- 03- 24"), y: 30 },
{ x: new Date("2020- 03- 25"), y: 28 },
{ x: new Date("2020- 03- 26"), y: 26 },
{ x: new Date("2020- 03- 27"), y: 28 },
{ x: new Date("2020- 03- 28"), y: 30 },
{ x: new Date("2020- 03- 29"), y: 32 },
{ x: new Date("2020- 03- 30"), y: 34 },
{ x: new Date("2020- 03- 31"), y: 34 },
{ x: new Date("2020- 04- 01"), y: 36 },
{ x: new Date("2020- 04- 02"), y: 34 },
{ x: new Date("2020- 04- 03"), y: 36 },
{ x: new Date("2020- 04- 04"), y: 38 },
{ x: new Date("2020- 04- 05"), y: 40 },
{ x: new Date("2020- 04- 06"), y: 41 },
{ x: new Date("2020- 04- 07"), y: 42 } 
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
              <Chart ChartTitle='Relationship Chart' ChartSubtitles='~ Breakup Point ~' 
              Person1Name='Test1'
              Person1Data = {Person1Data}
              Person1xValueFormatString="MMM YYYY"
              Person1yValueFormatString="#,##0.##"
              Person2Name='Test2'
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
              RelationshipFollowedState={RelationshipFollowedState}
              FriendsFollowingState={FriendsFollowingState}
              RefreshFriendsFollowingState={RefreshFriendsFollowingState}
              RefreshRelationshipFollowedState={RefreshRelationshipFollowedState}
              />
              <RelationshipModal 
              open={openRelationshipModal} 
              handleClose={handleCloseRelationshipModal} 
              classes={classes}
              modalStyle={modalStyle}
              userState={userState}
              getRelationshipUserInfo={getRelationshipUserInfo}
              />
              <ConnectionsModal open={openConnectionsModal} handleClose={handleCloseConnectionsModal} classes={classes}
              modalStyle={modalStyle}
              changeCurrentViewRelationshipId={changeCurrentViewRelationshipId}
              userState={userState}
              RelationshipFollowedState={RelationshipFollowedState}
              FriendsFollowingState={FriendsFollowingState}          
              RefreshFriendsFollowingState={RefreshFriendsFollowingState}
              RefreshRelationshipFollowedState={RefreshRelationshipFollowedState}

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
