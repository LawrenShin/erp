import Api from './api';

//currency
const getCurrency = (pair) => {
    return Api.post(`main/currency_exchange/`, true, JSON.parse(pair));
}

//get cities and countries
const getCities = () => {
    return Api.get(`main/city/`);
}
const getCountries = () => {
    return Api.get(`main/country/`, true, { limit: 1000 });
}
//update user profile
const updateUser = (data) => Api.post(`main/update_profile/`, true, data);

export const collectOptions = (options) => {
    return Object.keys(options).reduce((p, opt) => 
        options[opt] || opt === 'offset' ? `${p}${opt}=${options[opt]}&` : p
    , '?');
}

export default {
    getCurrency,
    getCities,
    getCountries,
    updateUser
};