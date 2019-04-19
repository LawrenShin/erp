export default (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_CUSTOMER_UNMOUNTS':
      return {...action.customer};
    case 'CLEAR':
      return {};
    default:
      return state
  }
}