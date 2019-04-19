import { createSelector } from 'reselect';

const customersFiltersSelector = state => state.customer.customersFilters;
const customersList = state => state.customer.list;
const customersOptions = state => state.customer.options;

export const singleCustomerSelector = createSelector(
    customersList,
    (list) => {
        if(list.err){
            return {
                data: {
                    customers: list.err.toString(),
                },
                state: list.state
            }
        }
        if(list.state === "loading"){
            return list;
        }
        let results = list.data;
        if(results.length){
            return {
                data: {
                    ...results[0]
                },
                state: list.state
            }
        }else{
            return {
                data: {
                    customers: 'No customers were found',
                },
                state: list.state
            }
        }
    }
)

export const renamedFiltersSelector = createSelector(
    customersFiltersSelector,
    (filters) => {
        if(Object.keys(filters.data).length){
            let i = Object.keys(filters.data).length;
            while(i > -1){
                let filterName = Object.keys(filters.data)[i];
                switch(filterName){
                    case 'head_contractor': 
                        delete Object.assign(filters.data, {['head_contractor_name']: filters.data[filterName] })[filterName];
                        break;
                }
                i--;
            }
        }
        // rename some props of filters
        return {
            data: filters.data,
            state: filters.state
        };
    }
);

export const customersSelector = createSelector(
    customersList,
    customersOptions,
    (list, options) => {
        if(list.err){
            return {
                data: {
                    customers: list.err.toString(),
                },
                state: list.state
            }
        }
        if(list.state === "loading"){
            return list;
        }

        let results = list.data.results;
        if(results.length){
            let i = results.length, filteredCustomers = [];
            while(i > -1){
                if(results[i]){
                    let refactoredResult = {};
                    Object.keys(options).forEach((header) => {
                        if(header in results[i]) refactoredResult[header] = results[i][header];
                    });
                    if(Object.keys(refactoredResult).length) filteredCustomers.push(refactoredResult);
                }
                i--;
            }
            return {
                data: {
                    customers: filteredCustomers,
                    amount: list.data.count
                },
                state: list.state

            }
        }else{
            //this.setState({ customers: 'No customers were found' });
            return {
                data: {
                    customers: 'No customers were found',
                },
                state: list.state
            }
        }
    }
);