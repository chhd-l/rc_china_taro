import Taro, { getCurrentInstance } from '@tarojs/taro'
import { useState } from 'react'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { ScrollView, View } from '@tarojs/components'
import { Voucher } from '@/framework/types/voucher'
import { getListVouchers } from '@/framework/api/voucher/voucher'
import VoucherItem from '@/components/voucher/VoucherItem'
import { VOUCHER_EXPIRED, VOUCHER_NO_RECEIVED, VOUCHER_USED } from '@/lib/constants'
import NavBar from '@/components/common/Navbar'
import './index.less'

const VoucherStatusEnum = {
  NOT_USED: 0,
  USED: 1,
  EXPIRED: 2,
}

const VoucherList = () => {
  const [current, setCurrent] = useState('NOT_USED')
  const [voucherList, setVoucherList] = useState<Voucher[]>([])
  const { router } = getCurrentInstance()
  const [voucherObj, setVoucherObj] = useState({
    notUsedVouchers: [],
    usedVouchers: [],
    expiredVouchers: [],
  })
  const [tabList, setTableList] = useState([{ title: '未使用' }, { title: '已使用' }, { title: '已过期' }])

  const getVoucherList = async () => {
    const res = await getListVouchers()
    setVoucherObj(res)
    setVoucherList(res.notUsedVouchers)
    setTableList([
      { title: res.notUsedVouchers.length > 0 ? `未使用(${res.notUsedVouchers.length})` : '未使用' },
      { title: res.usedVouchers.length > 0 ? `已使用(${res.usedVouchers.length})` : '已使用' },
      { title: res.expiredVouchers.length > 0 ? `已过期(${res.expiredVouchers.length})` : '已过期' },
    ])
  }

  Taro.useDidShow(() => {
    const status = router?.params?.voucherStatus || 'NOT_USED'
    setCurrent(status)
    getVoucherList()
  })

  const handleClick = (value) => {
    const cur = Object.values(VoucherStatusEnum).filter((item) => item === value)[0]
    setCurrent(Object.keys(VoucherStatusEnum)[cur])
    setVoucherList(
      value === 0 ? voucherObj.notUsedVouchers : value === 1 ? voucherObj.usedVouchers : voucherObj.expiredVouchers,
    )
  }

  return (
    <View>
      <NavBar navbarTitle="我的优惠券" isNeedBack />
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
                      applyBtnClass="rc-no-receive-voucher-button"
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
