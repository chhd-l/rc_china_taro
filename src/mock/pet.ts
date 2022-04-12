import Mock from "mockjs";
export const petLists = {
  "list|4": [
    {
      age: Mock.Random.name(),
      image: Mock.Random.image("100x100"),
      name: Mock.Random.name(),
      type: Mock.Random.name(),
      id: Mock.Random.id(),
      gender: Mock.Random.name(),
      breed: Mock.Random.name(),
      isSterilized: Mock.Random.boolean(),
      birthday: Mock.Random.name(),
      customer: Mock.Random.name(),
    },
  ],
};
