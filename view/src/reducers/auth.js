const initialState = {
  username: '',
  authenticating: true,
  toLogin: false
};

const authReducer = (state = initialState, action) => (
  (action.type === 'AUTH')
    ? Object.assign({}, state, action.payload)
    : state
);

export default authReducer;

