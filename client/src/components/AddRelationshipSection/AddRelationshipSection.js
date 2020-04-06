import React, { useState } from 'react'
import './AddRelationshipSection.css'
import AddRelationshipSearch from '../AddRelationshipSearch'
import AddRelationshipDisplay from '../AddRelationshipDisplay'
import AddRelationshipCurrent from '../AddRelationshipCurrent'

import Paper from '@material-ui/core/Paper'

import { fade, makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import User from '../../utils/User'
import Friends from '../../utils/Friends'

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
  scroll: { maxHeight: '100%', overflow: 'auto' },
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

const AddRelationshipSection = (props) => {

  const [searchPartnerState, setSearchPartnerState] = useState({
    searchPartnerText: '',
    searchPartnerResults: []
  })

  const handleInputChangeUser = ({ target }) => {
    setSearchPartnerState({ ...searchPartnerState, [target.name]: target.value })
  }

  const handleSearch = (event) => {
    event.preventDefault()
    search()

  }

  const search = () => {
    let search = {
      searchText: searchPartnerState.searchPartnerText,
      uid: props.userState.uid
    }
    User.userSearch(search)
      .then((response) => {
        setSearchPartnerState({ ...searchPartnerState, searchPartnerResults: response.data })

      })
  }

  const addPartner =(item)=>{
  
  }

  const classes = useStyles()
  return (
    <>
      {props.userState.inRelationship ? 
      <AddRelationshipCurrent />
      :
      <>
            <Container>
            <Paper variant="outlined" square className={classes.scroll}>
              <AddRelationshipSearch
                onChangeSearchText={handleInputChangeUser}
                key="AddRelationshipSearch"
                searchPartner={handleSearch}
              />
              <AddRelationshipDisplay 
                searchPartnerState={searchPartnerState}
                addFriend={addPartner}
                key="AddRelationshipDisplay"
              />
              </Paper>
              </Container>
          </>
      }
      </>
  )
}

export default AddRelationshipSection
