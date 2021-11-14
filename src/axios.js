import axios from 'axios'

const instance = axios.create({
    baseURL : 'http://localhost:5001/e-commerce-c46d1/us-central1/api' //The Api Url (Cloud function) url
})

export default instance