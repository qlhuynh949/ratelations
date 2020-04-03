import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '40ch',
    },
  },
}));


const CommentInput = (props) => {
  const classes = useStyles()

  return (
    // {props.item?}
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="outlined-multiline-static"
        label="Write your comment"
        multiline
        rows="4"
        placeholder="Your Comment"
        variant="outlined"
        color="secondary"
        name="text"
        value={props.text}
        onChange={props.handleInputChange}
      />
      <br></br>
      <Button
        variant="outlined"
        color="secondary"
        onClick={props.handleCreateComment}
      >
        Submit
      </Button>
    </form>

  )
}

export default CommentInput