import React, { useState, useEffect } from 'react'
import PostInput from '../PostInput'
import PostDisplay from '../PostDisplay'
import CommentInput from '../CommentInput'
import Container from '@material-ui/core/Container'
import Item from '../../utils/Item'
import Comment from '../../utils/Comments'

const RelationshipView = (props) => {
  const [relationshipState, setRelationshipState] = useState({
    relationshipid:0, //Specific Relationship chart to view based off relationship id
    loggedInUserId:0, //Logged in User requesting to view the chart
    loggedInUserRelationTypeId:0 //Logged in User's type 0 means they are a friend    
    /* loggedInUserRelationTypeId
       = 0
       = 1 means they are a user in the relationship    
    */ 
  })

  //console.log(props)
  const [itemState, setItemState] = useState({
    items: [],
    score: '',
    goodtext: '',
    badtext: '',
    isActive: true,
    ralationship: '',
    user: '',

  })

  const handleInputChange = ({ target }) => {
    setItemState({ ...itemState, [target.name]: target.value })
    // console.log(target.value)
  }

  const handleCommentInput = ({ target }) => {
    setCommentState({ ...commentState, text: target.value })
  }
  // relationship?????
  const handleCreateItem = (event) => {
    event.preventDefault()
    //console.log('ping')
    Item.create({
      user: props.userState.uid,
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
    //console.log('pang')
    Comment.create({
      user: props.userState.uid,
      item: commentState.item,
      text: commentState.text,
      isActive: true
    })
      .then(({ data: comment }) => {
        let comments = JSON.parse(JSON.stringify(commentState.comments))
        comments.push(comment)
        setCommentState({ ...setCommentState, comments, text: '' })
      })
  }
  const handleGetItemId = itemValue => {
    //console.log(target)
    //console.log(itemValue)
    setCommentState({ ...commentState, item: itemValue })

  }


  useEffect(() => {
    Item.read()
      .then(({ data: items }) => {
        setItemState({ items })
        // console.log(items)
      })
    Comment.read()
      .then(({ data: comments }) => {
        setCommentState({ comments })
        // console.log(comments)
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
      <PostDisplay
        comments={commentState.comments}
        items={itemState.items}
        handleGetItemId={handleGetItemId}
      />
      {commentState.item ?
        <CommentInput
          item={commentState.item}
          text={commentState.text}
          handleInputChange={handleCommentInput}
          handleCreateComment={handleCreateComment}
        /> : null}
    </Container>

  )
}


export default RelationshipView