export const petDeleteMutation = `
  mutation deletePet ($id: String!, $operator: String!){
    deletePetById(id: $id, operator: $operator)
  }
`;
