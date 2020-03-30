import axios from 'axios'

const Comment = {
  read: () => axios.get('/api/comments'),
  create: item => axios.post('/api/comments', comment),
  update: (id, updates) => axios.put(`/api/comments/${id}`, updates),
  delete: id => axios.delete(`/api/comments/${id}`)
}

export default Comment