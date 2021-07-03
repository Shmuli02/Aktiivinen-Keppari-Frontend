import axios from 'axios'
const baseUrl = '/api/users'

const register = async newObject => {
  const response = await axios.post(baseUrl,newObject)
  return response.data
}
const userData = async user => {
  const response = await axios.get(baseUrl)
  const userdata = response.data.filter(users => users.username === user.username )

  return userdata
}

export default {register, userData}