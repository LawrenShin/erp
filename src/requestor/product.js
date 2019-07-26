import Api from './api';
import { Swisskit } from './api';

import {collectOptions} from './common';

const UNLIM = '?limit=1000&offset=0';

//products
const getFilters = () => {
    return Api.get(`products/get_products_filters/`);
};
const list = (options = '') => {
    return Api.get(`products/products/${collectOptions(options)}`);
};
const getProduct = (id) => Api.get(`products/products/${id}`);

// in table
const getProductColors = () => Api.get(`products/colors/${UNLIM}`);
const getProductThemes = () => Api.get(`products/themes/${UNLIM}`);
const getProductsCategories = () => Api.get(`products/category/${UNLIM}`);

// in create page
const getDesign = async () => {
    const dataTypes = ['groups', 'colors', 'decors', 'styles', 'wearing_occasion', 'print_mood', 'ages', 'gender', 'wearing_occasion', 'print_mood', 'designers'];
    
    let results = await Swisskit.makeRequests(dataTypes, UNLIM, 'products');
    results = results.map(r => r.results)
    return Swisskit.mapOver({ dataTypes, results })
};

const getGeneral = async () => {
    const dataTypes = ['collections', 'themes', 'trademark'];

    let results = await Swisskit.makeRequests(dataTypes, UNLIM, 'products');
    results = results.map(r => r.results);
    return Swisskit.mapOver({ dataTypes, results });
};

const getTechnical = async () => {
    const dataTypes = ['kinds', 'sizes', 'purpose', 'category', 'length', 'typepocket', 'levelwaist', 'kindneck', 'kindfastener', 'silhouettes', 'kindstrap', 'sleeve'];
    
    let results = await Swisskit.makeRequests(dataTypes, UNLIM, 'products');
    results = results.map(r => r.results);
    return Swisskit.mapOver({ dataTypes, results });
};

const getTechnicalFiles = (id) => Api.get(`products/tech_file/?product=${id}`);

const getFabric = async () => {
    const dataTypes = ['shell_fabric', 'weight', 'compositions', 'constructions'];
    
    let results = await Swisskit.makeRequests(dataTypes, UNLIM, 'products');
    results = results.map(r => r.results);
    return Swisskit.mapOver({ dataTypes, results });
};

const getLogistics = async () => {
    const dataTypes = ['code_tnved'];

    let results = await Swisskit.makeRequests(dataTypes, UNLIM, 'products');
    results = results.map(r => r.results);
    return Swisskit.mapOver({ dataTypes, results });
};

const getOptionsProducts = () => fetch(`https://dev.neurodynamics.info/api/products/products/`, { method: 'OPTIONS' }).then(r => r.json().then(jr => jr)).catch(e => e)

const createProduct = (data) => Api.post(`products/products/`, true, data);
const uploadFilesProduct = (data, id, type) => {
    let bodyFormData = new FormData();
    bodyFormData.append('file', data[0]);
    bodyFormData.append('product', id);
    bodyFormData.append('type_file', type);
    return Api.post('products/tech_file/', true, bodyFormData, false, false, {'Content-Type': 'multipart/form-data' });
};
const uploadMainImage = (data, id) => {
    let bodyFormData = new FormData();
    bodyFormData.append('main_image', data[0]);
    return Api.put(`products/products/${id}/`, true, bodyFormData, false, false, {'Content-Type': 'multipart/form-data' });
};
const editProduct = (id, data) => Api.put(`products/products/${id}/`, true, data);

export default {
    getOptionsProducts,
    createProduct,
    getFilters,
    list,
    getProductColors,
    getProductThemes,
    getProductsCategories,
    getDesign,
    getGeneral,
    getTechnical,
    getFabric,
    getProduct,
    editProduct,
    uploadFilesProduct,
    uploadMainImage,
    getTechnicalFiles,
    getLogistics
}
// GENERAL
//     year - 
//     season -
//     buying manager -
    
// DESIGN
//     gender - 
//     designer - 
//     age - 
//     print lnd - 