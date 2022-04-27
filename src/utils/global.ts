import Taro from '@tarojs/taro'

export const session = {
  set(key: string, val: any) {
    Taro.setStorageSync(key, JSON.stringify(val))
  },
  get(key: string) {
    return JSON.parse(Taro.getStorageSync(key) || 'null')
  },
  remove(key: string) {
    Taro.removeStorageSync(key)
  },
}
