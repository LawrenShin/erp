import { createSelector } from 'reselect';

const suppliersList = state => state.suppliers.list;

export const singleSupplierSelector = createSelector(
    suppliersList,
    (list) => {
        if(list.err){
            return {
                message: list.err.toString(),
                state: list.state
            }
        }
        if(list.state === "loading"){
            return list;
        }
        let results = list.data.results;
        if(results.length){
            return {
                data: {
                    ...results[0]
                },
                state: list.state
            }
        }else{
            return {
                message: 'No customers were found',
                state: list.state
            }
        }
    }
)

