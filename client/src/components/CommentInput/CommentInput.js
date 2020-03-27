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


const CommentInput = () => {
  const classes = useStyles()
  const [value, setValue] = React.useState('Controlled')

  const handleChange = event => {
    setValue(event.target.value)
  }
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="outlined-multiline-static"
        label="Write your comment"
        multiline
        rows="4"
        placeholder="Placeholder"
        variant="outlined"
      />
      <br></br>
      <Button variant="outlined" color="primary">
        Submit
      </Button>
    </form>

  )
}

export default CommentInput