import ApiDefiner, {getDefaultResponse} from './apiRequestDefiner';
import { filterByNameSank } from '../components/sanki/products'

const getDefaultOptions = () => ({limit: 50, offset: 0, age: '', name__icontains: '', gender: '', color: '', style_name: '', nomenclature_group: '', kind: '', department: '', trade_mark: '', theme: '', season: '', year: ''});
const getDefaultHeaders = () => [ 'id', 'Name', 'Year', 'Theme', 'Department', 'Vender Code', 'Category', 'Color', 'Gender', 'Age' ];
const FIELDS = ["id", "name", "year", "theme", "department", "vendor_code", "category", "color", "gender", "age"];

export default (state = {
    filters: getDefaultResponse(), 
    options: getDefaultOptions(),
    list: getDefaultResponse(),
    headers: getDefaultHeaders(),
    product: getDefaultResponse(),
},
    action
) => {
    const {payload, type} = action;

    switch(type) {
        case 'API_REQUEST':
        case 'API_REQUEST_FAIL':
        case 'API_REQUEST_READY':
            return new ApiDefiner()
            // .define(action, state, 'product', 'getFilters')
            //     .request( (requestState) => ({...state, filters: {data: [], state: requestState}}))
            //     .ready( (payload, requestState) => {
            //         return {...state, filters: {data: payload.data, state: requestState}}
            //     })
            //     .fail( (payload, requestState) => ({...state, filters: {err: payload.err, state: requestState}}))
                .define(action, state, 'product', 'list')
                    .request( (requestState) => ({...state, list: {data: [], state: requestState}}))
                    .ready( (payload, requestState) => ({...state, list: {count: payload.data.count, data: payload.data.results.map( ({id, name, year, theme, department, vendor_code, category, color, gender, age}) => ({id, name, year, theme, department, vendor_code, category, color, gender, age}) ), state: requestState}}))
                    .fail( (payload, requestState) => ({...state, list: {err: payload.err, state: requestState}}))    
                .define(action, state, 'product', 'getProduct')
                    .request( (requestState) => ({...state, product: {data: [], state: requestState}}))
                    .ready( (payload, requestState) => ({...state, product: {data: payload.data, state: requestState}}))
                    .fail( (payload, requestState) => ({...state, product: {err: payload.err, state: requestState}}))    
                .run();
        case 'SET_OPTIONS': 
            return ({...state, options: payload.options});
        case 'CLEAR_OPTIONS':
            return {...state, options: getDefaultOptions()};

        case 'GET_PRODUCT_FILTERS_DONE':
            return { ...state, filters: { state: 'loaded', data: payload } }
        case 'GET_PRODUCT_FILTERS_ERROR':
            return { ...state, filters: { state: 'error', data: payload } }
        case 'SET_FILTER_NAME_PRODUCT':
            return { ...state, options: { ...state.options, name__icontains: payload } }
        default:
            return state;
    }
}