import axios from 'axios'

const User = {
  get: id => axios.get(`/api/users/${id}`),
  register: user => axios.post('/api/users/register', user),
  login: user => axios.post('/api/users/login', user),
  forgotPassword: user => axios.post('/api/ForgotPasswordToken', user)
}

export default User