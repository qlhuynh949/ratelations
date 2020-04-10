import React, { useState, useEffect } from 'react'
import './ConnectionsModal.css'
import Modal from '@material-ui/core/Modal';
import FriendsFollowing from '../FriendsFollowing'
import RelationshipFollowed from '../RelationshipFollowed'
import User from '../../utils/User'

const ConnectionsModal = (props) => {





  useEffect(() => {
    props.RefreshFriendsFollowingState()
    props.RefreshRelationshipFollowedState()
  }, [])


  const removeRelationshipFollowed = (item) => {

    User.userRelationshipFollowingIdDetach(
      item._id
    )
      .then(({ data: friends }) => {
        props.RelationshipFollowedState.friends.pop(item)
        props.RefreshFriendsFollowingState()
        props.RefreshRelationshipFollowedState()
    })
  }

  const removeFriendFollowing = (item) => {

    User.userRelationshipFollowingIdDetach(
      item._id
    )
      .then(({ data: friends }) => {
        props.RelationshipFollowedState.friends.pop(item)
        props.RefreshFriendsFollowingState()
        props.RefreshRelationshipFollowedState()
      })
  }

  const viewRelationshipFollowed = (item) => {
    props.changeCurrentViewRelationshipId(item.relationshipid)
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
          <div style={props.modalStyle} className={props.classes.paper}>
            <h2 id="simple-modal-title">Connections</h2>
            <p id="simple-modal-description">

            </p>
            <RelationshipFollowed 
              RelationshipFollowedState={props.RelationshipFollowedState}
              removeRelationshipFollowed={removeRelationshipFollowed}
              viewRelationshipFollowed={viewRelationshipFollowed}
            />
            <FriendsFollowing 
              friendsFollowingState={props.FriendsFollowingState}
              removeFriendFollowing={removeFriendFollowing}
            />
          </div>
        </Modal>
      </div>
      </>

  )
}

export default ConnectionsModal
