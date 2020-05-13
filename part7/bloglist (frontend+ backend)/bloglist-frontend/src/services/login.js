import axios from 'axios'
const baseUrl2 = '/api/login'
const baseUrl = '/api/users'

const login = async credentials => {
  const response = await axios.post(baseUrl2, credentials)
  console.log(response.data)
  return response.data
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll, login }