export const getAllCustomersQuery = `
  query getAllCustomers($offset: Int = 50){
    customers(offset: $offset) {
      name
    }
  }
`