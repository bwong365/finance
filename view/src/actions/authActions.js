/**
 * Authorization actions for Redux
 */
const auth = 'AUTH'

export default {
  isAuthenticating,
  setUsername,
  toLogin,
};

// Used for loading animation
export function isAuthenticating(authenticating) {
  return { type: auth, payload: { authenticating } };
};

// Used for verification (isLoggedIn) plus display
export function setUsername(username) {
  return { type: auth, payload: { username } };
};

// Used to enforce redirect to login screen
export function toLogin(boolean) {
  return { type: auth, payload: { toLogin: boolean } };
};
