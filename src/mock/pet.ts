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
      birthday: Mock.Random.date(),
      customer: Mock.Random.name(),
    },
  ],
};

export const breedListMock = {
  "list|38": [
    { image: Mock.Random.image("100x100"), value: "啊啊啊" },
    { image: Mock.Random.image("100x100"), value: "哦哦哦" },
  ],
};
