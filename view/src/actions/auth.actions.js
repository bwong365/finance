const auth = 'AUTH'

export default {
  setUsername,
  toLogin,
  isAuthenticating
}

export function setUsername(username) {
  return { type: auth, payload: { username } };
}

export function setToken(token) {
  return { type: auth, payload: { token } }
}

export function isAuthenticating(authenticating) {
  return { type: auth, payload: { authenticating } };
}

export function toLogin(boolean) {
  return { type: auth, payload: { toLogin: boolean } };
}
