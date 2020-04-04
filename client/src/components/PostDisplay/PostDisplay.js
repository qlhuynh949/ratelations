import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
// for expansionPanel
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
// for button
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
// for Gridlist
import Modal from '@material-ui/core/Modal'
// for comment modal
import CommentDisplay from '../CommentDisplay'
import moment from 'moment'
// import format from 'date-format'
import Comment from '../../utils/Comments'
import User from '../../utils/User.js'


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
    backgroundColor: theme.palette.background.paper,
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
}));


function rand() {
  return Math.round(Math.random() * 20) - 10;
}
// for modal
function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
// for modal

const PostDisplay = (props) => {
  const classes = useStyles()
  const bull = <span className={classes.bullet}>•</span>

  const [modalStyle] = React.useState(getModalStyle)
  const [open, setOpen] = React.useState(false)
  // const [isInputCheckedState, toggleInputCheck] = React.useState(false)
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
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

  let itemUserComments = [
    {
      Cuser: "5e838464fd8e6d26f039b1e9",
      Text: "sdafasdfawgwawargfaw",
      Username: "jie"
    },
    {
      Cuser: "5e8783b2abab553bc4df36ba",
      Text: "yan",
      Username: "yan"
    }
  ]
  const handleGetComment = (event, id) => {

    Comment.read(id)
      .then(({ data: comments }) => {
        setCommentState({ comments })
        console.log(comments)
      })
    commentState.comments.forEach(comment => {
      // console.log(comment)
      User.get(comment.user)
        .then(({ data: comUser }) => {
          // console.log(comUser)
          itemUserComments.push({ "Cuser": comment.user, "Text": comment.text, "Username": comUser.username })
          return itemUserComments
        })
    })
    console.log(itemUserComments)
    // const distinct = (value, index, self) => {
    //   return self.indexOf(value) === index
    // }
    // const commentUsersIds = commentUsers.filter(distinct)
    // console.log(commentUsersIds)
  }



  return (
    <>
      <div className={classes.root}>
        <GridList cellHeight={'auto'} className={classes.gridList} cols={1}>
          {props.items.length > 0 ? props.items.map((item, i) => (
            <GridListTile
              key={i}
            //value={item._id}
            //onClick={ev => { props.handleGetItemId(ev) }}
            >
              <input
                type='checkbox'
                value={item._id}
                onClick={(ev) => { handleInputChange(ev) }}
              />
              <Typography variant="h6" component="h2" >
                {moment(item.created_at.$date).format('dddd, MMM Do, YYYY')}
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
                <ExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography
                      className={classes.heading}
                      onClick={(e) => handleGetComment(e, item._id)}
                    >Friend comments</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Typography>
                      <div className={classes.button}>
                        <ButtonGroup variant="text" aria-label="text primary button group">
                          {itemUserComments.length > 0 ? itemUserComments.map((itemUserComment, i) => (
                            <Button key={i} type="button" onClick={handleOpen}> {itemUserComment.Username}
                              <Modal
                                open={open}
                                className={modalStyle}
                                onClose={handleClose}
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                              >
                                <CommentDisplay
                                  itemUserComment={itemUserComment}
                                />
                              </Modal>
                            </Button>
                          )) : <Button>no comment</Button>}
                        </ButtonGroup>
                      </div>
                    </Typography>
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