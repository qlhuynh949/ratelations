import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CommentDisplay from '../CommentDisplay'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  card:{
    display: 'block',
  },
  cardcontent:{
    float:'right'
  }
}))

function generate(element) {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const PostDisplay = () => {
  const classes = useStyles()
  const bull = <span className={classes.bullet}>•</span>
  return (
    <div className={classes.root}>
      <Typography variant="h6" component="h2">
        Daily Post
          </Typography>
      <div>
        <List >
          {generate(
            <ListItem className={classes.card}>
              <Card >
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    post date
                  </Typography>
                  <Typography variant="h5" component="h2">
                    Good things{bull}
                  </Typography>
                  <Typography variant="body2" component="p">
                    well meaning and kindly.gfgaddfgafgagaga
                    <br />
                    {'"a benevolent smile"'}
                  </Typography>
                    <br />
                  <Typography variant="h5" component="h2">
                    Bad things{bull}
                  </Typography>
                  <Typography variant="body2" component="p">
                    well meaning and kindly.hetehetthjtrhehetethehe
                    <br />
                    {'"a benevolent smile"'}
                  </Typography>
                </CardContent>
                <CardContent className={classes.cardcontent}>
                   <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                   </IconButton>
                </CardContent>
              </Card>
              <Card >
                <CommentDisplay />
              </Card>
            </ListItem>
          )}
        </List>
      </div>
    </div>

  )
}

export default PostDisplay1