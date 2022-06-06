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

export const catDryFood = [
  {
    color: 'pink',
    title: '幼猫',
    Children: [
      {
        title: '离乳期幼猫全价粮',
        price: '111',
        span: '社区专享95折'
      },
      {
        title: '幼猫全价粮',
        price: '111',
        span: '社区专享95折'
      },
      {
        title: '幼猫全价粮干湿套餐',
        price: '111',
        span: '社区专享95折'
      },
      {
        title: '绝育呵护幼猫全价粮',
        price: '111',
        span: '社区专享95折'
      },
    ]
  },
  {
    color: 'crimson',
    title: '成猫',
    Children: [
      {
        title: '室内长毛成猫全价粮',
        price: '137',
        span: '社区专享95折'
      },
      {
        title: '室内成猫全价粮干湿套餐',
        price: '201',
        span: '社区专享95折'
      },
      {
        title: '挑嘴成猫全价粮（肠道舒适型）',
        price: '149',
        span: '社区专享95折'
      },
      {
        title: '室内成猫全价粮',
        price: '129',
        span: '社区专享95折'
      },
      {
        title: '室外成猫全价粮',
        price: '198',
        span: '社区专享95折'
      },
      {
        title: '营养成猫全价粮',
        price: '118',
        span: '社区专享95折'
      },
    ]
  },
  {
    color: 'blue',
    title: '老年猫',
    Children: [
      {
        title: '室内成猫全价粮（7+）',
        price: '116',
        span: '社区专享95折'
      },
    ]
  },
  {
    color: 'yellow',
    title: '品种猫',
    Children: [
      {
        title: '缅甸成猫全价粮食 2KG*2包',
        price: '137',
        span: '社区专享95折'
      },
      {
        title: '波斯猫幼猫全价粮食',
        price: '201',
        span: '社区专享95折'
      },
      {
        title: '布偶猫成猫全价粮',
        price: '149',
        span: '社区专享95折'
      },
      {
        title: '孟加拉豹猫全价粮',
        price: '129',
        span: '社区专享95折'
      },
      {
        title: '英国短毛猫幼猫全价粮',
        price: '198',
        span: '社区专享95折'
      },
      {
        title: '英国短毛猫成猫全价粮',
        price: '118',
        span: '社区专享95折'
      },
    ]
  },
  {
    color: 'cadetblue',
    title: '亚健康',
    Children: [
      {
        title: '口腔护理成猫全价粮',
        price: '159',
        span: '社区专享95折'
      },
      {
        title: '体重呵护成猫全价粮',
        price: '202',
        span: '社区专享95折'
      },
      {
        title: '美毛呵护成猫全价粮',
        price: '202',
        span: '社区专享95折'
      },
      {
        title: '去毛球成猫全价粮',
        price: '202',
        span: '社区专享95折'
      },
    ]
  },
]

export const dogDryFood = [
  {
    color: 'blue',
    title: '幼犬',
    Children: [
      {
        title: '小型犬',
        Children: [
          {
            title: '小型犬幼犬全价粮',
            price: '111',
            span: '社区专享95折'
          }
        ]
      },
      {
        title: '中型犬',
        Children: [
          {
            title: '中型犬幼犬全价粮',
            price: '111',
            span: '社区专享95折'
          }
        ]
      },
      {
        title: '大型犬',
        Children: [
          {
            title: '大型犬幼犬全价粮',
            price: '111',
            span: '社区专享95折'
          }
        ]
      },
    ]
  },
  {
    color: 'green',
    title: '成犬',
    Children: [
      {
        title: '小型犬',
        Children: [
          {
            title: '小型犬成犬全价粮',
            price: '111',
            span: '社区专享95折'
          }
        ]
      },
      {
        title: '中型犬',
        Children: [
          {
            title: '中型犬成犬全价粮',
            price: '111',
            span: '社区专享95折'
          }
        ]
      },
      {
        title: '大型犬',
        Children: [
          {
            title: '大型犬成犬全价粮',
            price: '111',
            span: '社区专享95折'
          }
        ]
      },
    ]
  },
  {
    color: 'crimson',
    title: '老年犬',
    Children: [
      {
        title: '小型犬',
        Children: [
          {
            title: '小型犬老年犬全价粮',
            price: '111',
            span: '社区专享95折'
          }
        ]
      },
      {
        title: '中型犬',
        Children: [
          {
            title: '中型犬老年犬全价粮',
            price: '111',
            span: '社区专享95折'
          }
        ]
      },
      {
        title: '大型犬',
        Children: [
          {
            title: '大型犬老年犬全价粮',
            price: '111',
            span: '社区专享95折'
          }
        ]
      },
    ]
  },
  {
    color: 'yellow',
    title: '品种犬',
    Children: [
      {
        title: '小型犬',
        Children: [
          {
            title: '小型犬品种犬全价粮',
            price: '111',
            span: '社区专享95折'
          }
        ]
      },
      {
        title: '中型犬',
        Children: [
          {
            title: '中型犬品种犬全价粮',
            price: '111',
            span: '社区专享95折'
          }
        ]
      },
      {
        title: '大型犬',
        Children: [
          {
            title: '大型犬品种犬全价粮',
            price: '111',
            span: '社区专享95折'
          }
        ]
      },
    ]
  },
  {
    color: 'cadetblue',
    title: '亚健康',
    Children: [
      {
        title: '小型犬',
        Children: [
          {
            title: '小型犬老年犬全价粮',
            price: '111',
            span: '社区专享95折'
          }
        ]
      },
      {
        title: '中型犬',
        Children: [
          {
            title: '中型犬老年犬全价粮',
            price: '111',
            span: '社区专享95折'
          },
          {
            title: '中型犬老年犬全价粮',
            price: '111',
            span: '社区专享95折'
          },
          {
            title: '中型犬老年犬全价粮',
            price: '111',
            span: '社区专享95折'
          }
        ]
      },
    ]
  },
  {
    color: 'yellow',
    title: '品种犬',
    Children: [
      {
        title: '小型犬',
        Children: [
          {
            title: '皮肤呵护小型犬全价粮',
            price: '111',
            span: '社区专享95折'
          },
          {
            title: '绝育呵护小型犬全价粮',
            price: '111',
            span: '社区专享95折'
          }
        ]
      },
    ]
  },
]

export const largeButtonClass =
  'ClickButton items-center flex h-10 flex-1 px-3 text-gray-400 search-filter-round1 border-solid mr-3 mb-2 cateClickButton'
