import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
// for expansionPanel

import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
// for Gridlist

import moment from 'moment'
// import format from 'date-format'
import Comment from '../../utils/Comments'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
  expansionPanel: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    //backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 400,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  listroot: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const PostDisplay = (props) => {
  const classes = useStyles()
  const bull = <span className={classes.bullet}>•</span>

  const [expanded, setExpanded] = React.useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }

  function handleInputChange(ev) {
    //toggleInputCheck(ev.target.checked)
    if (ev.target.checked) props.handleGetItemId(ev.target.value)
    else props.handleGetItemId('')
  }

  const [commentState, setCommentState] = useState({
    comments: [],
    text: '',
    isActive: true,
    ralationship: '',
    item: '',
    user: '',
  })

  const handleGetComment = (event, id) => {
    Comment.read(id)
      .then(({ data: comments }) => {
        // console.log(comments)
        setCommentState({ comments })
        console.log(comments)
      })
  }

  const [state, setState] = React.useState({
    checked: false
  });

  const handleCheckChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    console.log(event.target.checked)
    if (event.target.checked) props.handleGetItemId(event.target.value)
    else props.handleGetItemId('')
  };


  return (
    <>
      <div className={classes.root}>
        <GridList cellHeight={'auto'} className={classes.gridList} cols={1}>
          {props.items.length > 0 ? props.items.map((item, i) => (
            <GridListTile
              key={i}
            >
              <input
                name="inputcheck"
                id="inputcheck"
                type='checkbox'
                value={item._id}
                onClick={(ev) => { handleInputChange(ev) }}
              /><label for="inputcheck">check to leave comment</label>
              {/* <FormControlLabel
                control={<Checkbox checked={state.checked} 
                onChange={handleCheckChange} 
                name="checked" />}
                label="check to leave comment"
                value={item._id}
              /> */}

              <Typography variant="h6" component="h2" >
                {moment(item.created_at).format('dddd, MMM Do, YYYY')}
              </Typography>
              <Typography variant="h5" component="h2">
                Good things{bull}
              </Typography>
              <Typography>{item.goodtext}</Typography>
              <br></br>
              <Typography variant="h5" component="h2">
                Bad things{bull}
              </Typography>
              <Typography>{item.badtext}</Typography>

              <div className={classes.expansionPanel}>
                <ExpansionPanel expanded={expanded === `panel${i}`} onChange={handleChange(`panel${i}`)}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel${i}a-content"
                    id="panel1a-header"
                    onClick={(e) => handleGetComment(e, item._id)}
                  >
                    <Typography
                      className={classes.heading}

                    >Friend comments</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <div className={classes.listroot}>
                      <List component="nav" aria-label="main mailbox folders">
                        {commentState.comments.length > 0 ? commentState.comments.map((comment, i) => (
                          <ListItem button>
                            <ListItemText>
                              <Typography>{comment.user.username}: {comment.text}
                              </Typography>
                              <Typography variant="h9" component="h5">
                              {moment(comment.created_at).format(' L, LT')}
                              </Typography>
                            </ListItemText>
                          </ListItem>

                        )) : <ListItemText>no comment</ListItemText>}
                      </List>
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>

            </GridListTile>
          )) : null}
        </GridList>
      </div>
    </>
  )
}

export default PostDisplay