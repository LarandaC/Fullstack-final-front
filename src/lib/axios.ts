import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api',
})

api.interceptors.request.use((config) => {
  const raw = localStorage.getItem('auth-store')
  const token = raw ? JSON.parse(raw)?.state?.token : null
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
