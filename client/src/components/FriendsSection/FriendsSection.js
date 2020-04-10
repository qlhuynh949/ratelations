import React from 'react'
import './FriendsSection.css'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { fade, makeStyles } from '@material-ui/core/styles'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  media: {
    height: 200, width: 200
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}
const FriendsSection = (props) => {
  const classes = useStyles()



  return (
    <>
      <ExpansionPanel key="FriendsSectionExpansionPanel">
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="FriendsPanelbh-content"
          id="FriendsPanelPanelbh-header"
        >
          <Typography className={classes.heading}>Friends List</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Paper variant="outlined" square key="currentFriendsPaper">
            {props.friendsState.friends.map(searchItem => (
              <>
                <Grid container className={classes.root}>
                <Grid item xs={12} key={searchItem.id}>
                  <Card className={classes.root} variant="outlined">
                    <CardContent>
                      <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Name:{searchItem.firstName} {searchItem.lastName}
                      </Typography>
                      <Typography className={classes.pos}>
                        User: {searchItem.username}
                      </Typography>
                      <Typography className={classes.pos} color="textSecondary">
                        Email: {searchItem.email}
                      </Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={() => props.removeFriend(searchItem)}><RemoveCircleIcon /></Button>
                        <Button onClick={() => props.friendFollowMe(searchItem)}>Follow Me</Button>
                    </CardActions>
                  </Card>
                    <Snackbar open={props.friendsState.friendsSnackBar} autoHideDuration={6000} onClose={props.handleCloseFriendFollowSnackbar}>
                      <Alert onClose={props.handleCloseFriendFollowSnackbar} severity="success">
                        Friend is now following.
                    </Alert>
                    </Snackbar>
                </Grid>
                </Grid>
              </>
            ))}
          </Paper>
        </ExpansionPanelDetails>
      </ExpansionPanel >
    </>
  )
}

export default FriendsSection
