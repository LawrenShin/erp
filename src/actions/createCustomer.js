export const createCustomer = (customer) => ({
  type: 'CREATE_CUSTOMER_UNMOUNTS',
  customer
});

export const clear = () => ({
  type: 'CLEAR'
});
