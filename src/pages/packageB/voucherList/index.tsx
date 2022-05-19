import Taro, { getCurrentInstance } from '@tarojs/taro'
import { useState } from 'react'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { ScrollView, View } from '@tarojs/components'
import { Voucher } from '@/framework/types/voucher'
import { getListVouchers } from '@/framework/api/voucher/voucher'
import VoucherItem from '@/components/voucher/VoucherItem'
import { VOUCHER_EXPIRED, VOUCHER_NO_RECEIVED, VOUCHER_USED } from '@/lib/constants'
import './index.less'

const tabList = [{ title: '未使用' }, { title: '已使用' }, { title: '已过期' }]

const VoucherStatusEnum = {
  NOT_USED: 0,
  USED: 1,
  EXPIRED: 2,
}

const VoucherList = () => {
  const [current, setCurrent] = useState('NOT_USED')
  const [voucherList, setVoucherList] = useState<Voucher[]>([])
  const { router } = getCurrentInstance()

  const getVoucherList = async (status) => {
    const res = await getListVouchers({ status })
    setVoucherList(res?.records)
  }

  Taro.useDidShow(() => {
    const status = router?.params?.status || 'NOT_USED'
    console.log('status', status)
    setCurrent(status)
    getVoucherList(status)
  })

  const handleClick = (value) => {
    Taro.setNavigationBarTitle({
      title: tabList[value].title,
    })
    const cur = Object.values(VoucherStatusEnum).filter((item) => item === value)[0]
    setCurrent(Object.keys(VoucherStatusEnum)[cur])
    getVoucherList(Object.keys(VoucherStatusEnum)[cur])
  }

  return (
    <View>
      <AtTabs className="index" current={VoucherStatusEnum[current]} tabList={tabList} onClick={handleClick} swipeable>
        {tabList.map((item, index) => (
          <AtTabsPane current={VoucherStatusEnum[current]} index={index} key={item.title}>
            <ScrollView className="voucher-list p-2" scrollY>
              {voucherList?.length > 0
                ? voucherList.map((el) => (
                    <VoucherItem
                      voucher={el}
                      backgroundImageUrl={
                        current === 'EXPIRED'
                          ? VOUCHER_EXPIRED
                          : current === 'NOT_USED'
                          ? VOUCHER_NO_RECEIVED
                          : VOUCHER_USED
                      }
                      priceClass={current !== 'NOT_USED' ? 'text-white' : 'text-primary-red'}
                      expiredTimeClass={current !== 'NOT_USED' ? 'text-white' : 'text-gray-400'}
                      showApplyBtn={current === 'NOT_USED'}
                      applyVoucher={() => {
                        Taro.switchTab({
                          url: '/pages/productList/index',
                        })
                      }}
                    />
                  ))
                : null}
            </ScrollView>
          </AtTabsPane>
        ))}
      </AtTabs>
    </View>
  )
}

export default VoucherList
