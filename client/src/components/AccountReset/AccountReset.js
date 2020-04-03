import React, { useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { red, pink } from '@material-ui/core/colors';
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import User from '../../utils/User'

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: pink[500],
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  bar: {
    backgroundColor: red[900]
  },
  palette: {
    primary: red,
    secondary: {
      main: pink[500]
    }
  }
}));

const AccountReset = (props) => {


  const handleCloseUserSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setUserObjState({ ...userObjState, userSnackBar: false })
  };

  const [userObjState, setUserObjState] = useState({
    uid: '',
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    token: '',
    isValidUser: false,
    headers: '', 
    userSnackBar: false
  })

  const setState = (obj) => {

    let headers
    headers = {
      "Content-Type": "application/json",
      "x-auth-token": obj.data.token
    }

    setUserObjState({
      ...userObjState,
      uid: obj.data.uid,
      username: obj.data.username,
      email: obj.data.email,
      firstName: obj.data.firstName,
      lastName: obj.data.lastName,
      token: obj.data.token,
      isValidUser: obj.data.isValidUser,
      headers: headers
    })
  }


  useEffect(() => {
    
    let token = { forgetToken: props.match.params.key}
    User.checkToken(token)
      .then((response) => {
        if (response.status === 200) {
          setState(response)
        }
      })
  }, [])



  const handleUpdateAccount = (event) => {
    event.preventDefault()
    let curUser = {
      username: userObjState.username,
      firstName: userObjState.firstname,
      lastName: userObjState.lastname,
      email: userObjState.email,
      password: userObjState.password,
      uid:userObjState.uid
    }
    User.updateAccount(curUser)
      .then((response) => {
        if (response.status === 200) {
          setUserObjState({ ...userObjState, userSnackBar: true })
        }
      })
  }

  const handleInputChangeUser = ({ target }) => {
    setUserObjState({ ...userObjState, [target.name]: target.value })
  }

  const ConditionRender=(props)=>
  {
    if (props.userObjState.isValidUser)
    {
      return <>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Update Account
        </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                color="secondary"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={props.userObjState.username}
                autoComplete="username"
                onChange={props.handleInputChange}
                autoFocus
              />
              <TextField
                variant="outlined"
                color="secondary"
                margin="normal"
                required
                fullWidth
                id="firstname"
                label="First name"
                name="firstname"
                autoComplete="firstname"
                onChange={props.handleInputChange}
                value={props.userObjState.firstName}
                autoFocus
              />
              <TextField
                variant="outlined"
                color="secondary"
                margin="normal"
                required
                fullWidth
                id="lastname"
                label="Last name"
                name="lastname"
                autoComplete="lastname"
                onChange={props.handleInputChange}
                value={props.userObjState.lastName}
                autoFocus
              />
              <TextField
                variant="outlined"
                color="secondary"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={props.handleInputChange}
                value={props.userObjState.email}
                autoFocus
              />
              <TextField
                variant="outlined"
                color="secondary"
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoFocus
                onChange={props.handleInputChange}
                
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.bar}
                onClick={props.UpdateAccount}
              >
                Update Account
          </Button>
              <br />
              <Snackbar open={props.userObjState.userSnackBar} autoHideDuration={6000} onClose={props.handleCloseSnackbar}>
                <Alert onClose={props.handleCloseSnackbar} severity="success">
                  User is updated!
            </Alert>
              </Snackbar>
              <br />
            </form>
          </div>

        </Container>
      </>
    }
    else
    {
        return <h1>Sorry the link is invalid.</h1>
    }

  }

  
  const classes = useStyles()
  
  return (

    <ConditionRender 
    userObjState={userObjState}
      handleCloseUserSnackbar={handleCloseUserSnackbar}
      handleInputChange={handleInputChangeUser}
      UpdateAccount={handleUpdateAccount}
     />
  )
}

export default AccountReset