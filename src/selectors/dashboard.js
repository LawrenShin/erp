import { createSelector } from 'reselect';

const dashboardList = state => state.dashboard.list;
const dashboardHeaders = state => state.dashboard.headers;


export const renamedDashboard = createSelector(
    dashboardList,
    dashboardHeaders,
    (dashboard, headers) => {
        console.log(dashboard);

        if(dashboard.err){
            return {
                data: {
                    dashboard: dashboard.err.toString(),
                },
                state: dashboard.state
            }
        }
        if(dashboard.state === "loading"){
            return dashboard;
        }

        if(dashboard.data.results.length){
            let i = dashboard.data.results.length, filteredDashboard = [];
            while(i > -1){
                if(dashboard.data.results[i]){
                    let refactoredResult = {};
                    headers.forEach((header) => {
                        header = header.toLowerCase();
                        if(header in dashboard.data.results[i]) refactoredResult[header] = dashboard.data.results[i][header];
                    });
                    if(Object.keys(refactoredResult).length) filteredDashboard.push(refactoredResult);
                }
                i--;
            }
            return {
                data: {
                    dashboard: filteredDashboard,
                    amount: dashboard.data.count
                },
                state: dashboard.state
            }
        }else 
            return {
                data: {
                    dashboard: 'No data were found',
                },
                state: dashboard.state
            }
    }
)