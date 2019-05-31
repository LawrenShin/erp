import Api from './api';
import { Swisskit } from './api';

import {collectOptions} from './common';

const UNLIM = '?limit=1000&offset=0';

//products
const getFilters = () => {
    return Api.get(`products/get_products_filters/`);
}
const list = (options = '') => {
    return Api.get(`products/products/${collectOptions(options)}`);
}
const getProduct = (id) => Api.get(`products/products/${id}`)
// in table
const getProductColors = () => Api.get(`products/colors/${UNLIM}`)
const getProductThemes = () => Api.get(`products/themes/${UNLIM}`)
const getProductsCategories = () => Api.get(`products/category/${UNLIM}`)
// in create page
const getDesign = async () => {
    const dataTypes = ['groups', 'colors', 'decors', 'styles', 'wearing_occasion', 'print_mood']
    
    let results = await Swisskit.makeRequests(dataTypes, UNLIM, 'products')
    results = results.map(r => r.results)
    return Swisskit.mapOver({ dataTypes, results })
}

const getGeneral = async () => {
    const dataTypes = ['collections']

    let results = await Swisskit.makeRequests(dataTypes, UNLIM, 'products')
    results = results.map(r => r.results)
    return Swisskit.mapOver({ dataTypes, results })
}

const getTechnical = async () => {
    const dataTypes = ['kinds', 'sizes', 'purpose', 'category', 'length', 'typepocket', 'levelwaist', 'kindneck', 'kindfastener', 'silhouettes', 'kindstrap', 'product_care_recomendation']
    
    let results = await Swisskit.makeRequests(dataTypes, UNLIM, 'products')
    results = results.map(r => r.results)
    return Swisskit.mapOver({ dataTypes, results })
}

const getFabric = async () => {
    const dataTypes = ['shell_fabric', 'weight', 'compositions', 'constructions']
    
    let results = await Swisskit.makeRequests(dataTypes, UNLIM, 'products')
    results = results.map(r => r.results)
    return Swisskit.mapOver({ dataTypes, results })
}

const getOptionsProducts = () => fetch(`https://dev.neurodynamics.info/api/products/products/`, { method: 'OPTIONS' }).then(r => r.json().then(jr => jr)).catch(e => e)

const createProduct = (data) => Api.post(`products/products/`, true, data)

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
    getProduct
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