export const petUpdateMutation = `
  mutation updatePet ($input: updatePetDto!){
    updatePet(input: $input)
  }
`;
