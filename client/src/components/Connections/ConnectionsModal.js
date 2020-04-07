import React from 'react';
import './ConnectionsModal.css'
import Modal from '@material-ui/core/Modal';
import FriendsFollowing from '../FriendsFollowing'
import RelationshipFollowed from '../RelationshipFollowed'

const ConnectionsModal = (props) => {

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
            <RelationshipFollowed />
            <FriendsFollowing />
          </div>
        </Modal>
      </div>
      </>

  )
}

export default ConnectionsModal
