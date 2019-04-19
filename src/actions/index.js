export const createAction = (type, payload) => ({
    type,
    payload
});

export const createRequestAction = (type, method, params = undefined) => createAction('API_REQUEST', {
    type,
    method,
    params
});