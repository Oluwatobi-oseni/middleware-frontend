import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL as string

export const Axios = axios.create({
  baseURL: BASE_URL,
})
