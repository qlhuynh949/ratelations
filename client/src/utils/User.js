import axios from 'axios'

const User = {
  register: user => axios.post('/api/users/register', user),
  updateAccount: user => axios.post('/api/users/updateAccount', user),
  login: user => axios.post('/api/users/login', user),
  forgotPassword: user => axios.post('/api/ForgotPasswordToken', user),
  checkToken: user=>axios.post('/api/CheckToken',user),
  userSearch: (searchText) => axios.get(`/api/users/userSearch/'${searchText}'`)
}

export default User