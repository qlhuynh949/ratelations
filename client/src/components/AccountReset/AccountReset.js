import React, { useState, useEffect } from 'react'
import User from '../../utils/User'
import AccountUpdate from '../AccountUpdate'


const AccountReset = (props) => {


  const handleCloseUserSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setUserObjState({ ...userObjState, userSnackBar: false })
  };

  const [renderState, setRenderState]=useState({
    isValidUser: false
  })

  const [userObjState, setUserObjState] = useState({
    uid: '',
    username: '',
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    token: '',
    headers: '', 
    userSnackBar: false
  })

  const setState = (obj) => {

    let headers
    headers = {
      "Content-Type": "application/json",
      "x-auth-token": obj.data.token
    }

    setRenderState({
      isValidUser: obj.data.isValidUser,
    })
    
    setUserObjState({
      ...userObjState,
      uid: obj.data.uid,
      username: obj.data.username,
      email: obj.data.email,
      firstname: obj.data.firstName,
      lastname: obj.data.lastName,
      token: obj.data.token,
      headers: headers
    })
  }


  useEffect(() => {
    let token = { forgetToken: props.match.params.key}
    User.checkToken(token)
      .then((response) => {
        if (response.status === 200) {
          setState(response)
        }
      }) 
  }, [])



  const handleUpdateAccount = (event) => {
    event.preventDefault()
    let curUser = {
      username: userObjState.username,
      firstName: userObjState.firstname,
      lastName: userObjState.lastname,
      email: userObjState.email,
      password: userObjState.password,
      uid:userObjState.uid
    }
    
    User.updateAccount(curUser)
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          setUserObjState({ ...userObjState, userSnackBar: true })
        }
      })
  }

  const handleInputChangeUser = ({ target }) => {
    setUserObjState({ ...userObjState, [target.name]: target.value })
  }


  
  
  return (
    <>
      {!renderState.isValidUser ? <h1>Sorry the link is invalid.</h1>:
      <AccountUpdate 
       userObjState={userObjState}
       handleCloseUserSnackbar={handleCloseUserSnackbar}
       handleInputChange={handleInputChangeUser}
       UpdateAccount={handleUpdateAccount}
      />
    }
    </>
  )
}

export default AccountReset
