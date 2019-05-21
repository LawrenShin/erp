import Api from './api';
import AxiosError from 'axios-error';
import { push } from 'connected-react-router';

export default (store) => (next) => (action) => {
    const { type, payload, ...rest } = action;
    
    switch (type) {
        case 'API_REQUEST':
            next(action);
            const promise = Api.create(payload.type, payload.method, payload.params);
            promise.then(data => {
                next({type: 'API_REQUEST_READY', payload: {data, type: payload.type, method: payload.method}});
            }).catch(err => {
                if(err === "bad_token"){
                    next({type: 'LOGOUT'});                    
                }
                else{
                    next({type: 'API_REQUEST_FAIL', payload: {err, type: payload.type, method: payload.method}});
                }
            });
        default:
            next(action);
    }
        
}


