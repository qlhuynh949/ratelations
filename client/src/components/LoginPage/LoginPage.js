import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import {red, pink}  from '@material-ui/core/colors';


import {
  Link
} from 'react-router-dom'



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
      palette:{
        primary:red,
        secondary: {
          main: red[900]
        }
      }
}));
  

const LoginPage = (props) => {
  const classes = useStyles()

return(
  <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
        </Typography>
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          color = "secondary"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          onChange={props.handleInputChange}
        />
        <TextField
          variant="outlined"
          color = "secondary"
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
        <Grid container>
          <Grid item xs>
            <Link to="/forgotpassword" color = "secondary">
              Forgot password?
            </Link>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.bar}
          onClick={props.handleLogin}
        >
          Sign In
          </Button>
        <Link to="/register">
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.bar}          
        >
          register
          </Button>
        </Link>
      </form>
    </div>
    
  </Container>
)
}

export default LoginPage