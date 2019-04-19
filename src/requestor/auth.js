import Api from './api';

const login = ({username, password}) => {
    const data = {
        username,
        password
    };
    return Api.post(`auth/token/obtain/`, undefined, data)
        .then( data => {
            sessionStorage.setItem("access_token", data.access); 
            sessionStorage.setItem("refresh_token", data.refresh);
            return data;
        });
};

export default {
    login
};