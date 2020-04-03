import axios from 'axios'

const User = {
  // get: user => axios.post(`/api/users/${id}`, user),
  register: user => axios.post('/api/users/register', user),
  login: user => axios.post('/api/users/login', user),
  forgotPassword: user => axios.post('/api/ForgotPasswordToken', user)
}

export default User