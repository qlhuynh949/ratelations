import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import red from '@material-ui/core/colors/red'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import pink from '@material-ui/core/colors/pink'

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: pink[500]
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    borderColor: pink[500]
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
      main: red[900]
    }
  }
}));

const AccountUpdate = (props) => {
  const classes = useStyles()
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Account Update
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
            autoComplete="username"
            onChange={props.handleInputChange}
            value={props.userObjState.username}
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
            value={props.userObjState.firstname}
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
            value={props.userObjState.lastname}
            onChange={props.handleInputChange}
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
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
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
          <Snackbar open={props.userObjState.userSnackBar} autoHideDuration={6000} onClose={props.handleCloseUserSnackbar}>
            <Alert onClose={props.handleCloseUserSnackbar} severity="success">
              User is updated!  Click on the login icon at the top nav bar and log in.
            </Alert>
          </Snackbar>
          <br />
        </form>
      </div>

    </Container>
  )
}

export default AccountUpdate