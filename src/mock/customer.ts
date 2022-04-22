import Mock from 'mockjs'

export const dataSource = {
  name: Mock.Random.cname(),
  image: '',
  nickName: Mock.Random.cname(), //昵称
  phone: /\d{11}/,
  level: '新手铲屎官',
  'points|1-100': 100, //积分情况，小程序会显示
  addresses: [
    {
      id: Mock.Random.id(),
      receiver: Mock.Random.cname(),
      phone: /\d{11}/,
      province: Mock.Random.province(), //省
      city: Mock.Random.city(), //市
      detail: Mock.Random.county(),
      postcode: Mock.Random.zip(),
      isDefault: 0,
      region: Mock.Random.region(), //区
    },
  ],
}
