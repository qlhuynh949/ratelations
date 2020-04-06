import axios from 'axios'

const Friends = {
  read: () => axios.get('/api/friends'),
  create: friend => axios.post('/api/friends', friend),
  update: (id, updates) => axios.put(`/api/friends/${id}`, updates),
  delete: id => axios.delete(`/api/friends/${id}`)
}

export default Friends