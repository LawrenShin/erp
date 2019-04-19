import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import RootReducer from '../reducers/RootReducer.js';
import middleware from '../middleware';
import {history} from '../routes/history';
import { routerMiddleware } from 'connected-react-router'

import saga from './saga'
import createSagaMiddleware from 'redux-saga'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const setIntervals = (store) => {
    setInterval( () => {
        store.dispatch({type: 'API_REQUEST', payload: {
            type: 'messages',
            method: 'getAllMessages'
        }})
    }, 58000);
}
const sagaMiddleware = createSagaMiddleware()
const thunkEnhancer = applyMiddleware(thunk, routerMiddleware(history), middleware)
const sagaEnhancer = applyMiddleware(sagaMiddleware, routerMiddleware(history))

export default () => {
    const store = createStore(
        RootReducer,
        composeEnhancers( thunkEnhancer, sagaEnhancer )
    );

    sagaMiddleware.run(saga)
    
    let currentValue;

    function handleChange() {
        let previousValue = currentValue
        currentValue = store.getState().router.location.pathname;

        if (previousValue !== currentValue) {
            if( !/^\/orders/.test(currentValue) ){
                store.dispatch({type: 'HIDE_ORDERS_MENU'}); 
            }
            
            if( !new RegExp(`^/suppliers/view`).test(previousValue) &&
                new RegExp(`^/suppliers/view`).test(currentValue) ||
                !new RegExp(`^/suppliers/edit`).test(previousValue) &&
                new RegExp(`^/suppliers/edit`).test(currentValue)){
                    store.dispatch({type: 'NEED_TO_UPDATE', payload: {
                        type: 'supplier'                        
                    }})
            }
        }
    }
      
    const unsubscribe = store.subscribe(handleChange)

    store.dispatch({type: 'API_REQUEST', payload: {
        type: 'messages',
        method: 'getAllMessages'
    }})
    
    setIntervals(store);

    return store;
}
