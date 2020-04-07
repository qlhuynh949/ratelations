import React, { useState, useEffect } from 'react'
import './SearchModal.css'
import Modal from '@material-ui/core/Modal';
import UserSection from '../UserSection'
import FriendsSection from '../FriendsSection'
import User from '../../utils/User'
import Friends from '../../utils/Friends'

const SearchModal = (props) => {
  const [friendsState, setFriendsState] = useState({
    friends: []
  })

  const [searchUserState, setSearchUserState] = useState({
    searchText: '',
    searchResults: []
  })

  const handleInputChangeUser = ({ target }) => {
    setSearchUserState({ ...searchUserState, [target.name]: target.value })
  }

  const handleSearch = (event) => {
    event.preventDefault()
    search()
  }

  const search = () => {
    let search = {
      searchText: searchUserState.searchText,
      uid: props.userState.uid
    }
    User.userSearch(search)
      .then((response) => {
        setSearchUserState({ ...searchUserState, searchResults: response.data })

      })
  }
  const addFriend = (item) => {
    //props.userState.currentFriends.push(item)

    let friend = {
      recipient: item.id,
      requester: props.userState.uid,
      status: 3 // added as a Friends
    }
    Friends.create(
      friend
    )
      .then(({ data: friends }) => {
        //console.log(friend)
        //console.log(friends)
        search()
        RefreshFriends()
      })

  }


  const RefreshFriends = () => {
    
    User.userFriends(props.userState.uid)
      .then((response) => {
        if (response.status === 200) {
          //setState(response)
          let result = []
          if (response.data !== null) {
            if (response.data.length > 0) {
              response.data.forEach(element => {
                result.push(element)
              })
            }
          }
          setFriendsState({ ...friendsState, friends: result })
          //currentFriends
        }
      })
  }

  useEffect(() => {
    RefreshFriends()
  }, [])

  const removeFriend = (item) => {
    let friend = {
      recipient: item._id,
      requester: props.userState.uid,
      status: 0// remove
    }
    User.userFriendsDetach(
      friend
    )
      .then(({ data: friends }) => {
        friendsState.friends.pop(item)
        //console.log(friends)
        RefreshFriends()
      })

  }



  return (
      <>
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={props.open}
          onClose={props.handleClose}
        >
          <div style={props.modalStyle} className={props.classes.heightModalPage}>
            
            <h3 id="simple-modal-title">Search Friends</h3>            
            <UserSection userState={props.userState} key="userSection"
            handleInputChangeUser={handleInputChangeUser}
            addFriend={addFriend}
            handleSearch={handleSearch}
            searchUserState={searchUserState}
            />
            <FriendsSection userState={props.userState} key="friendsSection"
            friendsState={friendsState} 
            removeFriend={removeFriend}
            />
          </div>
          
        </Modal>
      </div>
      </>
  )
}

export default SearchModal
