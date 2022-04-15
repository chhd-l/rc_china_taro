export const petCreateMutation = `
  mutation createPet ($input: createPetDto!){
    createPet(input: $input)
  }
`;
