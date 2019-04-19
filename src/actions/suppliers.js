export const supplierList = (options) => ({
  type: 'API_REQUEST', 
  payload: {
    type: 'supplier', 
    method: 'list', 
    params: [options]
  }
});

export const addOptions = ({placeholder, value}) => ({
  type: 'ADD_OPTIONS_SUPPLIERS', 
  payload: {
    option: placeholder, 
    value 
  }
});

export const clearOptions = () => ({
  type: 'CLEAR_OPTIONS'
});

export const fetchFilters = () => ({
  type: 'API_REQUEST',
  payload: {
    method: 'getFilters',
    type: 'supplier'
  }
});
