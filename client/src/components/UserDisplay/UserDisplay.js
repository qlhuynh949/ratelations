import React from 'react';
import './UserDisplay.css'
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Friends from '../../utils/Friends'

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.primary,
  },
}));
const UsersDisplay = (props) => {
  const classes = useStyles();
  
  const addFriend=(item)=>{
    props.userState.currentFriends.push(item)
    let friend = {
      recipient: item.id,
      requestor: props.userState.uid,
      status: 3 // added as a Friends
    }    
    Friends.create(
      friend
      )
      .then(({ data: friends }) => {
        //console.log(friend)
        //console.log(friends)
      })

  }
  return (
    <>
      <h3>Search Results:</h3>

        {props.searchUserState.searchResults.map(searchItem => (
        <>
              <Card className={classes.root} variant="outlined"
              key={searchItem.username}
              id={searchItem.id.toString() + "card"}
              >
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
                  <Button onClick={() => addFriend(searchItem)}><AddIcon /></Button>                    
                </CardActions>                
              </Card>
        </>
        ))}
      
    </>

  )
}

export default UsersDisplay
