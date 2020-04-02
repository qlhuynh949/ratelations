import React, { useState, useEffect } from 'react'
import PostInput from '../PostInput'
import PostDisplay from '../PostDisplay'
import CommentInput from '../CommentInput'
import Container from '@material-ui/core/Container'
import Item from '../../utils/Item'
import Comment from '../../utils/Comments'

const HomePage = () => {
  const [itemState, setItemState] = useState({
    items: [],
    score: '',
    goodtext: '',
    badtext: '',
    isActive: true,
    ralationship: '',
  })
  const handleInputChange = ({ target }) => {
    setItemState({ ...itemState, [target.name]: target.value })
    console.log(target.value)
  }
  const handleCommentInput = ({ target }) => {
    setCommentState({ ...commentState, text: target.value })
  }
  // relationship?????
  const handleCreateItem = (event) => {
    event.preventDefault()
    console.log('ping')
    Item.create({
      score: itemState.score,
      goodtext: itemState.goodtext,
      badtext: itemState.badtext,
      isActive: true
    })
      .then(({ data: item }) => {
        let items = JSON.parse(JSON.stringify(itemState.items))
        items.push(item)
        setItemState({ ...itemState, items, score: '', goodtext: '', badtext: '' })
      })
  }

  const [commentState, setCommentState] = useState({
    comments: [],
    text: '',
    isActive: true,
    ralationship: '',
    item: '',
    user: '',
  })
  const handleCreateComment = (event) => {
    event.preventDefault()
    console.log('pang')
    Comment.create({
      text: commentState.text,
      isActive: true
    })
      .then(({ data: comment }) => {
        let comments = JSON.parse(JSON.stringify(commentState.comments))
        comments.push(comment)
        setCommentState({ ...setCommentState, comments, text: '' })
      })
  }






  useEffect(() => {
    Item.read()
      .then(({ data: items }) => {
        setItemState({ items })
      })

  }, [])

  return (
    <Container component="main" maxWidth="xs">
      <PostInput
        goodText={itemState.goodtext}
        badText={itemState.badtext}
        score={itemState.score}
        handleInputChange={handleInputChange}
        handleCreateItem={handleCreateItem} />
      <PostDisplay items={itemState.items} />
      <CommentInput
        text={commentState.text}
        handleInputChange={handleCommentInput}
        handleCreateComment={handleCreateComment}
      />
    </Container>

  )
}


export default HomePage