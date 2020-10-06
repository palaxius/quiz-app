import axios from 'axios'

export default axios.create({
  baseURL: 'https://quiz-app-d44ea.firebaseio.com/'
})