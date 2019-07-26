import ApiDefiner, {getDefaultResponse} from './apiRequestDefiner';

const DEFAULTS = {
  start: '?',
  name__icontains: '',
  age: '',
  payment_terms: '',
  categories: '',
  genders: '',
  countries: '',
  cities: '',
  supplier_names: '',
  incoterms: '',
  status: '',
  type: '',
  offset: 0,
  ordering: [],
  limit: 50,
  checkboxes: {
    is_timely_response_to_letters: true,
    is_cost_break_down: true,
    is_no_spam_any_work_questions: true,
    is_efficiency_work_with_orders: true,
    is_discount_reject_delay: true
  },
  ratings: {
    general_rating: {from: 0, to: 100 },
    financial_rating: {from: 0, to: 100},
    reliability_rating: {from: 0, to: 100}
  }
};

const getDefaultOptions = () => {
  return Object.assign({}, DEFAULTS);
}

export default (state = {
    request: false, 
    filters: getDefaultResponse(), 
    options: getDefaultOptions(), 
    list:    getDefaultResponse(),
    paymentTerms: getDefaultResponse(),
    ages: getDefaultResponse(),
    categories: getDefaultResponse(),
    genders: getDefaultResponse(),
    supplier: getDefaultResponse(),
    needToGetSupplier: true,
    raiting: getDefaultResponse(),
    orderList: getDefaultResponse(),
    graphDetails: getDefaultResponse(),
    uploadedContracts: {
      loading: false,
      error: '',
      result: ''
    },
  }, action) => {
    
    const {payload, type} = action;

    switch (type) {
      case 'API_REQUEST':
      case 'API_REQUEST_FAIL':
      case 'API_REQUEST_READY':
        return new ApiDefiner()
          .define(action, state, 'supplier', 'list')
            .request( (requestState) => ({...state, list: {data: [], state: requestState}}))
            .ready( (payload, requestState) => ({...state, list: {data: payload.data.results, count: payload.data.count, state: requestState}}))
            .fail( (payload, requestState) => ({...state, list: {err: payload.err, state: requestState}}))
          .define(action, state, 'supplier', 'getById')
            .request( (requestState) => ({...state, supplier: {data: [], state: requestState}}))
            .ready( (payload, requestState) => ({...state, needToGetSupplier: false, supplier: {data: payload.data, state: requestState}}))
            .fail( (payload, requestState) => ({...state, needToGetSupplier: true, supplier: {err: payload.err, state: requestState}}))
          .define(action, state, 'supplier', 'getFilters')
            .request( (requestState) => ({...state, filters: {data: [], state: requestState}}))
            .ready( (payload, requestState) => ({...state, filters: {data: payload.data, state: requestState}}))
            .fail( (payload, requestState) => ({...state, filters: {err: payload.err, state: requestState}}))
          .define(action, state, 'supplier', 'getPaymentTerms')
            .request( (requestState) => ({...state, paymentTerms: {data: [], state: requestState}}))
            .ready( (payload, requestState) => ({...state, paymentTerms: {
                data: payload.data.data.results.map(({id, name}) => (
                  { key: id, value: id, text: name }
                )), 
                state: requestState}})
              )
            .fail( (payload, requestState) => ({...state, paymentTerms: {err: payload.err, state: requestState}}))
          .define(action, state, 'supplier', 'getGenders')
            .request( (requestState) => ({...state, genders: {data: [], state: requestState}}))
            .ready( (payload, requestState) => ({...state, genders: {data: payload.data.results, state: requestState}}))
            .fail( (payload, requestState) => ({...state, genders: {err: payload.err, state: requestState}}))
          .define(action, state, 'supplier', 'getAges')
            .request( (requestState) => ({...state, ages: {data: [], state: requestState}}))
            .ready( (payload, requestState) => ({...state, ages: {data: payload.data.results, state: requestState}}))
            .fail( (payload, requestState) => ({...state, ages: {err: payload.err, state: requestState}}))
          .define(action, state, 'supplier', 'getCategories')
            .request( (requestState) => ({...state, categories: {data: [], state: requestState}}))
            .ready( (payload, requestState) => ({...state, categories: {data: payload.data.results, state: requestState}}))
            .fail( (payload, requestState) => ({...state, categories: {err: payload.err, state: requestState}}))
          .define(action, state, 'supplier', 'orderList')
            .request( (requestState) => ({...state, orderList: {data: [], state: requestState}}))
            .ready( (payload, requestState) => ({...state, orderList: {data: payload.data, state: requestState}}))
            .fail( (payload, requestState) => ({...state, orderList: {err: payload.err, state: requestState}}))
          .define(action, state, 'supplier', 'getSupplierDetails')
            .request( (requestState) => ({...state, details: {data: [], state: requestState}}))
            .ready( (payload, requestState) => ({...state, details: {data: payload.data, state: requestState}}))
            .fail( (payload, requestState) => ({...state, details: {err: payload.err, state: requestState}}))
          .run();
      case 'NEED_TO_UPDATE':
        return {...state, needToGetSupplier: true};
      case 'SET_FILTERS':
        return {...state, filters: action.filters};
      case 'ADD_OPTIONS_SUPPLIERS':
        let changes = Object.assign({}, state.options), option = action.payload.option.toLowerCase().replace(' ', '_')
        console.log(changes, state.options)
        for(let prop in changes){
          if(prop === option && prop !== 'start' && prop !== 'checkboxes') 
            changes[prop] = action.payload.value;
            if(prop === 'checkboxes'){
            for(let box in changes['checkboxes']){
              if(box === option) 
                changes['checkboxes'][box] = action.payload.value;
            }
          }
          if(prop === 'ratings'){
            for(let rating in changes['ratings']){
              if(rating === action.payload.option) 
                changes['ratings'][rating] = action.payload.value;
            }
          }
        }
        return {...state, options: changes};
      case 'CLEAR_OPTIONS':
        return {...state, options: getDefaultOptions()};
      case 'SET_GRAPH_DETAILS_SUPPLIERS':
        return {...state, graphDetails: { data: payload, state: 'loaded'}};
      case 'UPLOAD_CONTRACT_START':
        return { ...state, uploadedContracts: { ...state.uploadedContracts, loading: true } }
      case 'UPLOAD_CONTRACT_DONE':
        return { ...state, uploadedContracts: { ...state.uploadedContracts, loading: false, results: payload } }
      case 'UPLOAD_CONTRACT_ERROR':
        return { ...state, uploadedContracts: { ...state.uploadedContracts, loading: false, error: payload } }
      case 'SET_FILTER_NAME_SUPPLIER':
        return { ...state, options: { ...state.options, name__icontains: payload } }
      case 'ADD_ORDERING': 
        return { ...state, 
          options: {
            ...state.options,
            ordering: !!state.options.ordering.length ? [state.options.ordering.includes(payload) ? `-${payload}` : state.options.ordering.includes(`-${payload}`) ? `${payload}` : `-${payload}`] 
            : [`-${payload}`] 
          }
        }

      default:
        return state
    }
}