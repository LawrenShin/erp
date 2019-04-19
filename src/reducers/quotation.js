import ApiDefiner, {getDefaultResponse} from './apiRequestDefiner';

export default (state = {  
    list: getDefaultResponse()
  }, action) => {
  
  const {payload, type} = action;
  
  switch(type){
    case 'API_REQUEST':
    case 'API_REQUEST_FAIL':
    case 'API_REQUEST_READY':
      return new ApiDefiner()
        .define(action, state, 'quotation', 'list')
          .request( (requestState) => ({...state, list: {data: [], state: requestState}}))
          .ready( (payload, requestState) => ({...state, list: {data: payload.data.results, state: requestState}}))
          .fail( (payload, requestState) => ({...state, list: {err: payload.err, state: requestState}}))        
        .run();
    default:
      return state;
  }
}