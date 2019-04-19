export default (state = false, action) => {
  switch(action.type){
  case 'SET_CURRENCY_PAIR':
    return action.currencyPair;
  default:
    return state;
  }
}