import Api from './api';

const list = (options = '') => {
    const request = `quotations/quotations/`;    
    return Api.get(`${request}`);
}

export default {
    list
}