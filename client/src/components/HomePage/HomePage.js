import React from 'react'
import PostInput from '../PostInput'
import CommentInput from '../CommentInput'
import Container from '@material-ui/core/Container'

const HomePage = () => {

  return (
    <Container component="main" maxWidth="xs">
    
    
      <PostInput />
      <CommentInput />
    </Container>

  )
}

export default HomePage