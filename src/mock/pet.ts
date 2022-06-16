import Mock from 'mockjs'

export const petLists = {
  'list|4': [
    {
      age: Mock.Random.name(),
      image: Mock.Random.image('100x100'),
      name: Mock.Random.name(),
      type: Mock.Random.name(),
      id: Mock.Random.id(),
      gender: Mock.Random.name(),
      breed: Mock.Random.name(),
      isSterilized: Mock.Random.boolean(),
      birthday: Mock.Random.date(),
      consumer: Mock.Random.name(),
    },
  ],
}

export const breedListMock = {
  'list|2': [
    { image: Mock.Random.image('100x100'), value: '啊啊啊' },
    { image: Mock.Random.image('100x100'), value: '啵啵啵' },
    { image: Mock.Random.image('100x100'), value: '吃吃吃' },
    { image: Mock.Random.image('100x100'), value: '鹅鹅鹅' },
    { image: Mock.Random.image('100x100'), value: '福福福' },
    { image: Mock.Random.image('100x100'), value: '咯咯咯' },
    { image: Mock.Random.image('100x100'), value: '呵呵呵' },
    { image: Mock.Random.image('100x100'), value: '一一一' },
    { image: Mock.Random.image('100x100'), value: '哦哦哦' },
  ],
}
