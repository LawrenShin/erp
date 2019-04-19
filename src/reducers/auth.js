const getDefaultState = () => {
  return JSON.parse(sessionStorage.getItem("user")) || {};
}

export default (state = getDefaultState(), action) => {
  const { type, payload } = action;
  switch (type) {
    case 'LOGIN':
      sessionStorage.setItem("user", JSON.stringify(action.user));
      return action.user;
    case 'LOGOUT':
      sessionStorage.removeItem("user");
      return {};
    case 'UPDATE_USER_STORAGE': 
      const { first_name, last_name, role, lang } = payload;
      const user = JSON.parse(sessionStorage.getItem("user"));
      const updatedUser = Object.assign(user, {first_name}, {last_name}, {role}, {lang});
      sessionStorage.setItem('user', JSON.stringify(updatedUser));

      return { ...state, first_name, last_name, role, lang };
    default:
      return state;
  }
}