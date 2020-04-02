import axios from 'axios'

const User = {
  register: user => axios.post('/api/users/register', user),
  login: user => axios.post('/api/users/login', user),
  forgotPassword: user => axios.post('/api/ForgotPasswordToken', user)
}

export default User