import React from 'react'
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


import postData from '../postData'
// could be removed when we have the router and database set up


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
  button:{
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

const PostDisplay = () => {
  const classes = useStyles()
  const bull = <span className={classes.bullet}>•</span>

  const [modalStyle] = React.useState(getModalStyle)
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }



  return (
<>
      <div className={classes.root}>
        <GridList cellHeight={'auto'} className={classes.gridList} cols={1}>
          {postData.map((post) => (
            <GridListTile key={post.date} >
              <Typography variant="h6" component="h2">
               {post.date}
              </Typography>
              <Typography variant="h5" component="h2">
                Good things{bull}
              </Typography>
              <Typography>{post.good}</Typography>
              <br></br>
              <Typography variant="h5" component="h2">
                Bad things{bull}
              </Typography>
              <Typography>{post.bad}</Typography>

              <div className={classes.expansionPanel}>
                <ExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.heading}>Friend comments</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Typography>
                      <div className={classes.button}>
                        <ButtonGroup variant="text"aria-label="text primary button group">
                          <Button type="button" onClick={handleOpen}> map user name </Button>
                          <Button>will be delet after map</Button>
                        </ButtonGroup>
                        <Modal
                          open={open}
                          className={modalStyle}
                          onClose={handleClose}
                          aria-labelledby="simple-modal-title"
                          aria-describedby="simple-modal-description"
                        >
            
                          <CommentDisplay />

                        </Modal>
                      </div>
                    </Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>

            </GridListTile>
          ))}
        </GridList>
      </div>



    
    </>
  )
}

export default PostDisplay