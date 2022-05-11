import { FloorListProps, FloorType } from '@/framework/types/products'
import Mock from 'mockjs'
import { mocksearchPrams } from '@/mock/product'

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
    icon: '',
    type: FloorType.Activity,
    active: true,
    id: 'activity',
  },
  {
    title: '明星猫粮',
    label: '明星猫粮',
    subTitle: '省薪囤货  爆款猫粮',
    icon: '',
    type: FloorType.Stars,
    active: false,
    id: 'catStar',
  },
  {
    title: '全价猫干粮',
    label: '猫干粮',
    subTitle: '让不同年龄、品种、健康问题的猫咪定制专属营养',
    icon: '',
    type: FloorType.Dry,
    active: false,
    id: 'catDryFood',
  },
  {
    title: '全价主食级猫湿粮',
    label: '猫湿粮',
    subTitle: '宠爱升级，享受肉食乐趣同时满足每日所需营养',
    icon: '',
    type: FloorType.Wet,
    active: false,
    id: 'catWetFood',
  },
  {
    title: '明星犬粮',
    label: '明星犬粮',
    subTitle: '省薪囤货  爆款犬粮',
    icon: '',
    type: FloorType.Stars,
    active: false,
    id: 'dogStar',
  },
  {
    title: '犬干粮',
    label: '犬干粮',
    subTitle: '让不同年龄、品种、健康问题的狗狗都有自己的精准营养',
    icon: '',
    type: FloorType.Dry,
    active: false,
    id: 'odgDryFood',
  },
  {
    title: '犬湿粮',
    label: '犬湿粮',
    subTitle: '宠爱升级，享受肉食乐趣同时满足每日所需营养',
    icon: '',
    type: FloorType.Wet,
    active: false,
    id: 'dogWetFood',
  },
]

export const largeButtonClass =
  'ClickButton items-center flex h-10 flex-1 px-3 text-gray-400 border search-filter-round1 border-solid mr-3 mb-2 cateClickButton'
