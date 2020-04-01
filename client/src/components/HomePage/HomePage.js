import React,{ useState, useEffect } from 'react'
import PostInput from '../PostInput'
import PostDisplay from '../PostDisplay'
import CommentInput from '../CommentInput'
import Container from '@material-ui/core/Container'
import Item from '../../utils/Item'

const HomePage = () => {
  const [itemState, setItemState] = useState({
    items: [],
    score: '',
    goodtext: '',
    badtext: '',
    isActive: true,
    Ralationship: '',
  })
  const handleInputChange = ({ target }) => {
    setItemState({ ...itemState, [target.name]: target.value })
    // console.log(target.value)
  }



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

  useEffect(() => {
    Item.read()
      .then(({ data: items }) => {
        setItemState({ ...itemState, items })
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
      <CommentInput />
    </Container>

  )
}


export default HomePage