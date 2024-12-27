import axios from 'axios'

const client = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  headers: {},
})

// INTERCEPTORS
client.interceptors.request.use(
  async (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

client.interceptors.response.use(
  async (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default client
