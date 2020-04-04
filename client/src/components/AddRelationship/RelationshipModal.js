import React, { useState, useEffect } from 'react'
import './RelationshipModal.css'
import Modal from '@material-ui/core/Modal';
import AddRelationshipCurrent from '../AddRelationshipCurrent'
import AddRelationshipDisplay from '../AddRelationshipDisplay'


const RelationshipModal = (props) => {

  return (

      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={props.open}
          onClose={props.handleClose}
        >
          <div style={props.modalStyle} className={props.classes.paper}>
            <h2 id="simple-modal-title">Relationship</h2>
          <AddRelationshipCurrent />
          <AddRelationshipDisplay />
            <p id="simple-modal-description">

          </p>
           
          </div>
        </Modal>
      </div>
    

  )
}

export default RelationshipModal
