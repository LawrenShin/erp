import axios from 'axios';
import AxiosError from 'axios-error';

const HOST = process.env.REACT_APP_HOST;

const HEADERS = {
    'Content-Type': 'application/json'
}

export default class Api {
    static getHeaders(token = false, providedHeader = false){
        if(token === true)
            token = sessionStorage.getItem("access_token");

        return Object.assign({}, HEADERS, token ? {'Authorization': `Bearer ${token}`} : {}, providedHeader ? providedHeader : {});
    }

    static post(url, token = true, data = {}, fullResponse = false, noCheck = false, providedHeader = false){
        return axios.post(`${HOST}/api/${url}`, data, {headers: this.getHeaders(token, providedHeader)})
                    .then(res => fullResponse ? res : res.data)
                    .catch(e => {
                        const error = new AxiosError(e);
                        if(!noCheck && error.status == 401){
                            return Api.post(`auth/token/refresh/`, false, {
                                refresh: sessionStorage.getItem("refresh_token")
                            }, false, true).then( data => {
                                sessionStorage.setItem("access_token", data.access);
                                return Api.post(url, token, data, fullResponse);
                            }).catch( e => {
                                return Promise.reject("bad_token");
                            })
                        }
                        return Promise.reject(error);
                    });
    }

    static put(url, token = true, data = {}, fullResponse = false, noCheck = false){
        return axios.put(`${HOST}/api/${url}`, data, {headers: this.getHeaders(token)})
                    .then(res => fullResponse ? res : res.data)
                    .catch(e => {
                        const error = new AxiosError(e);
                        if(!noCheck && error.status == 401){
                            return Api.post(`auth/token/refresh/`, false, {
                                refresh: sessionStorage.getItem("refresh_token")
                            }, false, true).then( data => {
                                sessionStorage.setItem("access_token", data.access);                                 
                                return Api.put(url, token, data, fullResponse);
                            }).catch( e => {
                                return Promise.reject("bad_token");
                            });
                        }
                        return Promise.reject(error);
                    });
    }

    static get(url, token = true, params = undefined, fullResponse = false, noCheck = false){
        return axios.get(`${HOST}/api/${url}`, {headers: this.getHeaders(token), params})
                    .then(res => fullResponse ? res : res.data)
                    .catch(e => {
                        const error = new AxiosError(e);
                        if(!noCheck && error.status == 401){
                            return Api.post(`auth/token/refresh/`, false, {
                                refresh: sessionStorage.getItem("refresh_token")
                            }, false, true).then( data => {
                                sessionStorage.setItem("access_token", data.access); 
                                return Api.get(url, token, data, fullResponse);
                            }).catch( e => {
                                return Promise.reject("bad_token");
                            });
                        }
                        return Promise.reject(error);
                    });
    }

    static all(methods){
        return axios.all(methods);
    }
}

export const Swisskit = {
    gatherRequests: (dataTypes, limit, requestorName) => Api.all( dataTypes.map(dt => Api.get(`${requestorName}/${dt}/${limit}`)) ),
  
    mapOver: ({ dataTypes, results }) => {
        const map = new Map()
        results.map((r, i) => {
            const rName = dataTypes[i]
            map.set(rName, r)
        })
        return map
    }
  }