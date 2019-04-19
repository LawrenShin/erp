export const login = (user = {}) => ({
  type: 'LOGIN',
  user: { ...user }
});

export const loginError = (err) => ({
  type: 'LOGIN_ERROR',
  err
});

export const loginErrorUnset = () => ({
  type: 'LOGIN_ERROR_UNSET'
})
