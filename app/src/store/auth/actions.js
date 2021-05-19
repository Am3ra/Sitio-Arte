import { axiosInstance } from 'boot/axios'

export function login ({ commit, dispatch }, user) {
  commit('AUTH_REQUEST')
  return axiosInstance.post('PENDIENTE', user)
    .then(response => {
      const token = response.data.access_token // PENDIENTE
      commit('AUTH_SUCCESS')
      dispatch('setToken', token)
      return response
    })
    .catch(error => {
      commit('AUTH_RESET')
      throw error
    })
}

export function logout ({ commit, dispatch }) {
  return axiosInstance.get('/api/auth/logout')
    .then(response => {
      dispatch('unsetToken')
      return response
    })
    .catch(error => {
      dispatch('unsetToken')
      throw error
    })
}

export function setToken ({ commit, dispatch }, payload) {
  window.localStorage.setItem('token', payload)
  setAxiosHeaders(payload)
  commit('setToken', payload)
}

export function unsetToken ({ commit }) {
  window.localStorage.removeItem('token')
  commit('setToken', null)
  removeAxiosHeaders()
}

function setAxiosHeaders (token) {
  axiosInstance.defaults.headers.common.Authorization = 'Bearer ' + token
}
function removeAxiosHeaders () {
  delete axiosInstance.defaults.headers.common.Authorization
}
