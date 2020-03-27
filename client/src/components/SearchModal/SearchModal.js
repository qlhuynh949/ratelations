import React from 'react';
import './SearchModal.css'
import Modal from '@material-ui/core/Modal';


const SearchModal = (props) => {

  return (

      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={props.open}
          onClose={props.handleClose}
        >
          <div style={props.modalStyle} className={props.classes.paper}>
            <h2 id="simple-modal-title">Search</h2>
            <p id="simple-modal-description">

          </p>
           
          </div>
        </Modal>
      </div>
    

  )
}

export default SearchModal
