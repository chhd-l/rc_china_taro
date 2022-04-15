export const getAllPetsQuery = `
  query getAllPets($customerId: String!){
    pets(customerId: $customerId) {
      id,
      name,
      gender,
      type,
      breedCode,
      image,
      isSterilized,
      
    }
  }
`;
//birthday
