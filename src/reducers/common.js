export default (
  state = {
    showGallery: false, 
    showOrdersMenu: false, 
    ordering: [],
    popupMessage: { error: '', text: '', time: 0 },
  }, action) => {
  
  const {payload, type} = action;

  switch (type) {
    case 'POPUP_DONE':
        return { ...state, popupMessage: { error: '', text: '', time: 0 } }
    case 'POPUP_MODAL':
        return { ...state, popupMessage: {...state.popupMessage, ...payload} }
    case 'SHOW_GALLERY':
      return {...state, showGallery: true};
    case 'HIDE_GALLERY':
      return {...state, showGallery: false};
    case 'SHOW_ORDERS_MENU':
      return {...state, showOrdersMenu: true};
    case 'HIDE_ORDERS_MENU':
      return {...state, showOrdersMenu: false};
    
    default:
      return state;
  }
}