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

export const mockBanner = {
  "list|4": [
    {
      url: Mock.Random.name(),
      img: Mock.Random.image("200x100"),
    },
  ],
};

export const mockTabOptions = {
  "list|4": [
    {
      subLabel: Mock.Random.name(),
      label: Mock.Random.cname(),
      value: Mock.Random.guid(),
      icon: Mock.Random.image("100x100"),
      headerImg: Mock.Random.image("200x100"),
      seeMoreUrl: "/pages/moreProducts/index",
      moduleColor: Mock.Random.color(),
      titleLable: Mock.Random.cname(),
      "children|3": [
        {
          titleLable: Mock.Random.cname(),
          subLabel: Mock.Random.name(),
          label: Mock.Random.cname(),
          value: Mock.Random.guid(),
          icon: Mock.Random.image("100x100"),
          headerImg: Mock.Random.image("200x100"),
          seeMoreUrl: "/pages/moreProducts/index",
        },
      ],
    },
  ],
};

export const mockStar = {
  "list|4": [
    {
      url: Mock.Random.name(),
      name: Mock.Random.name(),
      price: Mock.Random.county(),
      img: Mock.Random.image("200x200"),
      video:
        "https://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
    },
  ],
};

export const mockProduct = {
  "list|7": [
    {
      // img: "../assets/icons/icon-cart.png",
      img: Mock.Random.image("200x200"),
      name: Mock.Random.name(),
      price: Mock.Random.integer(0, 10),
      tag: Mock.Random.name(),
    },
  ],
};

export const mockDetail = {
  "skus|3": [
    {
      name: Mock.Random.cname(),
      specs: Mock.Random.cname(),
      stock: Mock.Random.natural(1, 100),
      id: Mock.Random.cname(),
      img: [Mock.Random.image("100x100")],
      defaultChoose: Mock.Random.boolean(),
      price: Mock.Random.cname(),
      originalPrice: Mock.Random.cname(),
      no: Mock.Random.cname(), //商品编号
      "tags|2": [Mock.Random.cname()],
    },
  ],
  id: Mock.Random.name(),
  no: Mock.Random.name(),
  description: Mock.Random.name(),
  img: [Mock.Random.image("100x100")],
  stock: Mock.Random.natural(1, 100),
  type: Mock.Random.name(),
  price: Mock.Random.cname(),
  originalPrice: Mock.Random.cname(),
  "tags|2": [Mock.Random.cname()],
  name: Mock.Random.name(), //没有sku的时候需要显示
};
