export default function auth(state = { token: null, sined: false }, action) {
  switch (action.type) {
    case '@auth/SIGN_IN': {
      return action.user;
    }

    default:
      return state;
  }
}
