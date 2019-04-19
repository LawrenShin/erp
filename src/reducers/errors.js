export default (state = [], action) => {
    switch (action.type) {
      case 'LOGIN_ERROR':
        return [{occurred: 'on login request', status: action.err.response.status}]
      case 'LOGIN_ERROR_UNSET':
        return []
      default:
        return state
    }
  }