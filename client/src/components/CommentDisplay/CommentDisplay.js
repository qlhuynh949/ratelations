import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
    fontSize: 14
  },
  inline: {
    display: 'inline',
  },

}))

const CommentDisplay = (props) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography variant="h6" component="h2">
        {props.itemUserComment.Username}
          </Typography>
      <div >
        <List >
            <ListItem>
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="body2" component="h4">
                    text
                  {props.itemUserComment.Text}
                  </Typography>
                </CardContent>
              </Card>
            </ListItem>,
        </List>
      </div>
    </div>

  )
}

export default CommentDisplay