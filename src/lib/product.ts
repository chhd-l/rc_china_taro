import { FloorListProps, FloorType } from '@/framework/types/products'

export const filterListArr = [
  {
    key: 'specialarea',
    label: '专区',
    list: [
      { value: '猫湿粮', label: '猫湿粮' },
      { value: '品种猫粮', label: '品种猫粮' },
      { value: '营养猫粮', label: '营养猫粮' },
      { value: '功能猫粮', label: '功能猫粮' },
    ],
  },
  {
    key: 'age',
    label: '年龄',
    list: [
      { value: '<4月龄', label: '<4月龄' },
      { value: '4-12月龄', label: '4-12月龄' },
      { value: '1-7岁', label: '1-7岁' },
      { value: '', label: '' },
      { value: '', label: '' },
    ],
  },
  {
    key: 'productFunction',
    label: '功能',
    list: [
      { value: '', label: '' },
      { value: '美毛呵护', label: '美毛呵护' },

      { value: '', label: '' },
      { value: '', label: '' },
      { value: '', label: '' },
      { value: '', label: '' },
    ],
  },
  {
    key: 'breed',
    label: '品种',
    list: [
      { value: '', label: '' },
      { value: '', label: '' },
      { value: '', label: '' },
      { value: '', label: '' },
      { value: '', label: '' },
    ],
  },
]
export const floorList: FloorListProps[] = [
  {
    title: '活动专区',
    label: '活动专区',
    subTitle: '订阅商城  社群福利',
    icon: 'huodongzhuanqu',
    type: FloorType.Activity,
    active: true,
    id: 'activity',
  },
  {
    title: '明星猫粮',
    label: '明星猫粮',
    subTitle: '省薪囤货  爆款猫粮',
    icon: 'mingxingmaoliang',
    type: FloorType.Stars,
    active: false,
    id: 'catStar',
  },
  {
    title: '全价猫干粮',
    label: '猫干粮',
    subTitle: '让不同年龄、品种、健康问题的猫咪定制专属营养',
    icon: 'maoganliang',
    type: FloorType.Dry,
    active: false,
    id: 'catDryFood',
  },
  {
    title: '全价主食级猫湿粮',
    label: '猫湿粮',
    subTitle: '宠爱升级，享受肉食乐趣同时满足每日所需营养',
    icon: 'maoshiliang',
    type: FloorType.Wet,
    active: false,
    id: 'catWetFood',
  },
  {
    title: '明星犬粮',
    label: '明星犬粮',
    subTitle: '省薪囤货  爆款犬粮',
    icon: 'mingxingquanliang',
    type: FloorType.Stars,
    active: false,
    id: 'dogStar',
  },
  {
    title: '犬干粮',
    label: '犬干粮',
    subTitle: '让不同年龄、品种、健康问题的狗狗都有自己的精准营养',
    icon: 'quanganliang',
    type: FloorType.Dry,
    active: false,
    id: 'odgDryFood',
  },
  {
    title: '犬湿粮',
    label: '犬湿粮',
    subTitle: '宠爱升级，享受肉食乐趣同时满足每日所需营养',
    icon: 'quanshiliang',
    type: FloorType.Wet,
    active: false,
    id: 'dogWetFood',
  },
]

const httpsTilte = 'https://dtc-platform.oss-cn-shanghai.aliyuncs.com/static/'

export const mxCatDryFood = [
  {
    mp4: httpsTilte + 'Shop_Start_01.mp4',
    img: httpsTilte + 'Shop_Start_01.png',
    expr: httpsTilte + 'Shop_Start_01cover.jpg',
  },
  {
    mp4: httpsTilte + 'Shop_Start_02.mp4',
    img: httpsTilte + 'Shop_Start_02.png',
    expr: httpsTilte + 'Shop_Start_02cover.jpg',
  },
  {
    mp4: httpsTilte + 'Shop_Start_03.mp4',
    img: httpsTilte + 'Shop_Start_03.png',
    expr: httpsTilte + 'Shop_Start_03cover.jpg',
  },
  {
    mp4: httpsTilte + 'Shop_Start_04.mp4',
    img: httpsTilte + 'Shop_Start_04.jpg',
    expr: httpsTilte + 'Shop_Start_04cover.jpg',
  },
]

export const mxDogDryFood = [
  {
    mp4: httpsTilte + 'Shop_Start_Dog_01.mp4',
    img: httpsTilte + 'Shop_Start_Dog_01.png',
    expr: httpsTilte + 'Shop_Start_Dog_01cover.jpg',
  },
  {
    mp4: httpsTilte + 'Shop_Start_Dog_02.mp4',
    img: httpsTilte + 'Shop_Start_Dog_02.png',
    expr: httpsTilte + 'Shop_Start_Dog_02cover.jpg',
  },
  {
    mp4: httpsTilte + 'Shop_Start_Dog_03.mp4',
    img: httpsTilte + 'Shop_Start_Dog_03.png',
    expr: httpsTilte + 'Shop_Start_Dog_03cover.jpg',
  },
  {
    mp4: httpsTilte + 'Shop_Start_Dog_04.mp4',
    img: httpsTilte + 'Shop_Start_Dog_04.jpg',
    expr: httpsTilte + 'Shop_Start_Dog_04cover.jpg',
  },
]

export const catDryFood = [
  {
    color: '#F5B5C3',
    title: '幼猫',
    titleImg: httpsTilte + 'Shop_Cat_classify_01.png',
    img: httpsTilte + 'Shop_Cat_classify_01banner.jpg',
    Children: [
      {
        title: '离乳期幼猫全价粮',
        price: '111',
        span: '社区专享95折',
        img: httpsTilte + 'Shop_Cat_classify_01_Product01.png',
      },
      {
        title: '幼猫全价粮',
        price: '111',
        img: httpsTilte + 'Shop_Cat_classify_01_Product02.jpg',
        span: '社区专享95折'
      },
      {
        title: '幼猫全价粮干湿套餐',
        img: httpsTilte + 'Shop_Cat_classify_01_Product03.png',
        price: '111',
        span: '社区专享95折'
      },
    ]
  },
  {
    color: '#D14359',
    title: '成猫',
    titleImg: httpsTilte + 'Shop_Cat_classify_02.png',
    img: httpsTilte + 'Shop_Cat_classify_02banner.jpg',
    Children: [
      {
        title: '室内长毛成猫全价粮',
        price: '137',
        img: httpsTilte + 'Shop_Cat_classify_02_Product01.jpg',
        span: '社区专享95折'
      },
      {
        title: '室内成猫全价粮干湿套餐',
        img: httpsTilte + 'Shop_Cat_classify_02_Product02.jpg',
        price: '201',
        span: '社区专享95折'
      },
      {
        title: '挑嘴成猫全价粮（肠道舒适型）',
        img: httpsTilte + 'Shop_Cat_classify_02_Product03.jpg',
        price: '149',
        span: '社区专享95折'
      },
    ]
  },
  {
    color: '#4190C9',
    title: '老年猫',
    titleImg: httpsTilte + 'Shop_Cat_classify_03.png',
    img: httpsTilte + 'Shop_Cat_classify_03banner.jpg',
    Children: [
      {
        title: '室内成猫全价粮（7+）',
        price: '116',
        img: httpsTilte + 'Shop_Cat_classify_03_Product01.jpg',
        span: '社区专享95折'
      },
    ]
  },
  {
    color: '#E4C27A',
    title: '品种猫',
    titleImg: httpsTilte + 'Shop_Cat_classify_04.png',
    img: httpsTilte + 'Shop_Cat_classify_04banner.jpg',
    Children: [
      {
        title: '缅甸成猫全价粮食 2KG*2包',
        price: '137',
        img: httpsTilte + 'Shop_Cat_classify_04_Product01.jpg',
        span: '社区专享95折'
      },
    ]
  },
  {
    color: '#5686AA',
    title: '亚健康',
    titleImg: httpsTilte + 'Shop_Cat_classify_05.png',
    img: httpsTilte + 'Shop_Cat_classify_05banner.jpg',
    Children: []
  },
]

export const dogDryFood = [
  {
    color: '#67AEE2',
    title: '幼犬',
    titleImg: 'Shop_Dog01.png',
    Children: [
      {
        title: '小型犬',
        img: 'Shop_Dog01_classify_01banner.jpg',
        Children: [
          {
            title: '小型犬幼犬全价粮',
            price: '111',
            img: 'Shop_Dog01_classify_01_Product01.jpg',
            span: '社区专享95折'
          }
        ]
      },
      {
        title: '中型犬',
        img: 'Shop_Dog01_classify_02banner.jpg',
        Children: [
          {
            title: '中型犬幼犬全价粮',
            img: 'Shop_Dog01_classify_02_Product01.jpg',
            price: '111',
            span: '社区专享95折'
          }
        ]
      },
      {
        title: '大型犬',
        img: 'Shop_Dog01_classify_03banner.jpg',
        Children: [
          {
            title: '大型犬幼犬全价粮',
            img: 'Shop_Dog01_classify_03_Product01.jpg',
            price: '111',
            span: '社区专享95折'
          }
        ]
      },
    ]
  },
  {
    color: '#2C9155',
    title: '成犬',
    titleImg: 'Shop_Dog_02.png',
    Children: [
      {
        title: '小型犬',
        img: 'Shop_Dog02_classify_01banner.jpg',
        Children: [
          {
            title: '小型犬幼犬全价粮',
            price: '111',
            img: 'Shop_Dog01_classify_01_Product01.jpg',
            span: '社区专享95折'
          }
        ]
      },
      {
        title: '中型犬',
        img: 'Shop_Dog02_classify_02banner.jpg',
        Children: [
          {
            title: '中型犬幼犬全价粮',
            img: 'Shop_Dog02_classify_02_Product01.jpg',
            price: '111',
            span: '社区专享95折'
          }
        ]
      },
      {
        title: '大型犬',
        img: 'Shop_Dog02_classify_03banner.jpg',
        Children: [
          {
            title: '大型犬幼犬全价粮',
            img: 'Shop_Dog02_classify_03_Product01.jpg',
            price: '111',
            span: '社区专享95折'
          }
        ]
      },
    ]
  },
  {
    color: '#D14359',
    title: '老年犬',
    titleImg: 'Shop_Dog03.png',
    Children: [
      {
        title: '小型犬',
        img: 'Shop_Dog03_classify_01banner.jpg',
        Children: [
          {
            title: '小型犬幼犬全价粮',
            price: '111',
            img: 'Shop_Dog03_classify_01_Product01.jpg',
            span: '社区专享95折'
          }
        ]
      },
    ]
  },
  {
    color: '#E5C37B',
    titleImg: 'Shop_Dog04.png',
    title: '品种犬',
    Children: [
      {
        title: '小型犬',
        img: 'Shop_Dog04_classify_01banner.jpg',
        Children: [
          {
            title: '小型犬幼犬全价粮',
            price: '111',
            img: 'Shop_Dog04_classify_01_Product01.jpg',
            span: '社区专享95折'
          }
        ]
      },
      {
        title: '中型犬',
        img: 'Shop_Dog04_classify_02banner.jpg',
        Children: [
          {
            title: '中型犬幼犬全价粮',
            img: 'Shop_Dog04_classify_02_Product01.png',
            price: '111',
            span: '社区专享95折'
          }
        ]
      },
      {
        title: '大型犬',
        img: 'Shop_Dog04_classify_03banner.jpg',
        Children: [
          {
            title: '大型犬幼犬全价粮',
            img: 'Shop_Dog04_classify_03_Product01.jpg',
            price: '111',
            span: '社区专享95折'
          }
        ]
      },
    ]
  },
  {
    color: '#5585A9',
    titleImg: 'Shop_Dog05.png',
    title: '亚健康',
    Children: [
      {
        title: '小型犬',
        img: 'Shop_Dog05_classify_01banner.jpg',
        Children: [
          {
            title: '小型犬幼犬全价粮',
            price: '111',
            img: 'Shop_Dog05_classify_01_Product01.jpg',
            span: '社区专享95折'
          }
        ]
      },
      {
        title: '中型犬',
        img: 'Shop_Dog05_classify_02banner.jpg',
        Children: []
      },
    ]
  },
]

export const dogDryFood2 = [
  {
    color: '#67AEE2',
    title: '幼犬',
    titleImg: 'Shop_Dog01.png',
    Children: [
      {
        title: '小型犬',
        img: 'Shop_Dog01_classify_01banner.jpg',
        Children: [
          {
            title: '小型犬幼犬全价粮',
            price: '111',
            img: 'Shop_Dog01_classify_01_Product01.jpg',
            span: '社区专享95折'
          }
        ]
      },
      {
        title: '中型犬',
        img: 'Shop_Dog01_classify_02banner.jpg',
        Children: [
          {
            title: '中型犬幼犬全价粮',
            img: 'Shop_Dog01_classify_02_Product01.jpg',
            price: '111',
            span: '社区专享95折'
          }
        ]
      },
    ]
  },
  {
    color: '#2C9155',
    title: '成犬',
    titleImg: 'Shop_Dog_02.png',
    Children: [
      {
        title: '小型犬',
        img: 'Shop_Dog02_classify_01banner.jpg',
        Children: [
          {
            title: '小型犬幼犬全价粮',
            price: '111',
            img: 'Shop_Dog01_classify_01_Product01.jpg',
            span: '社区专享95折'
          }
        ]
      },
      {
        title: '中型犬',
        img: 'Shop_Dog02_classify_02banner.jpg',
        Children: [
          {
            title: '中型犬幼犬全价粮',
            img: 'Shop_Dog02_classify_02_Product01.jpg',
            price: '111',
            span: '社区专享95折'
          }
        ]
      },
    ]
  },
  {
    color: '#E5C37B',
    titleImg: 'Shop_Dog04.png',
    title: '品种犬',
    Children: [
      {
        title: '小型犬',
        img: 'Shop_Dog04_classify_01banner.jpg',
        Children: [
          {
            title: '小型犬幼犬全价粮',
            price: '111',
            img: 'Shop_Dog04_classify_01_Product01.jpg',
            span: '社区专享95折'
          }
        ]
      },
    ]
  },
]

export const largeButtonClass =
  'ClickButton items-center flex h-10 flex-1 px-3 text-gray-400 search-filter-round1 border-solid mr-3 mb-2 cateClickButton'
