import { createSelector } from 'reselect';

const productsFiltersSelector = state => state.products.filters;
const productsList = state => state.products.list;
const productsHeaders = state => state.products.headers;

export const productsOptionsSelector = state => state.products.options

export const renamedFilters = createSelector(
    productsFiltersSelector,
    (filters) => {
        if(Object.keys(filters.data).length){
            let i = Object.keys(filters.data).length;
            while(i > -1){
                let filterName = Object.keys(filters.data)[i];
                switch(filterName){
                    case 'brand': 
                        delete Object.assign(filters.data, {['trade_mark']: filters.data[filterName] })[filterName];
                        break;
                    case 'product_group': 
                        delete Object.assign(filters.data, {['nomenclature_group']: filters.data[filterName] })[filterName];
                        break;
                    case 'product_category': 
                        delete Object.assign(filters.data, {['kind']: filters.data[filterName] })[filterName];
                        break;
                    default: break;
                }
                i--;
            }
        }
        return {
            data: filters.data,
            state: filters.state
        };
    }
)


export const renamedProducts = createSelector(
    productsList,
    productsHeaders,
    (products, headers) => {
        console.log(products);

        if(products.err){
            return {
                data: {
                    products: products.err.toString(),
                },
                state: products.state
            }
        }
        if(products.state === "loading"){
            return products;
        }

        if(products.data.results.length){
            let i = products.data.results.length, filteredProducts = [];
            while(i > -1){
                if(products.data.results[i]){
                    let refactoredResult = {};
                    headers.forEach((header) => {
                        header = header.toLowerCase();
                        if(header in products.data.results[i]) refactoredResult[header] = products.data.results[i][header];
                    });
                    if(Object.keys(refactoredResult).length) filteredProducts.push(refactoredResult);
                }
                i--;
            }
            return {
                data: {
                    products: filteredProducts,
                    amount: products.data.count
                },
                state: products.state
            }
        }else 
            return {
                data: {
                    products: 'No customers were found',
                },
                state: products.state
            }
    }
)