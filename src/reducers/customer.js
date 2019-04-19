import ApiDefiner, {getDefaultResponse} from './apiRequestDefiner';

const getDefaultOptions = () => ( {limit: 50, offset: 0, id: "", code: "", name: "", head_contractor: "", item_price: "", region: "", parent: ""} );

export default (state = {  
    customersFilters: getDefaultResponse(),
    list: getDefaultResponse(),
    options: getDefaultOptions(),
    typeItemPrice: getDefaultResponse(),
    parents: getDefaultResponse(),
    dicts: {}
  }, action) => {
  
  const {payload, type} = action;
  
  switch(type){
    case 'API_REQUEST':
    case 'API_REQUEST_FAIL':
    case 'API_REQUEST_READY':
      return new ApiDefiner()
        .define(action, state, 'customer', 'getFilters')
          .request( (requestState) => ({...state, customersFilters: {data: [], state: requestState}}))
          .ready( (payload, requestState) => ({...state, customersFilters: {data: payload.data, state: requestState}}))
          .fail( (payload, requestState) => ({...state, customersFilters: {err: payload.err, state: requestState}}))
        .define(action, state, 'customer', 'list')
          .request( (requestState) => ({...state, list: {data: [], state: requestState}}))
          .ready( (payload, requestState) => ({...state, list: {data: payload.data.results, state: requestState}}))
          .fail( (payload, requestState) => ({...state, list: {err: payload.err, state: requestState}}))
        .define(action, state, 'customer', 'getById')
          .request( (requestState) => ({...state, list: {data: [], state: requestState}}))
          .ready( (payload, requestState) => ({...state, list: {data: payload.data.results, state: requestState}}))
          .fail( (payload, requestState) => ({...state, list: {err: payload.err, state: requestState}}))
        .define(action, state, 'customer', 'getDropdowns')
          .request( (requestState) => ({...state, dicts: {data: [], state: requestState}}))
          .ready( (payload, requestState) => ({...state, dicts: {data: payload.data, state: requestState}}))
          .fail( (payload, requestState) => ({...state, dicts: {err: payload.err, state: requestState}}))
        .define(action, state, 'customer', 'getTypePrice')
          .request( (requestState) => ({...state, typeItemPrice: {data: [], state: requestState}}))
          .ready( (payload, requestState) => ({...state, typeItemPrice: {data: payload.data, state: requestState}}))
          .fail( (payload, requestState) => ({...state, typeItemPrice: {err: payload.err, state: requestState}}))
        .define(action, state, 'customer', 'getParents')
          .request( (requestState) => ({...state, parents: {data: [], state: requestState}}))
          .ready( (payload, requestState) => ({...state, parents: {data: payload.data, state: requestState}}))
          .fail( (payload, requestState) => ({...state, parents: {err: payload.err, state: requestState}}))
        .define(action, state, 'customer', 'getRegions')
          .request( (requestState) => ({...state, regions: {data: [], state: requestState}}))
          .ready( (payload, requestState) => ({...state, regions: {data: payload.data, state: requestState}}))
          .fail( (payload, requestState) => ({...state, regions: {err: payload.err, state: requestState}}))
        .run();
    case 'SET_OPTIONS': 
      return ({...state, options: payload.options});
    case 'ADD_OPTIONS_CUSTOMERS':
      let changes = Object.assign({}, state.options);
      changes[payload.name] = payload.value;
      return {...state, options: changes};
    case 'CLEAR_OPTIONS':
      return {...state, options: getDefaultOptions()};
    default:
      return state;
  }
}