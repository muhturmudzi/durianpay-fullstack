import axios, { type AxiosInstance } from 'axios'
import applyCaseMiddleware from 'axios-case-converter'
import { errorMessages } from './error'

const instance: AxiosInstance = applyCaseMiddleware(
  axios.create({
    baseURL: import.meta.env.VITE_BASE_API || '__VITE_BASE_API__'
  })
)

instance.interceptors.request.use(
  (config) => {
    config.headers.ngrokSkipBrowserWarning = true

    const token = localStorage.getItem('token')

    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 403) {
      localStorage.clear()
      window.location.href = '/auth/login?err=unauthorized'
    }

    if (error.config.method !== 'get') {
      alert(errorMessages(error.response.data.message))
    }

    return Promise.reject(error)
  }
)

export default instance