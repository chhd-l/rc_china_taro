import PetList from '@/components/consumer/PetList'
import { normalizeCartData } from '@/framework/api/lib/normalize'
import { getSubscriptionSimpleRecommend } from '@/framework/api/subscription/subscription'
import routers from '@/routers'
import { currentStepAtom, recommendInfoAtom, recommendProductAtom } from '@/store/subscription'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useAtom } from 'jotai'
import moment from 'moment'
import { useState } from 'react'
import { AtButton, AtModal } from 'taro-ui'
import AtMyStep from '../components/AtMyStep'
import ExclusivePackage from '../ExclusivePackage'
import Purchased from '../Purchased'
import './index.less'

const nextStepView = {
  0: (
    <View className="mb-4">
      <PetList showCheckBox />
    </View>
  ),
  1: <ExclusivePackage />,
  2: <Purchased />,
}
const Step = () => {
  const [stepCount, setStepCount] = useAtom(currentStepAtom)
  const [recommendInfo, setRecommendInfo] = useAtom(recommendInfoAtom)
  const [recommenProduct, setRecommendProduct] = useAtom(recommendProductAtom)
  const [noPetModal, setNoPetModal] = useState(false)
  const goNextStep = async () => {
    const { type, code, birthday, isSterilized } = recommendInfo.recommPetInfo
    const params = {
      subscriptionType: 'FRESH_BUY',
      petType: type,
      petBreedCode: code,
      isPetSterilized: isSterilized,
      petBirthday: moment(birthday),
    }
    if (Object.keys(recommendInfo.recommPetInfo).length === 0) {
      setNoPetModal(true)
      return
    }
    // const params = {
    //   subscriptionType: 'FRESH_BUY',
    //   petType: 'CAT',
    //   petBreedCode: "10001",
    //   isPetSterilized: true,
    //   petBirthday: "2021-01-09T00:00:00.000Z"
    // }

    if (stepCount === 0) {
      const { couponList, productList, giftList } = await getSubscriptionSimpleRecommend(params)
      const { discountPrice, originalPrice, quantity } = productList[0].cycleList[0]

      // const gift = giftList.filter(item => productList[0].giftIdList.includes(item?.productVariants?.[0]?.id))
      const gift = productList[0].giftIdList.map((el) => {
        let productVariants = giftList.find((giftItem) => giftItem?.productVariants?.[0]?.id === el.giftId)
        let data: any = {}
        if (productVariants && el) {
          data = {
            ...productVariants,
            subscriptionRecommendRuleId: el.subscriptionRecommendRuleId,
            quantityRule: el.quantityRule,
            quantity: el.quantity,
          }
          switch (data.quantityRule) {
            case 'FIRST_DELIVERY_FIXED_NUMBER':
              // data.quantity = recommenProduct.quantity
              data.quantity = data.quantity
              break

            case 'CALCULATE_BY_FEEDING_DAY':
              data.quantity = quantity
              break

            case 'FIXED_NUMBER':
              data.quantity = data.quantity
              break

            case 'DOUBLE_OF_SKU_NUMBER':
              data.quantity = quantity * 2
              break
          }
        }
        return data
      })
      console.info('giftgift', gift)
      setRecommendInfo({ ...recommendInfo, productList, couponList, giftList })
      setRecommendProduct({
        ...recommenProduct,
        ...productList[0],
        quantity,
        cycle: productList[0].cycleList[0],
        giftList: gift,
        discountPrice,
        originalPrice,
        cardType: 0,
        freshType: 'FRESH_NORMAL',
      })
    }
    if (stepCount === 1) {
      let { couponList } = recommendInfo
      console.info('recommendInfo', recommendInfo)
      console.info('recommenProductrecommenProductrecommenProduct', recommenProduct)
      let { cycle, quantity } = recommenProduct?.cycle
      let couponInfo = couponList.find((el) => el.couponRule?.subscriptionCycle === cycle)
      let couponsList =
        couponInfo?.coupons?.map((data) => {
          switch (data.quantityRule) {
            case 'FIRST_DELIVERY_FIXED_NUMBER':
              // data.quantity = recommenProduct.quantity
              data.quantity = data.quantity
              break

            case 'CALCULATE_BY_FEEDING_DAY':
              data.quantity = quantity
              break

            case 'FIXED_NUMBER':
              data.quantity = data.quantity
              break

            case 'DOUBLE_OF_SKU_NUMBER':
              data.quantity = quantity * 2
              break
          }
          return data
        }) || []
      setRecommendProduct({ ...recommenProduct, couponList: couponsList })
      // 切换商品总价和赠品没有改变
      // const { productList, giftList } = recommendInfo
      // const { discountPrice, originalPrice, quantity } = productList[0].cycleList[0]
      // const gift = getGifts(productList[0].giftIdList, giftList)
      // setRecommendInfo({ ...recommendInfo, discountPrice, originalPrice })
      // setRecommendProduct({ ...recommenProduct, ...productList[0], quantity, cycle: productList[0].cycleList[0], giftList: gift })
    }

    setStepCount(stepCount + 1)
  }
  return (
    <View>
      <AtMyStep current={stepCount} />
      {nextStepView[stepCount]}
      <View className="flex flex-row justify-center px-6">
        {stepCount > 0 && (
          <AtButton
            type="primary"
            className="stepButton"
            onClick={() => {
              setStepCount(stepCount - 1)
            }}
          >
            上一步
          </AtButton>
        )}
        {stepCount < 2 && (
          <AtButton
            type="primary"
            className="stepButton"
            onClick={goNextStep}
            // disabled={Object.keys(recommendInfo.recommPetInfo).length === 0}
          >
            下一步
          </AtButton>
        )}
        {stepCount === 2 && (
          <AtButton
            type="primary"
            className="stepButton"
            onClick={() => {
              console.log('recommenProductrecommenProductrecommenProduct', recommenProduct)
              const { freshType, cycle, productVariantInfo, giftList, subscriptionRecommendRuleId, couponList } =
                recommenProduct
              const { recommPetInfo } = recommendInfo
              let { birthday, code: breedCode, breed: breedName, gender, id, image, name, type } = recommPetInfo
              birthday = moment(birthday)
              let productList = [{ ...productVariantInfo, subscriptionRecommendRuleId }]
              Taro.setStorage({
                key: 'select-product',
                data: JSON.stringify({
                  type: 'FRESH_BUY',
                  cycle,
                  freshType,
                  pet: {
                    birthday,
                    breedCode,
                    breedName,
                    gender,
                    id,
                    image,
                    name,
                    type,
                  },
                  productList: productList.map((el) =>
                    normalizeCartData({ productNum: recommenProduct.quantity }, el, true),
                  ),
                  isSubscription: true,
                  giftList:
                    giftList?.map((el) => {
                      let productNum = el.quantity
                      // el.subscriptionRecommendRuleId=productList
                      return normalizeCartData({ productNum }, el, true)
                    }) || [],
                  couponList: couponList.map((el) => {
                    el.subscriptionRecommendRuleId = subscriptionRecommendRuleId
                    return el
                  }),
                }),
                complete: (respon) => {
                  console.log(respon)
                  Taro.navigateTo({ url: routers.checkout })
                },
              })
            }}
          >
            确认套餐
          </AtButton>
        )}
      </View>
      <AtModal
        key="noPetTip"
        isOpened={noPetModal}
        title="提示"
        content="请选择宠物"
        confirmText="确定"
        onClose={() => {
          setNoPetModal(false)
        }}
        onCancel={() => {
          setNoPetModal(false)
        }}
        onConfirm={() => {
          setNoPetModal(false)
        }}
        className="rc_modal"
      />
    </View>
  )
}

export default Step
