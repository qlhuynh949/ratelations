import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import {red,pink} from '@material-ui/core/colors';
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

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

const ForgotPassword = (props) => {
  const classes = useStyles()
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate>          
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
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.bar}
            onClick={props.handleForgotPassword}
          >
            Forgot Password
          </Button>
          <br />
          <Snackbar open={props.userState.userForgotPasswordSnackBar} autoHideDuration={6000} onClose={props.handleCloseForgotPasswordSnackbar}>
            <Alert onClose={props.handleCloseForgotPasswordSnackbar} severity="success">
              Please review your email for the link to reset your account information!
            </Alert>
          </Snackbar>
          <br />
        </form>
      </div>

    </Container>
  )
}

export default ForgotPassword