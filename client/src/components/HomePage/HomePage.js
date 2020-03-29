import React from 'react'
import PostInput from '../PostInput'
import PostDisplay from '../PostDisplay'
import CommentInput from '../CommentInput'
import CommentDisplay from '../CommentDisplay'
import Container from '@material-ui/core/Container'


const HomePage = () => {

  return (
    <Container component="main" maxWidth="xs">
      <PostInput />
      <PostDisplay />
      <CommentInput />
    </Container>

  )
}

export default HomePage