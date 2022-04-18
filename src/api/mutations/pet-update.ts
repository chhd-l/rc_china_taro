export type updatePetDto = {
  name: String;
  gender: String;
  type: String;
  breedCode: String;
  image: String;
  isSterilized: Boolean;
  birthday: Date;
  customerId: String;
  operator: String;
};
export const petUpdateMutation = `
  mutation updatePet ($input: updatePetDto!){
    updatePet(input: $input)
  }
`;
