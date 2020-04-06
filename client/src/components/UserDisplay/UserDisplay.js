import React from 'react';
import './UserDisplay.css'
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.primary,
  },
}));
const UsersDisplay = (props) => {
  const classes = useStyles();
  

  return (
    <>
      <h3>Search Results:</h3>

        {props.searchUserState.searchResults.map(searchItem => (
        <>
              <Card className={classes.root} variant="outlined"
              key={searchItem.id.toString() + "card"}
              id={searchItem.id.toString() + "card"}
              >
              <CardContent 
              key={searchItem.id.toString() + "cardContent"}
              >
                  <Typography className={classes.title} color="textSecondary" gutterBottom
                  key={searchItem.firstName + searchItem.lastName+searchItem.id.toString()}
                  >
                    Name:{searchItem.firstName} {searchItem.lastName}
                  </Typography>
                  <Typography className={classes.pos}
                  key={searchItem.username+'card' + searchItem.id.toString()}
                  >
                    User: {searchItem.username}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary"
                  key={searchItem.email+'card' + searchItem.id.toString()}
                  >
                    Email: {searchItem.email}
                  </Typography>
                </CardContent>
                <CardActions
                key={searchItem.id.toString() + "cardActions"}
                >
                  <Button onClick={() => props.addFriend(searchItem)}><AddIcon /></Button>                    
                </CardActions>                
              </Card>
        </>
        ))}
      
    </>

  )
}

export default UsersDisplay
