import axios from 'axios'
import cookie from 'js-cookie'

const api = axios.create({
  baseURL: process.env.BASE_URL ? process.env.BASE_URL : '',
  browserBaseURL: process.env.BROWSER_URL ? process.env.BROWSER_URL : '',
  headers: {
    token: `jwt ${cookie.get('token')}`
  }
})

export const request = (method, url, params) => api[method](url, params)
