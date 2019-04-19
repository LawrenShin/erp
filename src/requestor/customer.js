import Api from './api';
import {collectOptions} from './common';

//customers
const getFilters = () => {
    return Api.get(`clients/get_clients_filters/`);
}

const list = (options = '') => {
    return Api.get(`clients/clients/${collectOptions(options)}`);
}
const getById = (id = '') => {
    return Api.get(`clients/clients/?id=${id}`);
}
// create customers
const getDropdowns = () => {
    return Api.get(`clients/get_clients_dicts/`);
}
const create = (customerData) => {
    const data = new FormData();
    for(let prop in customerData){
        data.append(prop, customerData[prop]);
    }
    return Api.post(`clients/clients/`, null, data, true);
}

const getParents = () => {
    return Api.get(`clients/clientparent/`);
}
const getTypePrice = () => {
    return Api.get(`clients/typeitemprice/`);
}
const getRegions = () => {
    return Api.get(`main/region/`);
}

export default {
    getFilters,
    list,
    getById,
    getDropdowns,
    create,
    getParents,
    getTypePrice,
    getRegions
};