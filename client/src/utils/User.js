import axios from 'axios'

const User = {
  register: user => axios.post('/api/users/register', user),
  updateAccount: user => axios.post('/api/users/updateAccount', user),
  login: user => axios.post('/api/users/login', user),
  forgotPassword: user => axios.post('/api/ForgotPasswordToken', user),
  checkToken: user=>axios.post('/api/CheckToken',user),
  userSearch: (search) => axios.post('/api/users/userSearch',search),
  userFriends: (id) => axios.get(`/api/users/userFriends/${id}`),
  userFriendsDetach: (friendsDetach) => axios.post(`/api/users/userFriendsDetach/`,friendsDetach),
  userRelationship: (id) => axios.get(`/api/users/userRelationship/${id}`),
  userRelationshipAttach: (relationshipAttach) => axios.post(`/api/users/userRelationshipAttach/`, relationshipAttach),
  userRelationshipDetach: (relationshipDetach) => axios.post(`/api/users/userRelationshipDetach/`, relationshipDetach),
  userRelationshipFollowing: (relationshipFollowing) => axios.post(`/api/users/userRelationshipFollowing/`, relationshipFollowing),
  userRelationshipFollowingFollower: (follower) => axios.get(`/api/users/userRelationshipFollowingFollower/${follower}`),
  userRelationshipFollowingMe: (me) => axios.get(`/api/users/userRelationshipFollowingMe/${me}`), 
  userRelationshipFollowingIdDetach: (id) => axios.delete(`/api/users/userRelationshipFollowingIdDetach/${id}`), 
}

export default User