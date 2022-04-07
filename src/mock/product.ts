import Mock from "mockjs";

export const mockList = {
  "list|5": [
    {
      name: Mock.Random.name(),
      img: Mock.Random.image("200x200"),
      "originalPrice|1-1": "1",
      "price|1-10": 1,
      "sku|1-1000": "1",
      "spu|1-1000": "1",
    },
  ],
};
export const mocksearchPrams = {
  "list|5": [{ value: Mock.Random.name(), label: Mock.Random.name() }],
};
