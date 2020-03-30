import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  inline: {
    display: 'inline',
  },
  title: {
    fontSize: 14,
  },
}))

function generate(element) {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const CommentDisplay = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography variant="h6" component="h2">
        Friend Comments
          </Typography>
      <div >
        <List >
          {generate(
            <ListItem>
              <Card className={classes.root}>
                <CardContent>
                  <Typography component="h2" gutterBottom>
                    user name
                  </Typography>
                  <Typography variant="body2" component="h4">
                    well meaning and kindly.
                  </Typography>
                </CardContent>
              </Card>
            </ListItem>,
          )}
        </List>
      </div>


    </div>

  )
}

export default CommentDisplay