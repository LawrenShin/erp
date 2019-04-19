import ApiDefiner, {getDefaultResponse} from './apiRequestDefiner';

const getDefaultOptions = () => ({limit: 50, offset: 0, year: '', brand: '', season: '', theme: '', wdh_date: ''});

export default (state = {
    filters: getDefaultResponse(), 
    options: getDefaultOptions(),
    list: getDefaultResponse(),
    raiting: getDefaultResponse(),
    packingList: getDefaultResponse(),
    top30: getDefaultResponse(),
    testSuppliers: getDefaultResponse(),
    weeklyPayments: getDefaultResponse(),
    reconsiderTerms: getDefaultResponse(),
    nlgCapacityChart: getDefaultResponse()
},
    action
) => {
    const {payload, type} = action;

    switch(type) {
        case 'API_REQUEST':
        case 'API_REQUEST_FAIL':
        case 'API_REQUEST_READY':
            return new ApiDefiner()
                .define(action, state, 'dashboard', 'getFilters')
                    .request( (requestState) => ({...state, filters: {data: [], state: requestState}}))
                    .ready( (payload, requestState) => ({...state, filters: {data: payload.data, state: requestState}}))
                    .fail( (payload, requestState) => ({...state, filters: {err: payload.err, state: requestState}}))
                .define(action, state, 'dashboard', 'list')
                    .request( (requestState) => ({...state, list: {data: [], state: requestState}}))
                    .ready( (payload, requestState) => ({...state, list: {data: payload.data, state: requestState}}))
                    .fail( (payload, requestState) => ({...state, list: {err: payload.err, state: requestState}}))    
                .define(action, state, 'dashboard', 'getRaiting')
                    .request( (requestState) => ({...state, raiting: {data: [], state: requestState}}))
                    .ready( (payload, requestState) => ({...state, raiting: {data: payload.data.map( ({name, financial_rating, credit_debt}) => ({name, financial_rating, credit_debt}) ), state: requestState}}))
                    .fail( (payload, requestState) => ({...state, raiting: {err: payload.err, state: requestState}}))    
                .define(action, state, 'dashboard', 'getPackingList')
                    .request( (requestState) => ({...state, packingList: {data: [], state: requestState}}))
                    .ready( (payload, requestState) => ({...state, packingList: {data: payload.data.map( ({supplier_name, style_name, whd_date, vessel_date, pl_status, year, trade_mark, season, theme}) => ({supplier_name, style_name, whd_date, vessel_date, pl_status, year, trade_mark, season, theme}) ), state: requestState}}))
                    .fail( (payload, requestState) => ({...state, packingList: {err: payload.err, state: requestState}}))    
                .define(action, state, 'dashboard', 'getTop30Suppliers')
                    .request( (requestState) => ({...state, top30: {data: [], state: requestState}}))
                    .ready( (payload, requestState) => ({...state, top30: {data: payload.data, state: requestState}}))
                    .fail( (payload, requestState) => ({...state, top30: {err: payload.err, state: requestState}}))
                .define(action, state, 'dashboard', 'getTestSuppliers')
                    .request( (requestState) => ({...state, testSuppliers: {data: [], state: requestState}}))
                    .ready( (payload, requestState) => ({...state, testSuppliers: {data: payload.data, state: requestState}}))
                    .fail( (payload, requestState) => ({...state, testSuppliers: {err: payload.err, state: requestState}}))
                .define(action, state, 'dashboard', 'getWeeklyPayments')
                    .request( (requestState) => ({...state, weeklyPayments: {data: [], state: requestState}}))
                    .ready( (payload, requestState) => ({...state, weeklyPayments: {data: payload.data, state: requestState}}))
                    .fail( (payload, requestState) => ({...state, weeklyPayments: {err: payload.err, state: requestState}}))
                .define(action, state, 'dashboard', 'getReconsiderTerms')
                    .request( (requestState) => ({...state, reconsiderTerms: {data: [], state: requestState}}))
                    .ready( (payload, requestState) => ({...state, reconsiderTerms: {data: payload.data, state: requestState}}))
                    .fail( (payload, requestState) => ({...state, reconsiderTerms: {err: payload.err, state: requestState}}))
                .define(action, state, 'dashboard', 'getNlgCapacityChart')
                    .request( (requestState) => ({...state, nlgCapacityChart: {data: [], state: requestState}}))
                    .ready( (payload, requestState) => ({...state, nlgCapacityChart: {data: payload.data, state: requestState}}))
                    .fail( (payload, requestState) => ({...state, nlgCapacityChart: {err: payload.err, state: requestState}}))
                .run();
        case 'SET_DASHBOARD_OPTIONS': 
            return ({...state, options: {...payload}});
        case 'CLEAR_OPTIONS':
            return {...state, options: getDefaultOptions()};
        default:
            return state;
    }
}

