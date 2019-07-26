import productsApi from '../../requestor/product'
import { store } from '../../store/createdStore'

export const getFilters = (dispatch) => {
    dispatch({ type: 'GET_PRODUCT_FILTERS_START' })
    productsApi.getFilters()
    .then(filters => dispatch({ type: 'GET_PRODUCT_FILTERS_DONE', payload: filters }))
    .catch(e => dispatch({ type: 'GET_PRODUCT_FILTERS_ERROR', payload: e.message }))
}