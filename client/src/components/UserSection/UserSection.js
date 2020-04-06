import React, { useState } from 'react'
import './UserSection.css'
import UserDisplay from '../UserDisplay'
import UserSearch from '../UserSearch'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { fade, makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import User from '../../utils/User'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  media: {
    height: 300, width: 300
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const UserSection = (props) => {
  const [searchUserState, setSearchUserState] = useState({
    searchText: '',
    searchResults: []
  })

  const handleInputChangeUser = ({ target }) => {
    setSearchUserState({ ...searchUserState, [target.name]: target.value })
  }

  const handleSearch = (event) => {
    event.preventDefault()
    
    let search = {
      searchText: searchUserState.searchText,
      uid:props.userState.uid
    }
    User.userSearch(search)
      .then((response) => {
        setSearchUserState({ ...searchUserState, searchResults: response.data})

      })
  }

  const classes = useStyles()
  return (
    <>
      <ExpansionPanel key="userSection">
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="UserSectionPanelbh-content"
          id="UserSectionPanelbh-header"
        >
          <Typography className={classes.heading}>Look for Friends</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails key="UserSectionExpansionPanel">
          <Container>
            <Paper variant="outlined" square>
              <UserSearch
                onChangeSearchText={handleInputChangeUser}
                searchClick={handleSearch}
                key="UserSearch"
              />
              <UserDisplay searchUserState={searchUserState}
              userState={props.userState}
              key="UserDisplay"
              />
            </Paper>
          </Container>
        </ExpansionPanelDetails>
      </ExpansionPanel >
    </>
  )
}

export default UserSection
