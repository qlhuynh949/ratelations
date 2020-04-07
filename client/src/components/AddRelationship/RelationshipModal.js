import React, { useState, useEffect } from 'react'
import './RelationshipModal.css'
import Modal from '@material-ui/core/Modal';

import AddRelationshipSection from '../AddRelationshipSection'


const RelationshipModal = (props) => {

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
            <h2 id="simple-modal-title">Relationship</h2>
            <AddRelationshipSection userState={props.userState} 
              getRelationshipUserInfo= {props.getRelationshipUserInfo}
            />   
          </div>
        </Modal>
      </div>
      </>

  )
}

export default RelationshipModal
