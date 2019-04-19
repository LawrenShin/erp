const isEmptyObj = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export default (state = {general_info: {}, contact_info: {}, options_info: {}, bank_info: {}, step: 0}, action) => {
  const stepInc = action.step !== undefined ? action.step : 1;
  
  switch (action.type) {
    case 'GENERAL_INFO':
      if(!isEmptyObj(action.info)) return {...state, general_info: action.info, step: state.step + stepInc };
      return {...state, step: state.step + stepInc };

    case 'CONTACT_INFO':
      if(!isEmptyObj(action.info)) return {...state, contact_info: action.info, step: state.step + stepInc };
      return {...state, step: state.step + stepInc };
    
    case 'OPTIONS_INFO':
      if(!isEmptyObj(action.info)) return {...state, options_info: action.info, step: state.step + stepInc };
      return {...state, step: state.step + stepInc };
    
    case 'BANK_INFO':
      if(!isEmptyObj(action.info)) return {...state, bank_info: action.info, step: state.step + stepInc };
      return {...state, step: state.step + stepInc };

    case 'STEP_BACK':
      if(state.step > 0) return {...state, step: state.step - 1 };
      return state;

    default:
      return state
  }
}