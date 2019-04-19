export default (
  state = {
    showGallery: false, 
    showOrdersMenu: false, 
    ordering: []
  }, action) => {
  
  const {payload, type} = action;
  const {ordering} = state;

  switch (action.type) {
    case 'SHOW_GALLERY':
      return {...state, showGallery: true};
    case 'HIDE_GALLERY':
      return {...state, showGallery: false};
    case 'SHOW_ORDERS_MENU':
      return {...state, showOrdersMenu: true};
    case 'HIDE_ORDERS_MENU':
      return {...state, showOrdersMenu: false};
    case 'ADD_ORDERIGN': 
      return { ...state, ordering: ordering.length ? [ordering.includes(payload) ? `-${payload}` : ordering.includes(`-${payload}`) ? `${payload}` : `-${payload}`] : [`-${payload}`]};
    case 'SET_FILTER_NAME':
      return { ...state, filterName: payload };
    default:
      return state;
  }
}