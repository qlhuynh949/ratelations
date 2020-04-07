import React from 'react';
import './PartnerCard.css'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.primary,
  },
}))

const PartnerCard = (props) => {
  const classes = useStyles();


  return (
      <>
          <Card className={classes.root} variant="outlined"
            key={props.searchItem.id.toString() + "card"}
            id={props.searchItem.id.toString() + "card"}
          >
            <CardContent
              key={props.searchItem.id.toString() + "cardContent"}
            >
              <Typography className={classes.title} color="textSecondary" gutterBottom
                key={props.searchItem.firstName + props.searchItem.lastName + props.searchItem.id.toString()}
              >
                Name:{props.searchItem.firstName} {props.searchItem.lastName}
              </Typography>
              <Typography className={classes.pos}
                key={props.searchItem.username + 'card' + props.searchItem.id.toString()}
              >
                User: {props.searchItem.username}
              </Typography>
              <Typography className={classes.pos} color="textSecondary"
                key={props.searchItem.email + 'card' + props.searchItem.id.toString()}
              >
                Email: {props.searchItem.email}
              </Typography>
            </CardContent>
          </Card>
      </>
  )
}

export default PartnerCard
