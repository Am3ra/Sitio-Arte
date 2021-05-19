import Vue from 'vue'
import axios from 'axios'

axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.headers['Accept'] = 'application/json'

const API_URL = (process.env.API_URL)

const axiosInstance = axios.create({
  baseURL: API_URL
})

Vue.prototype.$axios = axiosInstance

export { axiosInstance }
