import axios from 'axios'

const Comment = {
  read: (id) => axios.get(`/api/comments/item/${id}`),
  create: comment => axios.post('/api/comments', comment),
  update: (id, updates) => axios.put(`/api/comments/${id}`, updates),
  delete: id => axios.delete(`/api/comments/${id}`)
}

export default Comment