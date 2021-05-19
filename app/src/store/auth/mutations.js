export function setToken (state, payload) {
  state.token = payload
}
export function AUTH_REQUEST (state, payload) {
  state.status = 'loading'
}
export function AUTH_SUCCESS (state, payload) {
  state.status = 'success'
}
export function AUTH_RESET (state, payload) {
  state.status = ''
}
