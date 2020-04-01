import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
import Rating from '@material-ui/lab/Rating'
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied'
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied'
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied'
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined'
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import pink from '@material-ui/core/colors/pink'



const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: 'Very Dissatisfied',
    
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: 'Very Satisfied',

  },
}

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
}

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '40ch',
    },
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}))

const PostInput = () => {

  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <Box component="fieldset" mb={3} borderColor="secondary">
          <Typography component="legend">How do you feel today?</Typography>
          <Rating
            name="customized-icons"
            defaultValue={2}
            getLabelText={value => customIcons[value].label}
            IconContainerComponent={IconContainer}
          />
        </Box>
        <TextField
          id="goodInput"
          label="Good things"
          multiline
          rows="4"
          placeholder="Placeholder"
          variant="outlined"
          color = "secondary"
        />
        <TextField
          id="badInput"
          label="Bad things"
          multiline
          rows="4"
          placeholder="Placeholder"
          variant="outlined"
          color = "secondary"
        />
        <br></br>
        <Button variant="outlined" color="secondary">
          Submit
        </Button>

      </div>

    </form>
  )
}

export default PostInput