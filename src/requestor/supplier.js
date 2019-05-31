import Api from './api';

//SUPPLIERS REQUESTS
//suppliers for list of suppliers
/*export*/ const list = (options = '') => {
    const request = `suppliers/suppliers/`;
    //refactor options for request
    let refactored = [];
    for(let o in options){
        if(o !== 'start' && o !== 'checkboxes' && o !== 'ratings' && o !== 'ordering' && options[o]) {
            refactored.push(`${o}=${options[o]}`);
        };
        if(o === 'checkboxes'){
            for(let box in options['checkboxes']){
                refactored.push(`${box}=${options['checkboxes'][box]}`);
            }
        }
        if(o === 'ratings'){
            for(let rating in options['ratings']){
                refactored.push(`${rating}=from_${options['ratings'][rating].from}to_${options['ratings'][rating].to}`);
            }
        }
        if(o === 'ordering'){
            refactored.push(`${o}=${options[o].join(',')}`);
        }
    }
    if(refactored.length) return Api.get(`${request}?${refactored.join('&')}`);
    return Api.get(`${request}`);
}
/*export*/ const getById = (id) => {
    return Api.get(`suppliers/suppliers/${id}/`);
}
/*export*/ const edit = (data) => {
    return Api.put(`suppliers/suppliers/${data.id}/`, true, data, true);
}
//filters for list of suppliers
/*export*/ const getFilters = () => {
    return Api.get(`supplier/get_supplier_filters/`);
}
//get data for options form of createSupplierPage
/*export*/ const getCategories = () => {
    return Api.get(`suppliers/categories/`);
}
/*export*/ const getGenders = () => {
    return Api.get(`suppliers/genders/`);
}
/*export*/ const getAges = () => {
    return Api.get(`suppliers/ages/`);
}
/*export*/ const getAllOptions = () => {
    return Api.all([getAges(), getGenders(), getCategories()]);
}
//get data for options form
/*export*/ const getPaymentTerms = () => {
    return Api.get(`suppliers/payment_terms/`, null, { limit: 100 }, true);
}
const getSupplierDetails = (id) => {
    return Api.post(`suppliers/supplier/details/`, true, {supplier_id: id});
}

//create supplier
/*export*/ const create = (supplierData) => {
    const data = new FormData();
    for(let prop in supplierData){
        data.append(prop, supplierData[prop]);
    }
    return Api.post(`suppliers/suppliers/`, null, data);
}

//after create supplier save corresponded data
const suppliersCategories = (supplierId, categoryId) => {
    const data = {
        supplier: supplierId,
        category: categoryId
    }
    return Api.post(`suppliers/supplier_categories/`, null, data);
};
/*export*/ const saveCategories = (supplierId, categoriesList) => {
    let i = categoriesList.length > 1 ? categoriesList.length - 1 : 1, categoriesRequests = [];
    if(i){
         do{
            if(typeof categoriesList[i] !== 'undefined' ) 
                categoriesRequests.push( suppliersCategories(supplierId, categoriesList[i]) );
        }while(i--);
    }
    return Api.all(categoriesRequests).then((res) => {
        return Promise.resolve(res);
    }).catch((errs) => {
        return Promise.reject(errs);
    });
}

const suppliersGenders = (supplierId, genderId) => {
    const data = {
        supplier: supplierId,
        gender: genderId
    }
    return Api.post(`suppliers/supplier_genders/`, null, data);
}
/*export*/ const saveGenders = (supplierId, gendersList) => {
    let i = gendersList.length > 1 ? gendersList.length - 1 : 1, gendersRequests = [];
    if(i){
         do{
            if(typeof gendersList[i] !== 'undefined' ) 
                gendersRequests.push( suppliersGenders(supplierId, gendersList[i]) );
        }while(i--);
    }
    return Api.all(gendersRequests).then((res) => {
        return Promise.resolve(res);
    }).catch((errs) => {
        return Promise.reject(errs);
    });
}

const suppliersAges = (supplierId, ageId) => {
    const data = {
        supplier: supplierId,
        age: ageId
    }
    return Api.post(`suppliers/supplier_ages/`, null, data);
}
/*export*/ const saveAges = (supplierId, agesList) => {
    let i = agesList.length > 1 ? agesList.length - 1 : 1, agesRequests = [];
    if(i){
         do{
            if(typeof agesList[i] !== 'undefined' ) 
                agesRequests.push( suppliersAges(supplierId, agesList[i]) );
        }while(i--);
    }
    return Api.all(agesRequests).then((res) => {
        return Promise.resolve(res);
    }).catch((errs) => {
        return Promise.reject(errs);
    });
}
const suppliersContacts = (supplierId, incoterm) => {
    const data = {
        supplier: supplierId,
        ...incoterm
    };
    return Api.post(`suppliers/contact/`, null, data);
}
/*export*/ const saveContacts = (supplierId, incoterms) => {
    let i = incoterms.length > 1 ? incoterms.length - 1 : 1, incotermsRequests = [];
    do {
        if(typeof incoterms[i] !== 'undefined') 
            incotermsRequests.push( suppliersContacts(supplierId, incoterms[i]) );
    } while(i--);
    return Api.all(incotermsRequests).then((res) => {
        return Promise.resolve(res);
    }).catch((errs) => {
        return Promise.reject(errs);
    })
}

// get details for unfolded graphs in supplier table
export const getGraphsDetails = (id) => Api.post('suppliers/supplier/details/', true, { supplier_id: id });

/*export*/ const orderList = (id) => {
    return new Promise( (res) => {
        setTimeout( () => {
            res([{
                    year: 2018,
                    season: 'SS',
                    theme: 'Theme1',
                    brand: 'Independent',
                    qnty: '4 000',
                    amount: '2 500 667',
                    currency: 'USD',
                    purchaser: 'China LTD',
                    number: '12345',
                    status: 'CLOSED'
                },
                {
                    year: 2018,
                    season: 'SS',
                    theme: 'Theme1',
                    brand: 'Independent',
                    qnty: '4 000',
                    amount: '2 500 667',
                    currency: 'USD',
                    purchaser: 'China LTD',
                    number: '12345',
                    status: 'OPEN'
                },
                {
                    year: 2018,
                    season: 'SS',
                    theme: 'Theme1',
                    brand: 'Independent',
                    qnty: '4 000',
                    amount: '2 500 667',
                    currency: 'USD',
                    purchaser: 'China LTD',
                    number: 12345,
                    status: 'CANCELED'
                },
                {
                    year: 2018,
                    season: 'SS',
                    theme: 'Theme1',
                    brand: 'Independent',
                    qnty: '4 000',
                    amount: '2 500 667',
                    currency: 'USD',
                    purchaser: 'China LTD',
                    number: 12345,
                    status: 'IN TRANSIT'
                }])
        }, 700);
    })
}

const uploadContract = ({ supplier, file }) => {
    let bodyFormData = new FormData();
    bodyFormData.append('file', file)
    bodyFormData.append('supplier', supplier)
    return Api.post('suppliers/contract/', true, bodyFormData, false, false, {'Content-Type': 'multipart/form-data' })
}
const getUploadedContract = (id) => Api.get(`suppliers/contract/?supplier=${id}`)
const deleteUploadedContract = (id) => Api.delete(`suppliers/contract/${id}/`)

export default {
    saveContacts,
    saveAges,
    saveGenders,
    saveCategories,
    create,
    getPaymentTerms,
    getAllOptions,
    getFilters,
    getSupplierDetails,
    list,
    getAges,
    getGenders, 
    getCategories,
    getById,
    edit,
    orderList,
    getGraphsDetails,
    uploadContract,
    getUploadedContract,
    deleteUploadedContract,
}